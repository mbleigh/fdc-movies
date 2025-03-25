import { ConnectorConfig, DataConnect, QueryRef, QueryPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface Actor_Key {
  id: string;
  __typename?: 'Actor_Key';
}

export interface ListMoviesData {
  movies: ({
    title: string;
    stats?: {
      reviewCount?: number | null;
      avgRating?: number | null;
      watchCount?: number | null;
    };
  })[];
}

export interface Movie_Key {
  id: string;
  __typename?: 'Movie_Key';
}

export interface Review_Key {
  id: UUIDString;
  __typename?: 'Review_Key';
}

export interface Role_Key {
  movieId: string;
  actorId: string;
  __typename?: 'Role_Key';
}

export interface User_Key {
  uid: string;
  __typename?: 'User_Key';
}

export interface Watch_Key {
  id: UUIDString;
  __typename?: 'Watch_Key';
}

/* Allow users to create refs without passing in DataConnect */
export function listMoviesRef(): QueryRef<ListMoviesData, undefined>;
/* Allow users to pass in custom DataConnect instances */
export function listMoviesRef(dc: DataConnect): QueryRef<ListMoviesData, undefined>;

export function listMovies(): QueryPromise<ListMoviesData, undefined>;
export function listMovies(dc: DataConnect): QueryPromise<ListMoviesData, undefined>;

