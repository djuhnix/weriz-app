import {FC, FormEvent} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {Routes} from "navigation/Routes";
import {Link} from "react-router-dom";
import {Copyright} from "components/footer/Copyright";

export const Login: FC = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Box
      sx={boxStyles.root}
    >
      <Avatar sx={boxStyles.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Se connecter
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Adresse Email"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Mot de passe"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Se souvenir de moi"
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
            <Link to={Routes.forgetPassword}>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link to={Routes.signup}>
              {"Vous n'avez pas de compte"}
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Copyright />
    </Box>
  )
};

const boxStyles = {
  root: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    m: 1,
    bgColor: 'secondary.main'
  }
};