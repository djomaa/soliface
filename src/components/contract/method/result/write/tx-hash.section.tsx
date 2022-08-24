import React, { useMemo, useState } from 'react';
import { Dialog, DialogContent, Icon, IconButton, Link, List, ListItem, Modal, Paper, Stack, SvgIconTypeMap, Tooltip, Typography } from '@mui/material';
import { useChainCtx } from 'contexts/web3';
import { useChainList } from 'hooks/use-chain-list';
import { Launch as OriginalLaunchIcon, ContentCopy as CopyIcon } from '@mui/icons-material'
import { Chain } from 'types/chain';
import { generateTxLink, generateTxLinkByChain } from 'helpers/explorer';
import { useCopyToClipboard } from 'react-use';

const LaunchIcon: React.FC<SvgIconTypeMap['props']> = (props) => <OriginalLaunchIcon {...props} fontSize='small' />

interface iProps {
  txHash: string;
}
const NoLinkLaunch: React.FC<{ chain: Chain }> = ({ chain }) => {
  const [open, setOpen] = useState(false);

  const explorers = useMemo(() => {
    if (!chain.explorers) {
      return [];
    }
    return chain.explorers.map(({ url }) => (
      <ListItem>
        <Link
          key={url}
          target="_blank"
          href={url}
        >
          {url}
        </Link>
      </ListItem>
    ));
  }, [chain]);

  if (!explorers.length) {
    return (
      <Tooltip title='We are not able to generate link for this chain'>
        <LaunchIcon color='disabled' />
      </Tooltip>
    )
  }

  return (
    <>
      <Tooltip title='We are not able to generate link for this chain. Please click the icon to check available explorers.'>
        <IconButton onClick={() => setOpen((p) => !p)}>
          <LaunchIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogContent>
          <List>
            {explorers}
          </List>
        </DialogContent>
      </Dialog>
    </>
  )
}

export const TxHashSection: React.FC<iProps> = ({ txHash }) => {
  const { chainId } = useChainCtx();
  const { chainList } = useChainList();
  const chain = chainList.find((c) => c.chainId === chainId);
  const [, copyToClipboard] = useCopyToClipboard();

  const launchIcon = useMemo(() => {
    if (!chain) {
      return (
        <Tooltip title='We have no info about the chain'>
          <LaunchIcon />
        </Tooltip>
      )
    }
    const link = generateTxLinkByChain(chain, txHash);
    if (!link) {
      return <NoLinkLaunch chain={chain} />;
    }

    return (
      <Link href={link} target='_blank'>
        <IconButton>
          <LaunchIcon />
        </IconButton>
      </Link>
    )

  }, [txHash, chainId]);

  const copyIcon = useMemo(() => {
    return (
      <IconButton onClick={() => copyToClipboard(txHash)}>
        <CopyIcon fontSize='small' />
      </IconButton>
    )
  }, [txHash]);

  return (
    // <Typography variant='body2'>
    //   {txHash} {launchIcon}
    // </Typography>
    <>
      {txHash} {copyIcon} {launchIcon}
    </>
  )

}
