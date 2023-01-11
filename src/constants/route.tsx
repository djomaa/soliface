export enum Route {
  Home = '/',
  Abi = '/abi',
}

export const RouteLabel: Record<Route, string> = {
  [Route.Home]: 'Home',
  [Route.Abi]: 'Abi',
}

export const Routes = Object.entries(RouteLabel) as [route: string, label: string][];
