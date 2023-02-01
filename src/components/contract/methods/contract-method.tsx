// import React, { useState } from 'react'
// import { FormContainer } from 'react-hook-form-mui'

// import Stack from '@mui/material/Stack'
// import Divider from '@mui/material/Divider'
// import Accordion from '@mui/material/Accordion'
// import Typography from '@mui/material/Typography'
// import ExpandMore from '@mui/icons-material/ExpandMore'
// import AccordionSummary from '@mui/material/AccordionSummary'
// import AccordionDetails from '@mui/material/AccordionDetails'

// import { MethodInputs } from './inputs'
// import { MethodActions } from './actions'
// import { MethodCtxProvider, useMethodCtx } from './method.context'
// import { useContractCtx } from 'contexts/contract'

// interface IProps {
// }
// export const ContractMethodCore: React.FC<IProps> = () => {
//   const [open, setOpen] = useState(false)
//   const contractCtx = useContractCtx();
//   const artifact = useContractCtx();
//   const ctx = useMethodCtx()

//   return (
//     <Accordion
//       expanded={open}
//       TransitionProps={{ unmountOnExit: true }}
//       onChange={() => { setOpen((prev) => !prev) }}
//     >
//       <AccordionSummary
//         expandIcon={<ExpandMore />}
//       >
//         <Typography sx={{ width: '33%', flexShrink: 0 }}>
//           {ctx.abi.name}
//         </Typography>
//       </AccordionSummary>
//       <AccordionDetails>
//         <Divider />
//         <FormContainer formContext={ctx.form}>
//           <Stack spacing={1.5}>
//             <MethodInputs />
//             <MethodActions />
//             {ctx.result}
//           </Stack>
//         </FormContainer>
//       </AccordionDetails>
//     </Accordion>
//   )
// }

// interface IProps {
//   hash: 
// }
// export const ContractMethod: React.FC<IProps> = (props) => {
//   return (
//     <MethodCtxProvider {...props}>
//       <ContractMethodCore />
//     </MethodCtxProvider>
//   )
// }

export { }
