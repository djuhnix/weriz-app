import React, { FC, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { Routes } from 'src/navigation/Routes'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Copyright } from 'src/components/footer/Copyright'
import {
  colors,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import * as z from 'zod'
import { Config } from 'src/config'
import { useLoginMutation } from 'src/store/auth/authApi'
import { ApiStatusCode } from '../../enum/api'
import { statusInRange } from '../../services/utils'
import { selector } from '../../store'
import { selectIsAuthenticated } from '../../store/auth/authSelector'
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

  const isAuthenticated = selector(selectIsAuthenticated);
  const [login, { error, isError, isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('')
  const navigate = useNavigate();

  const location = useLocation();
  const locState = location.state as { from: Location} | null;
  const from = locState?.from?.pathname || Routes.root;

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from);
    }
  }, []);

  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues,
    // resolver: zodResolver(schema)
  });

  const onSubmit = (data: any) => {
    // const hashedPassword = bcrypt.hashSync(data.password) // hash created previously created upon sign up
    // not necessary 'cause of https ?
    login({email: data.email, password: data.password})
      .unwrap()
      // after login navigate the user where he came from
      .then(() => navigate(from))
      .catch(error => {
        if ('status' in error && statusInRange(error.status, ApiStatusCode.BAD_REQUEST)) {
          setLoginError("Vos identifiants sont incorrects");
        }
      })
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
        {isError && (<Typography align="center" color={colors.red.A400}> {loginError} </Typography>)}
        <Box textAlign='center'>
          <LoadingButton
            loading={isLoading}
            type="submit"
            fullWidth={!isLoading}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Se connecter
          </LoadingButton>
        </Box>
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
