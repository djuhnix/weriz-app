import { useTheme } from '@mui/material/styles'
import { createMakeAndWithStyles } from 'tss-react'

export const { makeStyles, withStyles } = createMakeAndWithStyles({
  useTheme,
  // OR, if you have extended the default mui theme adding your own custom properties:
  // Let's assume the myTheme object that you provide to the <ThemeProvider /> is of
  // type MyTheme then you'll write:
  //"useTheme": useTheme as (()=> MyTheme)
})

// As a MUI user (if you are using TypeScript >= v4.4), you can simply:
// import { makeStyles, withStyles } from "tss-react/mui";
