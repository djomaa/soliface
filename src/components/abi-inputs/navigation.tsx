import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { useLogger } from 'hooks/use-logger';
import React, { useEffect, useRef } from 'react'
import { useAbiInputsCtx } from './ctx'
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useToggle } from 'react-use';
import Collapse from '@mui/material/Collapse';

class RefClass {

  constructor(public ref: React.RefObject<HTMLElement>) { }

}

type Root = React.RefObject<HTMLElement>;
type Item = { root: Root, id: string, childrenMap?: ItemMap };
type ItemMap = { [k: string]: Item }

function Nav(obj: ItemMap, padding: number = 0.5) {
  return (
    Object.entries(obj).map(([key, value]) => {
      return NavItem(key, value, padding);
    })
  )
}

interface INavListProps extends Item {
  title: string;
  // root: Root;
  childrenMap: ItemMap;
  padding: number;
}
const NavList: React.FC<INavListProps> = ({ title, root, id, childrenMap, padding }) => {
  const [open, toggleOpen] = useToggle(true);

  const Icon = open ? ArrowDownIcon : ArrowRightIcon;

  return (
    <List
      key={`${title}-children`}
      disablePadding
      subheader={(
        <NavPrimitve
          title={title}
          root={root}
          id={id}
          padding={`calc(${padding}rem)`}
        >
          <Icon
            fontSize='inherit'
            onClick={toggleOpen}
          />
          <ListItemText primary={title} />
        </NavPrimitve>
        // <ListItemButton
        //   key={title}
        //   style={{
        //     padding: 0,
        //     // 0.5em is icon width
        //     paddingLeft: `calc(${padding}rem)`,

        //   }}
        //   onClick={() => {
        //     console.log('click', root)
        //     root.current!.scrollIntoView({ block: 'nearest' });
        //     root.current!.focus();
        //   }}
        // >
        //   {/* <IconButton> */}
        //   <Icon
        //     fontSize='inherit'
        //     onClick={toggleOpen}
        //   />
        //   {/* </IconButton> */}
        //   <ListItemText primary={title} />
        // </ListItemButton>
      )}
    >
      <Collapse in={open}>
        {Nav(childrenMap, padding + 1)}
      </Collapse>
    </List>
  )
}

function NavItem(key: string, { root, id, childrenMap }: Item, padding: number = 0) {
  console.log("🚀 ~ file: navigation.tsx:92 ~ NavItem ~ childrenMap:", id, childrenMap)
  if (!childrenMap) {
    return (
      <NavPrimitve
        title={key}
        root={root}
        id={id}
        padding={`calc(${padding}rem + 0.5em)`}
      >
        <ListItemText primary={key} />
      </NavPrimitve>
      // <ListItemButton
      //   key={key}
      //   // dense
      //   style={{
      //     padding: 0,
      //     paddingLeft: `calc(${padding}rem + 0.5em)`,
      //   }}
      //   onClick={() => {
      //     console.log('click', root)
      //     root.current!.scrollIntoView({ block: 'nearest' });
      //     root.current!.focus();
      //   }}
      // >
      //   <ListItemText primary={key} />
      // </ListItemButton>
    )
  }
  return (
    <NavList title={key} id={id} root={root} childrenMap={childrenMap} padding={padding} />

  )
}

interface INavPrimitiveProps extends React.PropsWithChildren {
  title: string;
  root: Root;
  id: string;
  padding: string;
}
const NavPrimitve: React.FC<INavPrimitiveProps> = ({ title, id, root, padding, children }) => {
  const { active, navContainer } = useAbiInputsCtx();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active === id) {
      // ref.current!.scrollIntoView({ block: 'nearest' });
      ref.current!.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'auto' });
      // ref.current!.scroll
      const to = ref.current!.offsetTop
      console.log('&', to)
      // navContainer?.scrollBy({ top: to })
    }
  }, [active])

  console.log("🚀 ~ file: navigation.tsx:113 ~ active:", active, title)

  return (
    <ListItemButton
      ref={ref}
      key={title}
      // dense
      style={{
        padding: 0,
        paddingLeft: padding,
        border: active === id ? '1px solid red' : undefined,
      }}
      onClick={() => {
        console.log('click', root)
        root.current!.scrollIntoView({ block: 'nearest' });
        root.current!.focus();
      }}
    >
      {children}
    </ListItemButton>
  );
}

// type RawItem = Record<string, { [k: string]: RawItem } | string>;

interface IProps {

}
export const Navigation: React.FC = (props) => {
  const [Logger] = useLogger(Navigation);
  const ctx = useAbiInputsCtx();


  const opts = React.useMemo(() => {
    const logger = Logger.sub('build')
    logger.debug('Building', ctx.map)
    const obj1: Record<string, any> = {};
    for (const [key, value] of ctx.map.entries()) {
      const sLogger = logger.sub(key);
      // sLogger.debug('Start', structuredClone(obj1));
      const parts = key.split('.');
      parts.reduce((acc, part, i) => {
        const isLast = i === parts.length - 1;
        if (isLast) {
          sLogger.debug("Set to", acc[part])
          acc[part] = { id: key, root: value };
          // acc[part] = { root: 123 };
          return acc;
        }
        if (!acc[part]) {
          acc[part] = { childrenMap: {} };
        } else if (!acc[part].childrenMap) {
          acc[part].childrenMap = {};
        }
        // if (acc[part]) {
        //   if (!acc[part].children) {
        //     acc[part].children = children;
        //   }
        // } else {
        //   acc[part] = { children };
        // }
        return acc[part].childrenMap;
      }, obj1);
      // sLogger.debug('Done', structuredClone(obj1));
    }

    console.log('obj1', obj1);

    // const obj = [...ctx.map.entries()].reduce((acc, [key, value]) => {
    //   buildObject(acc, key.split('.'), new RefClass(value));
    //   return acc;
    // }, {} as RawItem);
    // console.log('!!!', obj, ctx.map);
    const opts = Nav(obj1);
    console.log("🚀 ~ file: navigation.tsx:63 ~ opts ~ opts:", opts)
    return opts;
  }, [ctx.map]);

  return (
    <List
      // dense
      disablePadding
    >
      {opts}
    </List>
  )
}

export const useNav = () => {

}
