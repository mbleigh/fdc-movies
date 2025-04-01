import { dcAdmin, gql } from "./firebase-admin";

const watchHistoryQuery = gql`
  fragment MovieOverview on Movie {
    id
    rating
    title
    posterUrl
    genre
    releaseDate
    stats: movieStats_on_movie {
      watchCount
      reviewCount
      avgRating
    }
  }

  fragment ReviewOverview on Review {
    id
    user {
      username
    }
    rating
    review
    reviewTime
    watch: watch_on_review {
      watchDate
      format
    }
  }

  query DetailedWatchHistory($uid: String!) {
    watches(where: { userUid: { eq: $uid } }, orderBy: [{ watchDate: DESC }]) {
      id
      watchDate
      format
      review {
        ...ReviewOverview
      }
      movie {
        ...MovieOverview
        description
        actors: actors_via_Role {
          name
          id
        }
      }
    }
  }
`;

export function getWatchHistory(uid: string) {
  return dcAdmin.executeGraphqlRead(watchHistoryQuery, { variables: { uid } });
}
