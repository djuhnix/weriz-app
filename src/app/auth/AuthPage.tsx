import React, { FC, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { Routes } from 'src/navigation/Routes'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Copyright } from 'src/components/footer/Copyright'
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Config } from 'src/config'
import { useLoginMutation } from 'src/store/auth/authApi'
// import { useAppSelector } from 'store'

const schema = z.object({
  email: z.string({required_error: "L'adresse email est obligatoire"})
    .email({ message: "Adresse email invalide" }),
  password: z.string({required_error: "Le mot de passe est obligatoire"})
    .regex(new RegExp(Config.PASSWORD_REGEX), "Votre mot de passe doit contenir au moins 8 caractères avec au moins 1 lettre majuscule, 1 lettre minuscule et 1 chiffre."),
});

interface Props {
  mode?: 'signup' | 'login'
}

export const AuthPage: FC<Props> = ({ mode = 'login'} : Props) => {
  const defaultValues = {
    email: '',
    password: ''
    // remember: false
    // tos: false
  }

  // const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [login] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const locState = location.state as { from: Location} | null;
  const from = locState?.from?.pathname || Routes.root;

/*
  if (isAuthenticated) {
    return <Navigate to={from} />
  }
 */

  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues,
    // resolver: zodResolver(schema)
  });

  const onSubmit = (data: any) => {
    // const hashedPassword = bcrypt.hashSync(data.password) // hash created previously created upon sign up
    // not necessary 'cause of https ?
    login({email: data.email, password: data.password})
    // after login navigate the user where he came from
    navigate(from)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box sx={boxStyles.root}>
      <Avatar sx={boxStyles.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Weriz Connexion
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate={true} sx={{ mt: 1 }}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              error={Boolean(errors.email)}
              helperText={errors?.email?.message}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse Email"
              autoComplete="email"
              autoFocus
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({field}) => (
            <FormControl
              error={Boolean(errors.password)}
              fullWidth
              required
              margin="normal"
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                aria-describedby="password-helper-text"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                {...field}
                label="Password"
              />
              <FormHelperText id="password-helper-text">
                {errors?.password?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Se connecter
        </Button>
        <Grid container>
          <Grid item xs>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              <Link to={Routes.rootForgetPassword} color="inherit">Mot de passe oublié ?</Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              <Link to={Routes.rootSignup} color="grey">{"Vous n'avez pas de compte"}</Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Copyright />
    </Box>
  )
}

const boxStyles = {
  root: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    m: 1,
    bgColor: 'secondary.main',
  },
}
