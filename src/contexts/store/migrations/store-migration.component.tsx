import React, { useState } from 'react'

import { useLogger } from 'hooks/use-logger'
import useAsyncEffect from 'use-async-effect'
import { UseStateObject } from 'types/react';

import { useStoreMigration1 } from './1/1.store-migration'
import Dialog from '@mui/material/Dialog'
import { Fab, LinearProgress, Typography, Zoom } from '@mui/material'
import Container from '@mui/system/Container';
import Stack from '@mui/system/Stack';
import Box from '@mui/system/Box';

const normalise = (value: number, { min, max }: { min: number, max: number }) => ((value - min) * 100) / (max - min);

const AllMigrations = [
  useStoreMigration1,
]

interface ICoreProps extends UseStateObject<'done', boolean> {
}
export const StoreMigrationCore: React.FC<ICoreProps> = (props) => {
  const [Logger] = useLogger(StoreMigration);

  const [progress, setProgress] = useState(0);

  // TODO: try catch
  const migrations = AllMigrations.map(m => m());

  useAsyncEffect(async () => {
    Logger.debug('Starting');
    let i = 0;
    for (const [done, migration] of migrations) {
      if (!done) {
        await migration();
      }
      i += 1;
      Logger.debug(`Executed ${i}/${migrations.length}`);
      setProgress(i);
    }
    Logger.debug('Done');
    // props.setDone(true);
  }, []);

  const percent = normalise(progress, { min: 0, max: migrations.length });
  const allDone = migrations.every(([done]) => done);

  return (
    <Dialog
      open={props.done === false && !allDone}
      fullScreen
    >
      <Container>
        <Box mt={20}>
          <Stack
            direction="column"
            spacing={2}
            justifyContent='center'
          // mt={20}
          >
            <Typography variant='h3' align='center'>Artifacts migration</Typography>
            <Typography gutterBottom variant='body1' align='center'>
              Data storage format has been changed, so we need to migrate some data structrues
            </Typography>
            <Typography variant='h6' align='center'>{percent} %</Typography>
            <LinearProgress
              value={percent}
              variant="determinate"
              style={{ width: "100%" }}
            />

            {percent === 100 && (
              <Box
                mt='5vh'
                display='flex'
                justifyContent='center'
              >
                <Zoom
                  in={true}
                  timeout={2e3}
                  unmountOnExit
                >
                  <Fab
                    autoFocus
                    color='success'
                    variant='extended'
                    onClick={() => props.setDone(true)}
                  >
                    Continue!
                  </Fab>
                </Zoom>
              </Box>
            )}

          </Stack>
        </Box>
      </Container>

      {/* {progress < migrations.length
        ? (
          <>
            <DialogTitle>
              Applying storage migrations..
            </DialogTitle>
            <DialogContent>
              <LinearProgress
                variant="determinate"
                value={normalise(progress, { min: 0, max: migrations.length })}
              />
            </DialogContent>
            <DialogActions>
              Continue
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle>
              Storage migrations applied!
            </DialogTitle>
            <DialogContent>
              <LinearProgress
                variant="determinate"
                value={100}
              />
            </DialogContent>
            <DialogActions>
              <Button>
                Continue
              </Button>
            </DialogActions>
          </>
        )} */}
    </Dialog>
  )

}

// used to clear-up store listeners
export const StoreMigration = () => {
  const [done, setDone] = useState(false);

  console.log("DONE");
  if (done) {
    return <></>;
  }

  return (
    <StoreMigrationCore done={done} setDone={() => setDone(true)} />
  )

}
