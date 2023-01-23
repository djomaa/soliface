export enum Route {
  Home = '/',
  AbiManager = '/abi',
  ChainManager = '/chains',
  Chain = '/chains/:id'
}

export const RouteLabel: Record<Route, string> = {
  [Route.Home]: 'Home',
  [Route.AbiManager]: 'Abi',
  [Route.ChainManager]: 'Chains',
  [Route.Chain]: 'Chain'
}

export const Routes = Object.entries(RouteLabel) as Array<[route: string, label: string]>
