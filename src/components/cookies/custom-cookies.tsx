import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import { ICookies, useCookies } from 'hooks/use-cookies';
import React from 'react';

const Label: Record<keyof ICookies['config'], string> = {
  account: 'Account address (when wallet connected)',
  wallet: 'Connected wallet (MetaMask, WalletConnect, etc)',
  chainId: 'Unique identifier of blockchain you are connected to',
  abiHash: 'Hash of ABI methods (ABI is stored only in the local storage)',
  contractAddress: 'Contract you interact with (address)'
}

export const CustomCookies: React.FC = () => {
  const cookies = useCookies();
  console.log("🚀 ~ file: custom-cookies.tsx:19 ~ cookies", cookies)

  const handleChange = (field: keyof ICookies['config']) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      cookies.updateConfig({
        [field]: !!event.target.checked,
      });
    }
  }
  return (
    <>
      <Divider />
      <FormControl variant="outlined">
        <FormGroup>
          {Object.keys(cookies.value.config).map((oKey) => {
            console.log("🚀 ~ file: custom-cookies.tsx:35 ~ {Object.keys ~ oKey", oKey)
            const key = oKey as keyof ICookies['config'];
            return (
              <FormControlLabel
                key={key}
                label={Label[key]}
                control={
                  <Switch checked={cookies.value.config[key]} onChange={handleChange(key)} />
                }
              />
            );
          })}

        </FormGroup>
        <FormHelperText>Cookies set v0.0.1. This website will ask you to accept every new version.</FormHelperText>
      </FormControl>
    </>
  )
}
