import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import s from "./Login.module.css"
import { Navigate } from "react-router-dom"
import {useAppDispatch} from "../../app/hooks/useAppDispatch";
import {useAppSelector} from "../../app/hooks/useAppSelector";
import {loginTC, setProgressLinear} from "../auth/model/authSlice";

type Inputs = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLogged)

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<Inputs>({ defaultValues: { email: "free@samuraijs.com", password: "free", rememberMe: false } })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(setProgressLinear({ progressLinear: 30 }))
        dispatch(loginTC(data))
            .then(()=> {
                dispatch(setProgressLinear({ progressLinear: 100 }))
                setTimeout(()=> {
                    dispatch(setProgressLinear({ progressLinear: 101 }))
                }, 1000)
            })
        reset()
    }

    if (isLoggedIn) {
        return <Navigate to={"/profile"} />
    }

    return (
        <Grid container justifyContent={"center"}>
            <Grid item justifyContent={"center"}>
                <FormControl>
                    <FormLabel>
                        <p>
                            Чтобы войти, зарегистрируйтесь
                            <a
                                href={"https://social-network.samuraijs.com/"}
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                <a style={{color: "blue"}}> здесь</a>
                            </a>
                        </p>
                        <p>или используйте общие учетные данные </p>
                        <p>тестового аккаунта:</p>
                        <p>
                            <b>Email:</b> free@samuraijs.com
                        </p>
                        <p>
                            <b>Password:</b> free
                        </p>
                    </FormLabel>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                value={"free@samuraijs.com"}
                                {...register("email", {
                                    pattern: {
                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Incorrect email address",
                                    },
                                })}
                            />
                            {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                value={"free@samuraijs.com"}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 3,
                                        message: "Password must be at least 3 characters long",
                                    },
                                })}
                            />
                            {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}
                            <FormControlLabel
                                label={"Remember me"}
                                control={
                                    <Controller
                                        name={"rememberMe"}
                                        control={control}
                                        render={({ field: { value, ...field } }) => <Checkbox {...field} checked={value} />}
                                    />
                                }
                                {...register("rememberMe")}
                            />
                            <Button type={"submit"} variant={"contained"} color={"primary"}>
                                Login
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
            </Grid>
        </Grid>
    )
}
