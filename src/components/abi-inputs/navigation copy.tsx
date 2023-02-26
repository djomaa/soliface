import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { useLogger } from 'hooks/use-logger';
import React from 'react'
import { useAbiInputsCtx } from './ctx'
import ArrowRight from '@mui/icons-material/ArrowRight';

class RefClass {

  constructor(public ref: React.RefObject<HTMLElement>) { }

}

type Item = { root: React.RefObject<HTMLElement>, children?: It };
type It = { [k: string]: Item }
// type RawItem = { [k: string]: RawItem | RefClass }
// type Item = { key: string, value: Item[] | React.RefObject<HTMLElement> };

// function build(obj: It, key?: string, padding: number = 1) {
//   const entries = Object.entries(obj);

//   const content = entries.map(([key, { root, children }]) => {
//     console.log('!@#', key, root, children);
//     const btn = (
//       <ListItemButton
//         key={key}
//         disableGutters
//         style={{
//           // paddingLeft: `${padding}rem`,
//         }}
//         onClick={() => {
//           console.log('click', root)
//           root.current!.scrollIntoView({ block: 'nearest' });
//           root.current!.focus();
//           // return value.current!.focus();
//         }}
//       >
//         {children && (
//           <ListItemIcon>
//             <KeyboardArrowDown fontSize='medium' />
//           </ListItemIcon>
//         )}
//         <ListItemText inset={!children} primary={key} />
//       </ListItemButton>
//     )
//     if (children) {
//       return (
//         <>
//           <ListItemButton
//             key={key}
//             disableGutters
//             style={{
//               // paddingLeft: `${padding}rem`,
//             }}
//             onClick={() => {
//               console.log('click', root)
//               root.current!.scrollIntoView({ block: 'nearest' });
//               root.current!.focus();
//               // return value.current!.focus();
//             }}
//           >

//             <ListItemIcon>
//               <KeyboardArrowDown fontSize='medium' />
//             </ListItemIcon>
//             <ListItemText inset={!children} primary={key} />
//           </ListItemButton>
//           {build(children, key, (padding ?? 0) + 1)}
//         </>
//       );
//     }
//     return <ListItemButton
//       key={key}
//       disableGutters
//       style={{
//         paddingLeft: `${padding}rem`,
//       }}
//       onClick={() => {
//         console.log('click', root)
//         root.current!.scrollIntoView({ block: 'nearest' });
//         root.current!.focus();
//         // return value.current!.focus();
//       }}
//     >
//       <ListItemText inset={true} primary={key} />
//     </ListItemButton>;
//   });
//   console.log("🚀 ~ file: navigation.tsx:40 ~ content ~ content:", key, content)

//   return (
//     <List
//       key={`${key}-children`}
//       disablePadding
//     // sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
//     // subheader={
//     //   <ListSubheader component="div" id="nested-list-subheader">
//     //     Nested List Items
//     //   </ListSubheader>
//     // }
//     >
//       {content}
//     </List>
//   )
// }

function buildMany(obj: It, padding: number = 0.5) {
  return (
    Object.entries(obj).map(([key, value]) => {
      return build(key, value, padding);
    })
  )
}

function build(key: string, { root, children }: Item, padding: number = 0) {
  if (!children) {
    return (
      <ListItemButton
        key={key}
        // dense
        style={{
          padding: 0,
          paddingLeft: `${padding}rem`,
        }}
        onClick={() => {
          console.log('click', root)
          root.current!.scrollIntoView({ block: 'nearest' });
          root.current!.focus();
        }}
      >
        <ListItemText primary={key} />
      </ListItemButton>
    )
  }
  return (
    <>
      <List
        key={`${key}-children`}
        disablePadding
        subheader={(
          <ListItemButton
            key={key}
            style={{
              padding: 0,
              // 0.5em is icon width
              paddingLeft: `calc(${padding}rem - 0.5em)`,

            }}
            onClick={() => {
              console.log('click', root)
              root.current!.scrollIntoView({ block: 'nearest' });
              root.current!.focus();
            }}
          >
            <ArrowRight />
            <ListItemText inset={!children} primary={key} />
          </ListItemButton>
        )}
      >
        {buildMany(children, padding + 1.5)}
      </List>
    </>
  )
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
          acc[part] = { root: value };
          // acc[part] = { root: 123 };
          return acc;
        }
        if (!acc[part]) {
          acc[part] = { children: {} };
        } else if (!acc[part].children) {
          acc[part].children = {};
        }
        // if (acc[part]) {
        //   if (!acc[part].children) {
        //     acc[part].children = children;
        //   }
        // } else {
        //   acc[part] = { children };
        // }
        return acc[part].children;
      }, obj1);
      // sLogger.debug('Done', structuredClone(obj1));
    }

    console.log('obj1', obj1);

    // const obj = [...ctx.map.entries()].reduce((acc, [key, value]) => {
    //   buildObject(acc, key.split('.'), new RefClass(value));
    //   return acc;
    // }, {} as RawItem);
    // console.log('!!!', obj, ctx.map);
    const opts = buildMany(obj1);
    console.log("🚀 ~ file: navigation.tsx:63 ~ opts ~ opts:", opts)
    return opts;
  }, [ctx.map]);

  return (
    <Box>
      Nav:
      <List
        // dense
        disablePadding
      >
        {opts}
      </List>
    </Box>
  )
}

export const useNav = () => {

}
