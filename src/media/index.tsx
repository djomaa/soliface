import React from 'react';
import SvgIcon, { SvgIconTypeMap } from '@mui/material/SvgIcon';
import { ReactComponent as SolifaceIconComponent } from 'media/soliface.svg';
import { BaseProps, OverridableComponent } from '@mui/material/OverridableComponent';


type IconProps = BaseProps<SvgIconTypeMap>
export const SolifaceIcon: React.FC<IconProps> = (props) => {
  return (
    <SvgIcon
      {...props}
      inheritViewBox
      component={SolifaceIconComponent}
    />
  )
}

