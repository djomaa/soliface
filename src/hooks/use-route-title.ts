import { Route, RouteLabel } from 'constants/route';

import { useAppTitle } from './use-app-title';

export const useRouteTitle = (route: Route) => {
  const title = RouteLabel[route];

  return useAppTitle(title);
}
