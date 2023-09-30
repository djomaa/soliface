import React, { useState } from 'react'

import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TabContext from '@mui/lab/TabContext'
import AlertTitle from '@mui/material/AlertTitle'
import CloseIcon from '@mui/icons-material/Close'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import CircularProgress from '@mui/material/CircularProgress'

// import { Chain } from 'types/chain'
import { AsyncModal } from 'contexts/modal'
import { useChainCtx } from 'contexts/chain'
import { JsonBox } from 'components/json-box'
import style from 'styles/dialog.module.scss'
import { useChainListQuery } from 'hooks/use-chain-list/chain-list.query'
import { useAsync } from 'hooks/use-async'
import { useDbCollection } from 'contexts/db/hooks/use-db-collection'
import { Chain } from 'contexts/db/schema/chain'
import { fetchChains } from './fetch-chains'
import { withCtx } from 'contexts/ctx-factory'
import { QueryCtxProvider } from 'contexts/query'
import { Modal } from 'libs/modals'
import { safe } from 'utils/safe'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'


const SyncChainsCore: Modal = (props) => {
  const [step, setStep] = React.useState(0);
  const [toSyncCount, setToSyncCount] = React.useState<number>();
  const [total, setTotal] = React.useState<number>();
  const [dbResult, setDbResult] = React.useState<{ success: number, error: number }>();
  const chainCollection = useDbCollection(Chain.Collection.Name);

  useAsync(async () => {
    setStep(0);
    const chains = await fetchChains();
    setToSyncCount(chains.length);
    setStep(1);
    const result = await chainCollection.bulkInsert(chains);
    console.log("🚀 ~ file: sync-chains.modal.tsx:64 ~ useAsync ~ result:", result)
    const total = await chainCollection.count().exec();
    setTotal(total);
    setStep(2);
    setDbResult({ success: result.success.length, error: result.error.length });
  }, []);


  return (
    <Dialog open={true} scroll='paper' classes={{
      scrollPaper: style.DialogContainer,
      paperScrollBody: style.DialogContainer
    }}>
      <DialogTitle>Synchronize chains</DialogTitle>
      <DialogContent>
        <Stepper activeStep={step} orientation="vertical">
          <Step>
            <StepLabel>
              Fetch chains from <a href='https://chainlist.org'>chainlist.org</a>
            </StepLabel>
            <StepContent>
              <CircularProgress />
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              Update database {toSyncCount && <>with {toSyncCount} chains in total</>}
            </StepLabel>
            <StepContent>
              <CircularProgress />
            </StepContent>
          </Step>
        </Stepper>
      </DialogContent>
      {step === 2 && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <div>
            New chains: {dbResult!.success}
          </div>
          <div>
            Already synced chains: {dbResult!.error}
          </div>
          <div>
            Total chains in the DB: {total!}
          </div>
          <Button
            fullWidth
            variant='contained'
            sx={{ mt: 1 }}
            onClick={() => props.onClose()}
          >
            Close
          </Button>
        </Paper>
        // <Box>
        //   Database was updated:
        // <p>
        //   New chains: {dbResult!.success}
        // </p>
        // <p>
        //   Already synced chains: {dbResult!.error}
        // </p>
        // <p>
        //   Total chains in the DB: {total!}
        // </p>
        // </Box>
      )
      }
    </Dialog >
  )
}

export const SyncChainsModal = withCtx(QueryCtxProvider, SyncChainsCore);
