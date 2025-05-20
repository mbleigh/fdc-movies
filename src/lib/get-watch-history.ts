/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { dcAdmin } from "./firebase-admin";

const watchHistoryQuery = `
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

export function getWatchHistory(uid: string | undefined) {
  if (!uid) return null;
  return dcAdmin.executeGraphqlRead(watchHistoryQuery, { variables: { uid } });
}
