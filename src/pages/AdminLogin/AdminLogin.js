import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Grid, Box, Typography, Button, TextField, LinearProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
// import './styles.css':
import { useFormik } from 'formik';
import * as yup from 'yup'
import Logo from '../../assets/log.png'
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

const AdminLogin = () => {
  const [stateWarningPass, setStateWarningPass] = useState(false);
  const [stateWarningIncorrect, setStateWarningIncorrect] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const login = await axios.post("http://localhost:4000/sign/auth-admin", values);
        console.log(login);

        if (login.status === 200) {
          let verificationCode = await axios.post('http://localhost:4000/sign/verificationTwice', { phone: login.data.user.phone })
          history.push({
            pathname: "/sign-verification",
            state: {
              values: login.data.user,
              code: verificationCode.data.code,
              token: login.data.token,
              way: 3
            }
          })

        } else if (login.status === 206) {
          setStateWarningPass(true);
          setLoading(false)
          setTimeout(() => setStateWarningPass(false), 5000)
        } else if (login.status === 203) {
          setStateWarningIncorrect(true);
          setLoading(false);
          setTimeout(() => setStateWarningIncorrect(false), 5000)
        }
      } catch (error) {

      }
    }
  });
  return (
    <>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={12}>
          <Box paddingLeft={1} bgcolor="#2d2e4d" style={{ borderBottom: "1px solid gray" }}>
            <img src={Logo} width={50} />
          </Box>
        </Grid>


        <Grid item md={4} className="form-ver" alignItems="center">


          <Box marginY={6} marginX={2}>
            <Typography variant="h6" style={{ textAlign: "center", marginBottom: "10px" }} color="primary">Admin Login</Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                style={{ margin: "5px" }}
                value={formik.values.codeYes}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                variant="outlined"
                style={{ marginBottom: "10px" }}
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                style={{ margin: "5px" }}
                value={formik.values.codeYes}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                variant="outlined"
                style={{ marginBottom: "10px" }}
              />
              {stateWarningPass ? <Alert severity="warning" variant="outlined" onClose={() => (setStateWarningPass(false))}>Incorrect password. Try another password</Alert> : null}
              {stateWarningIncorrect ? <Alert severity="warning" variant="outlined" onClose={() => (setStateWarningIncorrect(false))}>No email found. Try another email</Alert> : null}

              <Button color="primary" variant="contained" fullWidth type="submit" style={{ marginBottom: "10px", marginTop: "10px" }}>
                Log in
              </Button>
              {loading ? <LinearProgress /> : null}
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default AdminLogin
