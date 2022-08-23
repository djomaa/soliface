import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@mui/material';
// import { Icon } from '@mui/core';

const sizesMap = {
  'small': { size: 17, extraSize: 10 },
  'medium': { size: 25, extraSize: 13 },
  'large': { size: 25, extraSize: 15 },
}

interface iProps {
  icon: JSX.Element;
  extraIcon: JSX.Element;
  size?: string;
  color?: string;
  position?: string;
  disabled?: boolean;
}
export const ComposedIcon = ({
  icon,
  extraIcon,
  size = 'small',
  color = 'inherit',
  position = 'bottom-end',
  disabled,
}: iProps) => (
  <div style={{
    position: 'relative',
    cursor: 'default'
  }}>
    <div style={{ lineHeight: '0px' }}>
      {icon}
      {/* <Icon
        className={Array.isArray(icon) ? icon.join(' ') : `fa fa-${icon}`}
        style={{
          fontSize: sizesMap[size].size,
          width: '1.25em'
        }} /> */}
    </div>
    <div
      style={{
        lineHeight: '0px',
        position: 'absolute',
        textShadow: '0.75px 0px 0.5px #FFF, 0px 0.75px 0.5px #FFF, -0.75px 0px 0.5px #FFF, 0px -0.75px 0.5px #FFF',
        bottom: position.includes('bottom') ? '-4px' : undefined,
        top: position.includes('top') ? '-4px' : undefined,
        left: position.includes('start') ? '-4px' : undefined,
        right: position.includes('end') ? '-4px' : undefined,
      }}>
      {extraIcon}
    </div>
  </div>
)

ComposedIcon.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  extraIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.string,
  position: PropTypes.oneOf(['top-start', 'top-end', 'bottom-start', 'bottom-end']),
  disabled: PropTypes.bool,
};

