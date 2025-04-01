import { UpdateUserData, UpdateUserVariables, AddWatchData, AddWatchVariables, AddReviewData, AddReviewVariables, DeleteWatchData, DeleteWatchVariables, HomePageData, SearchMoviesData, SearchMoviesVariables, MoviePageData, MoviePageVariables, WatchHistoryPageData, WatchHistoryPageVariables, BrowseMoviesData, BrowseMoviesVariables, GetMoviesData, GetMoviesVariables, DetailedWatchHistoryData } from '../';
import { FlattenedQueryResult, useDataConnectQueryOptions, FlattenedMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useUpdateUser(options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables>): UseMutationResult<FlattenedMutationResult<UpdateUserData, UpdateUserVariables>, FirebaseError, UpdateUserVariables>;
export function useUpdateUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables>): UseMutationResult<FlattenedMutationResult<UpdateUserData, UpdateUserVariables>, FirebaseError, UpdateUserVariables>;

export function useAddWatch(options?: useDataConnectMutationOptions<AddWatchData, FirebaseError, AddWatchVariables>): UseMutationResult<FlattenedMutationResult<AddWatchData, AddWatchVariables>, FirebaseError, AddWatchVariables>;
export function useAddWatch(dc: DataConnect, options?: useDataConnectMutationOptions<AddWatchData, FirebaseError, AddWatchVariables>): UseMutationResult<FlattenedMutationResult<AddWatchData, AddWatchVariables>, FirebaseError, AddWatchVariables>;

export function useAddReview(options?: useDataConnectMutationOptions<AddReviewData, FirebaseError, AddReviewVariables>): UseMutationResult<FlattenedMutationResult<AddReviewData, AddReviewVariables>, FirebaseError, AddReviewVariables>;
export function useAddReview(dc: DataConnect, options?: useDataConnectMutationOptions<AddReviewData, FirebaseError, AddReviewVariables>): UseMutationResult<FlattenedMutationResult<AddReviewData, AddReviewVariables>, FirebaseError, AddReviewVariables>;

export function useDeleteWatch(options?: useDataConnectMutationOptions<DeleteWatchData, FirebaseError, DeleteWatchVariables>): UseMutationResult<FlattenedMutationResult<DeleteWatchData, DeleteWatchVariables>, FirebaseError, DeleteWatchVariables>;
export function useDeleteWatch(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteWatchData, FirebaseError, DeleteWatchVariables>): UseMutationResult<FlattenedMutationResult<DeleteWatchData, DeleteWatchVariables>, FirebaseError, DeleteWatchVariables>;

export function useHomePage(options?: useDataConnectQueryOptions<HomePageData>): UseQueryResult<FlattenedQueryResult<HomePageData, undefined>, FirebaseError>;
export function useHomePage(dc: DataConnect, options?: useDataConnectQueryOptions<HomePageData>): UseQueryResult<FlattenedQueryResult<HomePageData, undefined>, FirebaseError>;

export function useSearchMovies(vars: SearchMoviesVariables, options?: useDataConnectQueryOptions<SearchMoviesData>): UseQueryResult<FlattenedQueryResult<SearchMoviesData, SearchMoviesVariables>, FirebaseError>;
export function useSearchMovies(dc: DataConnect, vars: SearchMoviesVariables, options?: useDataConnectQueryOptions<SearchMoviesData>): UseQueryResult<FlattenedQueryResult<SearchMoviesData, SearchMoviesVariables>, FirebaseError>;

export function useMoviePage(vars: MoviePageVariables, options?: useDataConnectQueryOptions<MoviePageData>): UseQueryResult<FlattenedQueryResult<MoviePageData, MoviePageVariables>, FirebaseError>;
export function useMoviePage(dc: DataConnect, vars: MoviePageVariables, options?: useDataConnectQueryOptions<MoviePageData>): UseQueryResult<FlattenedQueryResult<MoviePageData, MoviePageVariables>, FirebaseError>;

export function useWatchHistoryPage(vars?: WatchHistoryPageVariables, options?: useDataConnectQueryOptions<WatchHistoryPageData>): UseQueryResult<FlattenedQueryResult<WatchHistoryPageData, WatchHistoryPageVariables>, FirebaseError>;
export function useWatchHistoryPage(dc: DataConnect, vars?: WatchHistoryPageVariables, options?: useDataConnectQueryOptions<WatchHistoryPageData>): UseQueryResult<FlattenedQueryResult<WatchHistoryPageData, WatchHistoryPageVariables>, FirebaseError>;

export function useBrowseMovies(vars?: BrowseMoviesVariables, options?: useDataConnectQueryOptions<BrowseMoviesData>): UseQueryResult<FlattenedQueryResult<BrowseMoviesData, BrowseMoviesVariables>, FirebaseError>;
export function useBrowseMovies(dc: DataConnect, vars?: BrowseMoviesVariables, options?: useDataConnectQueryOptions<BrowseMoviesData>): UseQueryResult<FlattenedQueryResult<BrowseMoviesData, BrowseMoviesVariables>, FirebaseError>;

export function useGetMovies(vars?: GetMoviesVariables, options?: useDataConnectQueryOptions<GetMoviesData>): UseQueryResult<FlattenedQueryResult<GetMoviesData, GetMoviesVariables>, FirebaseError>;
export function useGetMovies(dc: DataConnect, vars?: GetMoviesVariables, options?: useDataConnectQueryOptions<GetMoviesData>): UseQueryResult<FlattenedQueryResult<GetMoviesData, GetMoviesVariables>, FirebaseError>;

export function useDetailedWatchHistory(options?: useDataConnectQueryOptions<DetailedWatchHistoryData>): UseQueryResult<FlattenedQueryResult<DetailedWatchHistoryData, undefined>, FirebaseError>;
export function useDetailedWatchHistory(dc: DataConnect, options?: useDataConnectQueryOptions<DetailedWatchHistoryData>): UseQueryResult<FlattenedQueryResult<DetailedWatchHistoryData, undefined>, FirebaseError>;
