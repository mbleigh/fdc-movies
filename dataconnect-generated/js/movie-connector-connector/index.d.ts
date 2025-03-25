import { ConnectorConfig } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface Actor_Key {
  id: string;
  __typename?: 'Actor_Key';
}

export interface Movie_Key {
  id: string;
  __typename?: 'Movie_Key';
}

export interface Review_Key {
  userUsername: string;
  movieId: string;
  __typename?: 'Review_Key';
}

export interface Role_Key {
  movieId: string;
  actorId: string;
  __typename?: 'Role_Key';
}

export interface User_Key {
  username: string;
  __typename?: 'User_Key';
}

