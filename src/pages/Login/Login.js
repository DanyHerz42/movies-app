import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Box, FormControlLabel, Switch, Typography, LinearProgress } from '@material-ui/core/';
import { Alert } from '@material-ui/lab';
import axios from 'axios';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Login = () => {
  const history = useHistory();
  document.title = "Login - Movies";

  const [stateWarningPass, setStateWarningPass] = useState(false);
  const [stateWarningIncorrect, setStateWarningIncorrect] = useState(false);
  const [loading, setLoading] = useState(false);

  if (localStorage.getItem("accessToken")) {
    history.push("/user-home");
  }


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      keepLogged: false
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const login = await axios.post("http://localhost:4000/sign/login", values);
        if (login.status === 200) {
          if (login.data.user.twoSteps) {
            let verificationCode = await axios.post('http://localhost:4000/sign/verificationTwice', { phone: login.data.user.phone })
            history.push({
              pathname: '/sign-verification',
              state: {
                values: login.data.user,
                code: verificationCode.data.code,
                token: login.data.token,
                keepLogged: values.keepLogged,
                way: 2
              },
            });
            setLoading(false);
          } else {
            if (values.keepLogged) {
              localStorage.setItem("accessToken", login.data.token)
            }
            values.keepLogged ? localStorage.setItem("accessToken", login.data.token) : localStorage.removeItem("accessToken");
            history.push({
              pathname: '/user-home',
              state: {
                token: login.data.token
              },
            });
            setLoading(false)
          }
          setLoading(false)
        } else if (login.status === 203) {
          setStateWarningIncorrect(true);
          setLoading(false);
          setTimeout(() => setStateWarningIncorrect(false), 5000)

        } else if (login.status === 206) {
          setStateWarningPass(true);
          setLoading(false)
          setTimeout(() => setStateWarningPass(false), 5000)
        }
      } catch (error) {

        console.error(error);
      }

    },
  });

  return (
    <Box display="flex" flexDirection="column" paddingX={1.5} justifyContent="center" style={{ width: "100%", height: "100%" }}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h5" color="primary" align="center" style={{ margin: "5px" }}>Login</Typography>
        <Box display="flex" justifyContent="center">
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            style={{ margin: "5px" }}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

        </Box>

        <Box display="flex" justifyContent="center" >
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            style={{ margin: "5px" }}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

        </Box>
        <Box display="flex" justifyContent="center" >
          <FormControlLabel
            control={<Switch name="keepLogged" style={{ marginBottom: "5px" }} onChange={formik.handleChange} value={formik.values.keepLogged} value color="primary" />}
            label="Keep logged in"
          />
        </Box>
        <Box style={{ marginBottom: "5px" }}>
          {stateWarningPass ? <Alert severity="warning" variant="outlined" onClose={() => (setStateWarningPass(false))}>Incorrect password. Try another password</Alert> : null}
          {stateWarningIncorrect ? <Alert severity="warning" variant="outlined" onClose={() => (setStateWarningIncorrect(false))}>No email found. Try another email</Alert> : null}
        </Box>

        <Box marginBottom={1.5}>
          <Button color="primary" variant="contained" fullWidth type="submit" style={{ margin: "5px" }}>
            Log In
          </Button>

        </Box>

        {loading ? <LinearProgress /> : null}
      </form>
    </Box>
  );
}

export default Login;
