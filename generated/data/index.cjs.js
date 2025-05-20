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

const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'connector',
  service: 'app',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

function updateUserRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUser', inputVars);
}
exports.updateUserRef = updateUserRef;

exports.updateUser = function updateUser(dcOrVars, vars) {
  return executeMutation(updateUserRef(dcOrVars, vars));
};

function addWatchRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddWatch', inputVars);
}
exports.addWatchRef = addWatchRef;

exports.addWatch = function addWatch(dcOrVars, vars) {
  return executeMutation(addWatchRef(dcOrVars, vars));
};

function addReviewRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddReview', inputVars);
}
exports.addReviewRef = addReviewRef;

exports.addReview = function addReview(dcOrVars, vars) {
  return executeMutation(addReviewRef(dcOrVars, vars));
};

function deleteWatchRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteWatch', inputVars);
}
exports.deleteWatchRef = deleteWatchRef;

exports.deleteWatch = function deleteWatch(dcOrVars, vars) {
  return executeMutation(deleteWatchRef(dcOrVars, vars));
};

function homePageRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'HomePage');
}
exports.homePageRef = homePageRef;

exports.homePage = function homePage(dc) {
  return executeQuery(homePageRef(dc));
};

function searchMoviesRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchMovies', inputVars);
}
exports.searchMoviesRef = searchMoviesRef;

exports.searchMovies = function searchMovies(dcOrVars, vars) {
  return executeQuery(searchMoviesRef(dcOrVars, vars));
};

function moviePageRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'MoviePage', inputVars);
}
exports.moviePageRef = moviePageRef;

exports.moviePage = function moviePage(dcOrVars, vars) {
  return executeQuery(moviePageRef(dcOrVars, vars));
};

function watchHistoryPageRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'WatchHistoryPage', inputVars);
}
exports.watchHistoryPageRef = watchHistoryPageRef;

exports.watchHistoryPage = function watchHistoryPage(dcOrVars, vars) {
  return executeQuery(watchHistoryPageRef(dcOrVars, vars));
};

function browseMoviesRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'BrowseMovies', inputVars);
}
exports.browseMoviesRef = browseMoviesRef;

exports.browseMovies = function browseMovies(dcOrVars, vars) {
  return executeQuery(browseMoviesRef(dcOrVars, vars));
};

function getMoviesRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMovies', inputVars);
}
exports.getMoviesRef = getMoviesRef;

exports.getMovies = function getMovies(dcOrVars, vars) {
  return executeQuery(getMoviesRef(dcOrVars, vars));
};

function detailedWatchHistoryRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'DetailedWatchHistory');
}
exports.detailedWatchHistoryRef = detailedWatchHistoryRef;

exports.detailedWatchHistory = function detailedWatchHistory(dc) {
  return executeQuery(detailedWatchHistoryRef(dc));
};
