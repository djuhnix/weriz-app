import React from 'react'
import { FooterInfo } from './FooterInfo'
import { isMobile } from 'react-device-detect'
import { selector } from '../../store'
import { selectIsAuthenticated } from '../../store/auth/authSelector'
import { BottomAppBar } from './BottomAppBar'
import { Box } from '@mui/material'
import {Routes} from "../../navigation/Routes";
import {useLocation} from "react-router-dom";

export interface FooterLink {
  label: string
  path: string
}

interface IProps {}

const Footer = (props: IProps) => {
  const isAuth = selector(selectIsAuthenticated);
  const location = useLocation();
  /*
  const renderFooter = isMobile && (
    <BottomAppBar />
  );
  */

  return location.pathname == Routes.rootFeed
      ? (
    <Box sx={{ display: { xs: 'flex', md: 'none' }}} component="footer">
      <BottomAppBar />
    </Box>
  ) : <></>;
}

export default Footer;
