// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import { useState } from 'react';
// import SpeedDial from '@mui/material/SpeedDial';
// import SpeedDialIcon from '@mui/material/SpeedDialIcon';
// import SpeedDialAction from '@mui/material/SpeedDialAction';
// import MetaMaskSvg, { ReactComponent as SolifaceIcon } from 'media/soliface.svg';
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import SvgIcon from '@mui/material/SvgIcon';


// export const SideBar: React.FC = () => {
//   const [open, setOpen] = useState(false);

//   const toggleDrawer =
//     (open: boolean) =>
//       (event: React.KeyboardEvent | React.MouseEvent) => {
//         if (
//           event &&
//           event.type === 'keydown' &&
//           ((event as React.KeyboardEvent).key === 'Tab' ||
//             (event as React.KeyboardEvent).key === 'Shift')
//         ) {
//           return;
//         }

//         setOpen(open);
//       };
//   const actions = [
//     { icon: <SpeedDialIcon />, name: 'Copy' },
//     { icon: <SpeedDialIcon />, name: 'Save' },
//     { icon: <SpeedDialIcon />, name: 'Print' },
//     { icon: <SpeedDialIcon />, name: 'Share' },
//   ];
//   return (
//     <div>
//       <SpeedDial
//         ariaLabel="SpeedDial basic example"
//         sx={{ position: 'absolute', bottom: '5%', right: '5%' }}
//         icon={<SpeedDialIcon />}
//         onClick={toggleDrawer(!open)}
//       >
//       </SpeedDial>
//       {/* <Button onClick={toggleDrawer(true)}>Open</Button> */}
//       <SwipeableDrawer

//         variant="persistent"
//         anchor='left'
//         open={open}
//         onClose={toggleDrawer(false)}
//         onOpen={toggleDrawer(true)}
//       >
//         <Box
//           role="presentation"
//         // onClick={toggleDrawer(false)}
//         // onKeyDown={toggleDrawer(false)}
//         >
//           <List>
//             {/* <SvgIcon
//               inheritViewBox
//               component={SolifaceIcon}
//             /> */}
//             <SolifaceIcon height={64} width={64} />
//             {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//               <ListItem key={text} disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>
//                     {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                   </ListItemIcon>
//                   <ListItemText primary={text} />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>
//           <Divider />
//           <List>
//             {['All mail', 'Trash', 'Spam'].map((text, index) => (
//               <ListItem key={text} disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>
//                     {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                   </ListItemIcon>
//                   <ListItemText primary={text} />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </SwipeableDrawer>
//     </div >
//   );
// }

export { }
