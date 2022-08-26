import {Control, Controller, FieldErrors, FieldValues} from "react-hook-form";
import React, {FC, useState} from "react";
import {FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

interface Props {
    control: Control<any>,
    errors: FieldErrors
}

export const PasswordInput: FC<Props> = ({control, errors}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
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
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
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
    );
}
