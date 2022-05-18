import React from 'react'
import { Box, CircularProgress } from '@mui/material'

export const PageLoader = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  )
}
