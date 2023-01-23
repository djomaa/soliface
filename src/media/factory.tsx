import React from 'react'

import SvgIcon, { SvgIconTypeMap } from '@mui/material/SvgIcon'
import { BaseProps } from '@mui/material/OverridableComponent'

type SvgComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement>>
type IconProps = BaseProps<SvgIconTypeMap>

export const SvgIconFactory = (base: SvgComponent) => {
  const fc: React.FC<IconProps> = (props) => {
    return (
      <SvgIcon
        {...props}
        inheritViewBox
        component={base}
      />
    )
  }
  return fc
}
