import React from 'react'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Routes } from 'src/navigation/Routes'

export const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 8, mb: 4 }}
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" to={Routes.root}>
        {/* APP_NAME */} Accueil
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
