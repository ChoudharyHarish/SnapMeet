import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { signUp, signIn, googleLogin } from "../redux/authSlice";

// import useStyles from './styles';;

import { jwtDecode } from "jwt-decode";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Input = ({
  name,
  handleChange,
  label,
  half,
  autoFocus,
  type,
  handleShowPassword,
}) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
      name={name}
      onChange={handleChange}
      variant="outlined"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      InputProps={
        name === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === "password" ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : null
      }
    />
  </Grid>
);

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      const { payload } = await dispatch(
        signUp({ ...form, name: form.firstName + form.lastName })
      );
      if (payload.status === 200) navigate("/inbox");
    } else {
      const { payload } = await dispatch(
        signIn({ ...form, name: form.firstName + form.lastName })
      );
      if (payload.status === 200) navigate("/inbox");
    }
  };

  const googleSuccess = async (res) => {
    const token = res?.credential;
    const result = jwtDecode(token);
    try {
      dispatch(googleLogin({ result, token }));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container
      className="h-screen items-center mt-4"
      component="main"
      maxWidth="xs"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Paper
        className="flex flex-col justify-center items-center p-8"
        elevation={6}
      >
        <Avatar className="my-2" style={{ backgroundColor: "#6c7ae0" }}>
          <LockOutlinedIcon className="" />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className="mt-4" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="mt-4"
            style={{ backgroundColor: "#6c7ae0" }}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <div className="my-4 flex justify-center">
            <GoogleLogin
              width={"100%"}
              onSuccess={(credentialResponse) => {
                googleSuccess(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
                alert("Something went wrong try again!!");
              }}
            />
          </div>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode} style={{ color: "#6c7ae0" }}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
