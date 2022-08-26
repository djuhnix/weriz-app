import React, {FC, useState} from "react";
import { boxStyles } from "./styles";
import {Box, colors, Container, Divider} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import * as z from "zod";
import { validations } from "../../services/formsValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForgotPasswordMutation, useResetPasswordMutation} from "../../store/auth/authApi";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import {useBaseStyles} from "../baseStyles";
import {Link, useNavigate, useParams} from "react-router-dom";
import {PasswordInput} from "../../components/input/PasswordInput";
import {statusInRange} from "../../services/utils";
import {ApiStatusCode} from "../../enum/api";
import {Routes} from "../../navigation/Routes";

interface Props {
    mode?: 'reset' | 'forgot'
}

export const ForgotPassword: FC<Props> = ({ mode= 'forgot' }) => {
    const [forgotPassword, forgotPasswordResult] = useForgotPasswordMutation();
    const [resetPassword, resetPasswordResult] = useResetPasswordMutation();
    const [submitError, setSubmitError] = useState('');
    const navigate = useNavigate();

    console.log('mode', mode);

    const result = mode == 'forgot' ? forgotPasswordResult : resetPasswordResult;

    const params = useParams();

    const defaultValues = {
        email: '',
        password: ''
    }

    const schema = z.object(mode == 'forgot' ? {email: validations.email} : {password: validations.password});

    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues,
        //resolver: zodResolver(schema)
    });

    const onSubmit = (data: any) => {
        console.log('data', data);
        if (mode == 'forgot') {
            forgotPassword({ email: data.email })
                .catch(error => {
                    setSubmitError("Une erreur est survenue veuillez réessayer plus tard.");
                });
        }
        else if (mode == 'reset' && params.token) {
            console.log('loc params', params);
            resetPassword({ password: data.password, token: params.token })
                .unwrap()
                .catch(error => {
                    setSubmitError("Une erreur est survenue veuillez réessayer plus tard.");
                });
        }
    }

    const { classes, cx } = useBaseStyles();

    return (
        <Box className={cx(classes.roundContainer)} sx={boxStyles.root}>
            {/* TODO Remove novalidate */}
            <Box component="form" noValidate={true} onSubmit={handleSubmit(onSubmit)} sx={{ m: 2 }}>
                <Typography variant="h4" sx={{ textAlign: 'center'}}>
                    {mode == 'forgot' ? 'Mot de passe oublié' : 'Réinitialisation de mot de passe'}
                </Typography>
                <Divider sx={{ mt: 2 }}/>
                <Container sx={{ py: 2 }}>
                    <Typography variant="caption" >
                        {mode == 'forgot'
                            ? 'Veuillez entrer votre adresse email pour recevoir un lien vous permettant de réinitialiser votre mot de passe.'
                            : 'Veuillez entrer votre nouveau mot de passe'}
                    </Typography>
                </Container>
                { mode == 'forgot' && (
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
                                label="Adresse email"
                                {...field}
                            />
                        )}
                    />)}
                { mode == 'reset' && (
                    <PasswordInput control={control} errors={errors} />
                )}
                {result.isError && (<Typography align="center" color={colors.red.A400}> {submitError} </Typography>)}
                <Box textAlign='center'>
                    {mode == 'reset' && resetPasswordResult.isSuccess && (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            <Link to={Routes.rootLogin} color="inherit">Se connecter</Link>
                        </Typography>
                    )}
                    <LoadingButton
                        loading={result.isLoading}
                        type="submit"
                        variant="contained"
                        color={result.isSuccess ? 'success' : 'primary'}
                        fullWidth={!result.isLoading}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {mode == 'forgot' && forgotPasswordResult.isSuccess && forgotPasswordResult.data?.data
                            ? 'Email de réinitialisation envoyé'
                            : mode == 'reset' && resetPasswordResult.isSuccess
                                ? 'Mot de passe réinitialisé'
                                : 'Réinitialiser mon mot de passe'}
                    </LoadingButton>

                </Box>
            </Box>

        </Box>
    );
}
