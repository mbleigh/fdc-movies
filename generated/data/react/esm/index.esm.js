import { listMoviesRef, connectorConfig } from '../../esm/index.esm.js';
import { validateArgs, CallerSdkTypeEnum } from 'firebase/data-connect';
import { useDataConnectQuery } from '@tanstack-query-firebase/react/data-connect';


export function useListMovies(dc, options) {
  const { dc: dcInstance } = validateArgs(connectorConfig, dc, undefined, false);
  const ref = listMoviesRef(dcInstance);
  return useDataConnectQuery(ref, options, CallerSdkTypeEnum.GeneratedReact);
}