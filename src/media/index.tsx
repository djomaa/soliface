import React from 'react'

import { BaseProps } from '@mui/material/OverridableComponent'
import SvgIcon, { SvgIconTypeMap } from '@mui/material/SvgIcon'

import { ReactComponent as SolifaceIconComponent } from 'media/soliface.svg'

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
