import { Chain } from 'types/chain'

export enum Route {
  Home = '/',
  AbiManager = '/abi',
  CreateArtifact = '/artifact/create',
  EditArtifact = '/artifact/:hash/edit',
  ChainManager = '/chains',
  Chain = '/chains/:id'
}

export const createRoute = {
  [Route.Chain]: (id: Chain['chainId']) => Route.Chain.replace(':id', id.toString()),
  [Route.EditArtifact]: (hash: string) => Route.EditArtifact.replace(':hash', hash),
}

export const RouteLabel: Partial<Record<Route, string>> = {
  [Route.Home]: 'Home',
  [Route.AbiManager]: 'Abi',
  [Route.ChainManager]: 'Chains',
}

export const Routes = Object.entries(RouteLabel) as Array<[route: string, label: string]>
