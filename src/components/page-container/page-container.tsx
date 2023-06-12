import React, { useEffect, useMemo, useRef, useState } from 'react'
import Box from '@mui/material/Box'
// import Container from '@mui/material/Container'
// import { AppBar } from 'components/app-bar'
import { SiteNavigation } from 'components/site-navigation'
// import Paper from '@mui/material/Paper'
import { SolifaceIcon } from 'media/soliface'
import Typography from '@mui/material/Typography'
import { isMobile } from 'react-device-detect';

const min = isMobile ? '50px' : '5vw';
const max = isMobile ? '60vw' : '20vw';
const inititalOpen = isMobile ? false : true;

export const PageContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(inititalOpen);
  const [hover, setHover] = useState(false);
  const prevOpen = useRef(inititalOpen);

  useEffect(() => {
    prevOpen.current = open;
  }, [open]);

  console.log("🚀 ~ file: page-container.tsx:18 ~ prevOpen:", new Date().toISOString(), { open, prevOpen: prevOpen.current, hover })
  // const width = open ? max : min;


  const { width, margin, text } = useMemo(() => {
    if (open) {
      return {
        width: max,
        margin: isMobile ? min : max,
        text: true,
      }
    }
    if (prevOpen.current) {
      return {
        width: min,
        margin: min,
        text: false,
      }
    }
    if (hover) {
      return {
        width: max,
        margin: min,
        text: true,
      }
    }
    return {
      width: min,
      margin: min,
      text: false,
    }
  }, [open, hover]);

  // let width: string;
  // if (open) {
  //   width = max;
  // } else if (prevOpen.current) {
  //   width = min;
  // } else if (hover) {
  //   width = max;
  // } else {
  //   width = min;
  // }

  // let margin: string;
  // if (open) {
  //   margin = max;
  // } else if (hover) {
  //   margin = min;
  // } else {
  //   margin = min;
  // }

  const a = (
    <>
      <Box
        style={{
          top: 0,
          left: 0,
          position: 'fixed',
          width: '100vw',
          height: '100vh',
        }}
      >
        <header
          style={{
            position: 'relative',
            maxHeight: '10vh',
            height: '10vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: '1rem',
            zIndex: 1200,
            backgroundColor: 'white',
            borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
          }}
        >
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
          >
            <SolifaceIcon fontSize='large' />
            <Typography
              variant='overline'
              fontSize='1.2rem'
              lineHeight='1.2rem'
            // textTransform='none'
            >SoliFace</Typography>
          </Box>
        </header>
        <aside
          // onMouseOver={() => setHover(true)}
          // onMouseOut={() => setHover(false)}
          style={{
            height: '90vh',
            width: width,
            // minWidth: '50px',
            zIndex: 1200,
            backgroundColor: 'white',
            borderRight: '1px solid rgba(0, 0, 0, 0.2)',
          }}
        >
          <SiteNavigation expandable={true} text={text} open={open} setOpen={setOpen} />
        </aside>
      </Box>
      <Box
        mt='10vh'
        mb='2rem'
        ml={margin}
        // ml={max}
        p='2rem'
      // pl='1rem'
      >
        {children}
      </Box>
    </>
  )
  return a;
  // return (
  //   <Box>
  //     {children}
  //   </Box>
  // )
}
