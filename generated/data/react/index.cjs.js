const { listMoviesRef, connectorConfig } = require('../index.cjs.js');
const { validateArgs, CallerSdkTypeEnum } = require('firebase/data-connect');
const { useDataConnectQuery } = require('@tanstack-query-firebase/react/data-connect');


exports.useListMovies = function useListMovies(dc, options) {
  const { dc: dcInstance } = validateArgs(connectorConfig, dc, undefined, false);
  const ref = listMoviesRef(dcInstance);
  return useDataConnectQuery(ref, options, CallerSdkTypeEnum.GeneratedReact);
}