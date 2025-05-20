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

import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'connector',
  service: 'app',
  location: 'us-central1'
};

export function updateUserRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUser', inputVars);
}

export function updateUser(dcOrVars, vars) {
  return executeMutation(updateUserRef(dcOrVars, vars));
}

export function addWatchRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddWatch', inputVars);
}

export function addWatch(dcOrVars, vars) {
  return executeMutation(addWatchRef(dcOrVars, vars));
}

export function addReviewRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddReview', inputVars);
}

export function addReview(dcOrVars, vars) {
  return executeMutation(addReviewRef(dcOrVars, vars));
}

export function deleteWatchRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteWatch', inputVars);
}

export function deleteWatch(dcOrVars, vars) {
  return executeMutation(deleteWatchRef(dcOrVars, vars));
}

export function homePageRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'HomePage');
}

export function homePage(dc) {
  return executeQuery(homePageRef(dc));
}

export function searchMoviesRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchMovies', inputVars);
}

export function searchMovies(dcOrVars, vars) {
  return executeQuery(searchMoviesRef(dcOrVars, vars));
}

export function moviePageRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'MoviePage', inputVars);
}

export function moviePage(dcOrVars, vars) {
  return executeQuery(moviePageRef(dcOrVars, vars));
}

export function watchHistoryPageRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'WatchHistoryPage', inputVars);
}

export function watchHistoryPage(dcOrVars, vars) {
  return executeQuery(watchHistoryPageRef(dcOrVars, vars));
}

export function browseMoviesRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'BrowseMovies', inputVars);
}

export function browseMovies(dcOrVars, vars) {
  return executeQuery(browseMoviesRef(dcOrVars, vars));
}

export function getMoviesRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMovies', inputVars);
}

export function getMovies(dcOrVars, vars) {
  return executeQuery(getMoviesRef(dcOrVars, vars));
}

export function detailedWatchHistoryRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'DetailedWatchHistory');
}

export function detailedWatchHistory(dc) {
  return executeQuery(detailedWatchHistoryRef(dc));
}

