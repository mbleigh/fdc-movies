import { queryRef, executeQuery, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'connector',
  service: 'app',
  location: 'us-central1'
};

export function listMoviesRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMovies');
}

export function listMovies(dc) {
  return executeQuery(listMoviesRef(dc));
}

