import React from 'react'
import HeaderLogo from './HeaderLogo'
import { PrimaryAppBar } from './PrimaryAppBar'
import { isMobile } from 'react-device-detect';

export const Header = () => {
  // do not display header on login (or landing?)
  //
  return (
    <header>
      <PrimaryAppBar />
    </header>
  )
}
