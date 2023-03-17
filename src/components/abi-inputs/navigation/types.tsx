import { MapItem } from '../ctx';

export type NavItemRef = MapItem;
export type NavMapItemBase = { ref: NavItemRef, id: string };
export type NavMapItemSingle = NavMapItemBase & { childrenMap: undefined };
export type NavMapParentItem = NavMapItemBase & { childrenMap: NavMap };
export type NavMapItem = NavMapItemSingle | NavMapParentItem;
export type NavMap = { [k: string]: NavMapItem }
