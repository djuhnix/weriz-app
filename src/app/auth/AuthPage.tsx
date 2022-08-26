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
} from '@mui/material'
import {Control, Controller, useForm} from 'react-hook-form'
import * as z from 'zod'
import { useLoginMutation, useSignupMutation } from 'src/store/auth/authApi'
import { ApiStatusCode } from '../../enum/api'
import { statusInRange } from '../../services/utils'
import { selector } from '../../store'
import { selectIsAuthenticated } from '../../store/auth/authSelector'
import {boxStyles} from "./styles";
import {validations} from "../../services/formsValidation";
import {useBaseStyles} from "../baseStyles";
import {isMobile} from "react-device-detect";
import {PasswordInput} from "../../components/input/PasswordInput";

interface Props {
    mode?: 'signup' | 'login'
}

export const AuthPage: FC<Props> = ({ mode = 'login'} : Props) => {
    const defaultValues = {
        username: '',
        email: '',
        password: ''
        // remember: false
        // tos: false
    }

    const isAuthenticated = selector(selectIsAuthenticated);

    const [login, loginResult] = useLoginMutation();
    const [signup, signupResult] = useSignupMutation();

    const [submitError, setSubmitError] = useState('');

    const { classes } = useBaseStyles();

    const result = mode == 'signup' ? signupResult : loginResult;

    const navigate = useNavigate();
    const location = useLocation();

    const locState = location.state as { from: Location} | null;
    const from = locState?.from?.pathname || Routes.rootFeed;

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
        if (mode == 'login') {
            login({username: data.username, password: data.password})
                .unwrap()
                // after login navigate the user where he came from
                .then(() => navigate(from))
                .catch(error => {
                    if ('status' in error && statusInRange(error.status, ApiStatusCode.BAD_REQUEST)) {
                        setSubmitError("Vos identifiants sont incorrects");
                    }
                })
        } else {
            signup({username: data.username, email: data.email, password: data.password})
                .unwrap()
                // after login navigate the user where he came from
                .then(() => navigate(from))
                .catch(error => {
                    if ('status' in error && statusInRange(error.status, ApiStatusCode.BAD_REQUEST)) {
                        setSubmitError("Une erreur est survenue, veuillez vérifier vos informations");
                    }
                })
        }
    }

    return (
        <Box className={classes.roundContainer} sx={boxStyles.root}>
            <Avatar sx={boxStyles.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Weriz {mode == 'login' ? 'Connexion' : 'Inscription'}
            </Typography>
            {/* TODO Remove novalidate */}
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate={true} sx={{m: 2}}>
                <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    render={({field}) => (
                        <TextField
                            error={Boolean(errors.username)}
                            helperText={errors?.username?.message}
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Nom d'utilisateur"
                            autoFocus
                            {...field}
                        />
                    )}
                />
                {mode == 'signup' && (
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({field}) => (
                            <TextField
                                error={Boolean(errors.email)}
                                helperText={errors?.email?.message}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Adresse email"
                                {...field}
                            />
                        )}
                    />)}
                <PasswordInput control={control} errors={errors} />
                {result.isError && (<Typography align="center" color={colors.red.A400}> {submitError} </Typography>)}
                <Box textAlign='center'>
                    <LoadingButton
                        loading={result.isLoading}
                        type="submit"
                        fullWidth={!result.isLoading}
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        {mode == 'login' ? 'Se connecter' : "S'inscrire"}
                    </LoadingButton>
                </Box>
                <Grid container sx={{textAlign: 'center'}}>
                    <Grid item xs={12} md={6} sx={{my: isMobile ? 1 : 0}}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            <Link to={Routes.rootForgotPassword} color="inherit">Mot de passe oublié ?</Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{my: isMobile ? 1 : 0}}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {mode == 'login'
                                ? <Link to={Routes.rootSignup} color="grey">{"Vous n'avez pas de compte ?"}</Link>
                                : <Link to={Routes.rootLogin} color="grey">{"Vous avez déjà un compte ?"}</Link>}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Copyright/>
        </Box>
    )
}
