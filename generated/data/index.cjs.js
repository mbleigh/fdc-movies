const { queryRef, executeQuery, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'connector',
  service: 'app',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

exports.listMoviesRef = function listMoviesRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMovies');
}
exports.listMovies = function listMovies(dc) {
  return executeQuery(listMoviesRef(dc));
};
