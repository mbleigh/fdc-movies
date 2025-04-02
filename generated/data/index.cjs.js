const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'connector',
  service: 'app',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

exports.updateUserRef = function updateUserRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUser', inputVars);
}

exports.updateUser = function updateUser(dcOrVars, vars) {
  return executeMutation(updateUserRef(dcOrVars, vars));
};

exports.addWatchRef = function addWatchRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddWatch', inputVars);
}

exports.addWatch = function addWatch(dcOrVars, vars) {
  return executeMutation(addWatchRef(dcOrVars, vars));
};

exports.addReviewRef = function addReviewRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddReview', inputVars);
}

exports.addReview = function addReview(dcOrVars, vars) {
  return executeMutation(addReviewRef(dcOrVars, vars));
};

exports.deleteWatchRef = function deleteWatchRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteWatch', inputVars);
}

exports.deleteWatch = function deleteWatch(dcOrVars, vars) {
  return executeMutation(deleteWatchRef(dcOrVars, vars));
};

exports.homePageRef = function homePageRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'HomePage');
}

exports.homePage = function homePage(dc) {
  return executeQuery(homePageRef(dc));
};

exports.searchMoviesRef = function searchMoviesRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchMovies', inputVars);
}

exports.searchMovies = function searchMovies(dcOrVars, vars) {
  return executeQuery(searchMoviesRef(dcOrVars, vars));
};

exports.moviePageRef = function moviePageRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'MoviePage', inputVars);
}

exports.moviePage = function moviePage(dcOrVars, vars) {
  return executeQuery(moviePageRef(dcOrVars, vars));
};

exports.watchHistoryPageRef = function watchHistoryPageRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'WatchHistoryPage', inputVars);
}

exports.watchHistoryPage = function watchHistoryPage(dcOrVars, vars) {
  return executeQuery(watchHistoryPageRef(dcOrVars, vars));
};

exports.browseMoviesRef = function browseMoviesRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'BrowseMovies', inputVars);
}

exports.browseMovies = function browseMovies(dcOrVars, vars) {
  return executeQuery(browseMoviesRef(dcOrVars, vars));
};

exports.getMoviesRef = function getMoviesRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMovies', inputVars);
}

exports.getMovies = function getMovies(dcOrVars, vars) {
  return executeQuery(getMoviesRef(dcOrVars, vars));
};

exports.detailedWatchHistoryRef = function detailedWatchHistoryRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'DetailedWatchHistory');
}

exports.detailedWatchHistory = function detailedWatchHistory(dc) {
  return executeQuery(detailedWatchHistoryRef(dc));
};
