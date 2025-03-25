import { ListMoviesData } from '../';
import { FlattenedQueryResult, useDataConnectQueryOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useListMovies(options?: useDataConnectQueryOptions<ListMoviesData>): UseQueryResult<FlattenedQueryResult<ListMoviesData, undefined>, FirebaseError>;
export function useListMovies(dc: DataConnect, options?: useDataConnectQueryOptions<ListMoviesData>): UseQueryResult<FlattenedQueryResult<ListMoviesData, undefined>, FirebaseError>;
