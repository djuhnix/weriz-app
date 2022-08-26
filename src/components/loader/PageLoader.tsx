import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material'

export const PageLoader = () => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
      onClick={() => {}}
    >
      <CircularProgress />
    </Backdrop>
  )
}
