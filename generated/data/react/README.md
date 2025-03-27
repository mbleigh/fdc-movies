# Table of Contents
- [**Overview**](#generated-react-readme)
- [**TanStack Query Firebase & TanStack React Query**](#tanstack-query-firebase-tanstack-react-query)
  - [*Package Installation*](#installing-tanstack-query-firebase-and-tanstack-react-query-packages)
  - [*Configuring TanStack Query*](#configuring-tanstack-query)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*HomePage*](#homepage)
  - [*SearchMovies*](#searchmovies)
  - [*MoviePage*](#moviepage)
  - [*WatchHistoryPage*](#watchhistorypage)
- [**Mutations**](#mutations)
  - [*UpdateUser*](#updateuser)
  - [*AddWatch*](#addwatch)
  - [*DeleteWatch*](#deletewatch)

# Generated React README
This README will guide you through the process of using the generated React SDK package for the connector `connector`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@app/data/react` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#react).

# TanStack Query Firebase & TanStack React Query
This SDK provides [React](https://react.dev/) hooks generated specific to your application, for the operations found in the connector `connector`. These hooks are generated using [TanStack Query Firebase](https://react-query-firebase.invertase.dev/) by our partners at Invertase, a library built on top of [TanStack React Query v5](https://tanstack.com/query/v5/docs/framework/react/overview).

***You do not need to be familiar with Tanstack Query or Tanstack Query Firebase to use this SDK.*** However, you may find it useful to learn more about them, as they will empower you as a user of this Generated React SDK.

## Installing TanStack Query Firebase and TanStack React Query Packages
In order to use the React generated SDK, you must install the `TanStack React Query` and `TanStack Query Firebase` packages.
```bash
npm i --save @tanstack/react-query @tanstack-query-firebase/react
```
```bash
npm i --save firebase@latest # Note: React has a peer dependency on ^11.3.0
```

You can also follow the installation instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#install_tanstack_query_firebase_packages), or the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react) and [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/installation).

## Configuring TanStack Query
In order to use the React generated SDK in your application, you must wrap your application's component tree in a `QueryClientProvider` component from TanStack React Query. None of your generated React SDK hooks will work without this provider.

```javascript
import { QueryClientProvider } from '@tanstack/react-query';

// Create a TanStack Query client instance
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <MyApplication />
    </QueryClientProvider>
  )
}
```

To learn more about `QueryClientProvider`, see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/quick-start) and the [TanStack Query Firebase documentation](https://invertase.docs.page/tanstack-query-firebase/react#usage).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `connector`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@app/data';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#emulator-react).

```javascript
import { connectDataConnectEmulator, getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@app/data';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) using the hooks provided from your generated React SDK.

# Queries

The React generated SDK provides Query hook functions that call and return [`useDataConnectQuery`](https://react-query-firebase.invertase.dev/react/data-connect/querying) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and the most recent data returned by the Query, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/querying).

TanStack React Query caches the results of your Queries, so using the same Query hook function in multiple places in your application allows the entire application to automatically see updates to that Query's data.

Query hooks execute their Queries automatically when called, and periodically refresh, unless you change the `queryOptions` for the Query. To learn how to stop a Query from automatically executing, see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries). To learn how to make "lazy loading" Queries, you can also read [this post](https://stackoverflow.com/a/70516680/21417394) by [TkDodo](https://tkdodo.eu/blog/) (Dominik Dorfmeister), a maintainer of TanStack React Query.

To learn more about TanStack React Query's Queries, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/queries).

## Using Query Hooks
Here's a general overview of how to use the generated Query hooks in your code:

- If the Query has no arguments, the Query hook function does not require arguments.
- If the Query accepts any arguments (including optional arguments), the Query hook function will require at least one argument: an object that contains all the required variables (and the optional variables) for the Query.
  - If all of the Query's arguments are optional, the Query hook function does not require any arguments.
- Query hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Query hooks also accept an `options` argument of type `useDataConnectQueryOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/query-options).

Below are examples of how to use the `connector` connector's generated Query hook functions to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#use_queries_and_mutations_in_your_react_client).

## HomePage
You can execute the `HomePage` Query using the following Query hook function, which is defined in [data/react/index.d.ts](./index.d.ts):
```javascript
useHomePage(options?: useDataConnectQueryOptions<HomePageData>): UseQueryResult<FlattenedQueryResult<HomePageData, undefined>, FirebaseError>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useHomePage(dc: DataConnect, options?: useDataConnectQueryOptions<HomePageData>): UseQueryResult<FlattenedQueryResult<HomePageData, undefined>, FirebaseError>;
```

### Variables
The `HomePage` Query has no variables.
### Return Type
Recall that calling the `HomePage` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `HomePage` Query is of type `HomePageData`, which is defined in [data/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface HomePageData {
  newReleases: ({
    id: string;
    rating: string;
    title: string;
    posterUrl: string;
    genre: string;
    releaseDate: DateString;
    stats?: {
      watchCount?: number | null;
      reviewCount?: number | null;
      avgRating?: number | null;
    };
  } & Movie_Key)[];
    topMovies: ({
      movie?: {
        id: string;
        rating: string;
        title: string;
        posterUrl: string;
        genre: string;
        releaseDate: DateString;
        stats?: {
          watchCount?: number | null;
          reviewCount?: number | null;
          avgRating?: number | null;
        };
      } & Movie_Key;
    })[];
      recentReviews: ({
        id: UUIDString;
        user: {
          username: string;
        };
          rating: number;
          review?: string | null;
          reviewTime: TimestampString;
          watch?: {
            watchDate: DateString;
            format?: string | null;
          };
            movie: {
              id: string;
              rating: string;
              title: string;
              posterUrl: string;
              genre: string;
              releaseDate: DateString;
              stats?: {
                watchCount?: number | null;
                reviewCount?: number | null;
                avgRating?: number | null;
              };
            } & Movie_Key;
      } & Review_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `HomePage`'s Query hook function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@app/data';
import { useHomePage } from '@app/data/react'

export default function HomePageComponent() {

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useHomePage();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useHomePage(dataConnect);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.newReleases);
    console.log(query.data.topMovies);
    console.log(query.data.recentReviews);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## SearchMovies
You can execute the `SearchMovies` Query using the following Query hook function, which is defined in [data/react/index.d.ts](./index.d.ts):
```javascript
useSearchMovies(vars: SearchMoviesVariables, options?: useDataConnectQueryOptions<SearchMoviesData>): UseQueryResult<FlattenedQueryResult<SearchMoviesData, SearchMoviesVariables>, FirebaseError>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useSearchMovies(dc: DataConnect, vars: SearchMoviesVariables, options?: useDataConnectQueryOptions<SearchMoviesData>): UseQueryResult<FlattenedQueryResult<SearchMoviesData, SearchMoviesVariables>, FirebaseError>;
```

### Variables
The `SearchMovies` Query requires an argument of type `SearchMoviesVariables`, which is defined in [data/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface SearchMoviesVariables {
  query: string;
}
```
### Return Type
Recall that calling the `SearchMovies` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `SearchMovies` Query is of type `SearchMoviesData`, which is defined in [data/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface SearchMoviesData {
  movies: ({
    id: string;
    rating: string;
    title: string;
    posterUrl: string;
    genre: string;
    releaseDate: DateString;
    stats?: {
      watchCount?: number | null;
      reviewCount?: number | null;
      avgRating?: number | null;
    };
      description?: string | null;
  } & Movie_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `SearchMovies`'s Query hook function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, SearchMoviesVariables } from '@app/data';
import { useSearchMovies } from '@app/data/react'

export default function SearchMoviesComponent() {
  // The `useSearchMovies` Query hook requires an argument of type `SearchMoviesVariables`:
  const searchMoviesVars: SearchMoviesVariables = {
    query: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useSearchMovies(searchMoviesVars);
  // Variables can be defined inline as well.
  const query = useSearchMovies({ query: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useSearchMovies(dataConnect, searchMoviesVars);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.movies);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## MoviePage
You can execute the `MoviePage` Query using the following Query hook function, which is defined in [data/react/index.d.ts](./index.d.ts):
```javascript
useMoviePage(vars: MoviePageVariables, options?: useDataConnectQueryOptions<MoviePageData>): UseQueryResult<FlattenedQueryResult<MoviePageData, MoviePageVariables>, FirebaseError>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useMoviePage(dc: DataConnect, vars: MoviePageVariables, options?: useDataConnectQueryOptions<MoviePageData>): UseQueryResult<FlattenedQueryResult<MoviePageData, MoviePageVariables>, FirebaseError>;
```

### Variables
The `MoviePage` Query requires an argument of type `MoviePageVariables`, which is defined in [data/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface MoviePageVariables {
  movieId: string;
}
```
### Return Type
Recall that calling the `MoviePage` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `MoviePage` Query is of type `MoviePageData`, which is defined in [data/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface MoviePageData {
  movie?: {
    id: string;
    rating: string;
    title: string;
    posterUrl: string;
    genre: string;
    releaseDate: DateString;
    stats?: {
      watchCount?: number | null;
      reviewCount?: number | null;
      avgRating?: number | null;
    };
      description?: string | null;
      reviews: ({
        id: UUIDString;
        user: {
          username: string;
        };
          rating: number;
          review?: string | null;
          reviewTime: TimestampString;
          watch?: {
            watchDate: DateString;
            format?: string | null;
          };
      } & Review_Key)[];
        roles: ({
          character?: string | null;
          description?: string | null;
          actor: {
            id: string;
            name: string;
            imageUrl: string;
          } & Actor_Key;
        })[];
  } & Movie_Key;
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `MoviePage`'s Query hook function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, MoviePageVariables } from '@app/data';
import { useMoviePage } from '@app/data/react'

export default function MoviePageComponent() {
  // The `useMoviePage` Query hook requires an argument of type `MoviePageVariables`:
  const moviePageVars: MoviePageVariables = {
    movieId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useMoviePage(moviePageVars);
  // Variables can be defined inline as well.
  const query = useMoviePage({ movieId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useMoviePage(dataConnect, moviePageVars);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.movie);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## WatchHistoryPage
You can execute the `WatchHistoryPage` Query using the following Query hook function, which is defined in [data/react/index.d.ts](./index.d.ts):
```javascript
useWatchHistoryPage(vars?: WatchHistoryPageVariables, options?: useDataConnectQueryOptions<WatchHistoryPageData>): UseQueryResult<FlattenedQueryResult<WatchHistoryPageData, WatchHistoryPageVariables>, FirebaseError>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useWatchHistoryPage(dc: DataConnect, vars?: WatchHistoryPageVariables, options?: useDataConnectQueryOptions<WatchHistoryPageData>): UseQueryResult<FlattenedQueryResult<WatchHistoryPageData, WatchHistoryPageVariables>, FirebaseError>;
```

### Variables
The `WatchHistoryPage` Query requires an argument of type `WatchHistoryPageVariables`, which is defined in [data/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface WatchHistoryPageVariables {
  limit?: number | null;
}
```
### Return Type
Recall that calling the `WatchHistoryPage` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `WatchHistoryPage` Query is of type `WatchHistoryPageData`, which is defined in [data/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface WatchHistoryPageData {
  watches: ({
    id: UUIDString;
    watchDate: DateString;
    format?: string | null;
    review?: {
      id: UUIDString;
      user: {
        username: string;
      };
        rating: number;
        review?: string | null;
        reviewTime: TimestampString;
        watch?: {
          watchDate: DateString;
          format?: string | null;
        };
    } & Review_Key;
      movie: {
        id: string;
        rating: string;
        title: string;
        posterUrl: string;
        genre: string;
        releaseDate: DateString;
        stats?: {
          watchCount?: number | null;
          reviewCount?: number | null;
          avgRating?: number | null;
        };
      } & Movie_Key;
  } & Watch_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `WatchHistoryPage`'s Query hook function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, WatchHistoryPageVariables } from '@app/data';
import { useWatchHistoryPage } from '@app/data/react'

export default function WatchHistoryPageComponent() {
  // The `useWatchHistoryPage` Query hook requires an argument of type `WatchHistoryPageVariables`:
  const watchHistoryPageVars: WatchHistoryPageVariables = {
    limit: ..., // optional
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useWatchHistoryPage(watchHistoryPageVars);
  // Variables can be defined inline as well.
  const query = useWatchHistoryPage({ limit: ..., });
  // Since all variables are optional for this Query, you can omit the `WatchHistoryPageVariables` argument.
  const query = useWatchHistoryPage();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useWatchHistoryPage(dataConnect, watchHistoryPageVars);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.watches);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

# Mutations

The React generated SDK provides Mutations hook functions that call and return [`useDataConnectMutation`](https://react-query-firebase.invertase.dev/react/data-connect/mutations) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, and the most recent data returned by the Mutation, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/mutations).

Mutation hooks do not execute their Mutations automatically when called. Rather, after calling the Mutation hook function and getting a `UseMutationResult` object, you must call the `UseMutationResult.mutate()` function to execute the Mutation.

To learn more about TanStack React Query's Mutations, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations).

## Using Mutation Hooks
Here's a general overview of how to use the generated Mutation hooks in your code:

- Mutation hook functions are not called with the arguments to the mutation. Instead, arguments are passed to `UseMutationResult.mutate()`.
- If the Mutation has no arguments, the `mutate()` function does not require arguments.
- If the Mutation accepts any arguments (including optional arguments), the `mutate()` function will require at least one argument: an object that contains all the required variables (and the optional variables) for the Mutation.
  - If all of the Mutation's arguments are optional, the `mutate()` function does not require any arguments.
- Mutation hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Mutation hooks also accept an `options` argument of type `useDataConnectMutationOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations#mutation-side-effects).
  - `UseMutationResult.mutate()` also accepts an `options` argument of type `useDataConnectMutationOptions`.
  - ***Special case:*** If the Mutation has no arguments, and you want to pass options to `UseMutationResult.mutate()`, you must pass `undefined` as the first argument (where you would normally pass the Mutation's arguments) to `UseMutationResult.mutate()`, and then the options as the second argument.

Below are examples of how to use the `connector` connector's generated Query hook functions to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#use_queries_and_mutations_in_your_react_client).

## UpdateUser
You can execute the `UpdateUser` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateUser(options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables>): UseMutationResult<FlattenedMutationResult<UpdateUserData, UpdateUserVariables>, FirebaseError, UpdateUserVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables>): UseMutationResult<FlattenedMutationResult<UpdateUserData, UpdateUserVariables>, FirebaseError, UpdateUserVariables>;
```

### Variables
The `UpdateUser` Mutation requires an argument of type `UpdateUserVariables`, which is defined in [data/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateUserVariables {
  displayName?: string | null;
  imageUrl?: string | null;
  username: string;
}
```
### Return Type
Recall that calling the `UpdateUser` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateUser` Mutation is of type `UpdateUserData`, which is defined in [data/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateUserData {
  user_upsert: User_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateUser`'s Mutation hook function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateUserVariables } from '@app/data';
import { useUpdateUser } from '@app/data/react'

export default function UpdateUserComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateUser();
  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateUser(dataConnect);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateUser` Mutation requires an argument of type `UpdateUserVariables`:
  const updateUserVars: UpdateUserVariables = {
    displayName: ..., // optional
    imageUrl: ..., // optional
    username: ..., 
  };
  mutation.mutate(updateUserVars);
  // Variables can be defined inline as well.
  mutation.mutate({ displayName: ..., imageUrl: ..., username: ..., });

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.user_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AddWatch
You can execute the `AddWatch` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data/react/index.d.ts](./index.d.ts)):
```javascript
useAddWatch(options?: useDataConnectMutationOptions<AddWatchData, FirebaseError, AddWatchVariables>): UseMutationResult<FlattenedMutationResult<AddWatchData, AddWatchVariables>, FirebaseError, AddWatchVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAddWatch(dc: DataConnect, options?: useDataConnectMutationOptions<AddWatchData, FirebaseError, AddWatchVariables>): UseMutationResult<FlattenedMutationResult<AddWatchData, AddWatchVariables>, FirebaseError, AddWatchVariables>;
```

### Variables
The `AddWatch` Mutation requires an argument of type `AddWatchVariables`, which is defined in [data/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AddWatchVariables {
  movieId: string;
  format?: string | null;
  watchDate?: DateString | null;
}
```
### Return Type
Recall that calling the `AddWatch` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AddWatch` Mutation is of type `AddWatchData`, which is defined in [data/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AddWatchData {
  watch_insert: Watch_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AddWatch`'s Mutation hook function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, AddWatchVariables } from '@app/data';
import { useAddWatch } from '@app/data/react'

export default function AddWatchComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAddWatch();
  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAddWatch(dataConnect);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAddWatch` Mutation requires an argument of type `AddWatchVariables`:
  const addWatchVars: AddWatchVariables = {
    movieId: ..., 
    format: ..., // optional
    watchDate: ..., // optional
  };
  mutation.mutate(addWatchVars);
  // Variables can be defined inline as well.
  mutation.mutate({ movieId: ..., format: ..., watchDate: ..., });

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.watch_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteWatch
You can execute the `DeleteWatch` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [data/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteWatch(options?: useDataConnectMutationOptions<DeleteWatchData, FirebaseError, DeleteWatchVariables>): UseMutationResult<FlattenedMutationResult<DeleteWatchData, DeleteWatchVariables>, FirebaseError, DeleteWatchVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteWatch(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteWatchData, FirebaseError, DeleteWatchVariables>): UseMutationResult<FlattenedMutationResult<DeleteWatchData, DeleteWatchVariables>, FirebaseError, DeleteWatchVariables>;
```

### Variables
The `DeleteWatch` Mutation requires an argument of type `DeleteWatchVariables`, which is defined in [data/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteWatchVariables {
  watchId: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteWatch` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteWatch` Mutation is of type `DeleteWatchData`, which is defined in [data/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteWatchData {
  watch_delete?: Watch_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteWatch`'s Mutation hook function

```javascript
import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteWatchVariables } from '@app/data';
import { useDeleteWatch } from '@app/data/react'

export default function DeleteWatchComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteWatch();
  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteWatch(dataConnect);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteWatch` Mutation requires an argument of type `DeleteWatchVariables`:
  const deleteWatchVars: DeleteWatchVariables = {
    watchId: ..., 
  };
  mutation.mutate(deleteWatchVars);
  // Variables can be defined inline as well.
  mutation.mutate({ watchId: ..., });

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.watch_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

