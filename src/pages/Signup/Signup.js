import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
//validacion de formularios
import { useFormik } from 'formik';
import * as yup from 'yup';
//Importacion de componentes de material ui
import { Button, TextField, FormControlLabel, Typography, Box, Switch, LinearProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
//importacion de captcha
import ReCAPTCHA from 'react-google-recaptcha';
//importacion de axios
import axios from 'axios';

//esquema de validacion con yup
const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  username: yup.string("Enter your username").required("Username is Required"),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  repeatPassword: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Repeat password is required'),
  phone: yup.number('Enter a phone number').required('Phone number is required')
});

//componente principal
const Signup = (props) => {
  const [stateWarningCaptcha, setStateWarningCaptcha] = useState(false);
  const [stateWarningUser, setStateWarningUser] = useState(false);
  const [stateLoading, setStateLoading] = useState(false);
  const history = useHistory();
  const captcha = useRef(null);

  //uso de formik: valores iniciales, esquema de validacion, y acciones
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      repeatPassword: '',
      phone: '',
      twoSteps: false

    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      try {
        if (captcha.current.getValue() && formik.values) {
          let verifyUser = await axios.post('https://mov-review-api.herokuapp.com/sign/verifyIfUserExists', { email: values.email });
          if (verifyUser.status === 200) {
            setStateLoading(true);
            if (values.twoSteps) {
              let verificationCode = await axios.post('https://mov-review-api.herokuapp.com/sign/verificationTwice', { phone: values.phone })
              history.push({
                pathname: '/sign-verification',
                state: {
                  values,
                  code: verificationCode.data.code,
                  way: 1
                },
              });
            }else{
              let addUser = await axios.post('https://mov-review-api.herokuapp.com/sign/signup', { values });
              if(addUser.status === 200){
                history.push({
                  pathname: '/user-home',
                  state: {
                    token: addUser.data.token
                  },
                });
                localStorage.setItem("accessToken", addUser.data.token);
              }
            }
          } else {
            setStateWarningUser(true)
            setTimeout(() => {
              setStateWarningUser(false);
            }, 5000)
          }
        } else {
          setStateWarningCaptcha(true);
          setTimeout(() => {
            setStateWarningCaptcha(false);
          }, 5000)
        }
      } catch (error) {
        console.log(error);
      }


    }
  });

  //renderizado del componente
  return (

    <Box display="flex" flexDirection="column" paddingX={1.5} justifyContent="center" style={{ width: "100%", height: "100%" }}>

      <form onSubmit={formik.handleSubmit}>
        <Box>
          <Typography variant="h5" color="primary" align="Center">Sign Up</Typography>

        </Box>
        <Box display="flex">
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            marginX={1}
            style={{ margin: "5px" }}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            type="text"
            style={{ margin: "5px" }}
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

        </Box>
        <Box display="flex">
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

          <TextField
            fullWidth
            id="repeatPassword"
            name="repeatPassword"
            label="Repeat Password"
            type="password"
            style={{ margin: "5px" }}
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
            error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
            helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
          />

        </Box>

        <Box>
          <TextField
            fullWidth
            id="phone"
            name="phone"
            label="Phone number"
            type="text"
            style={{ marginBottom: "5px" }}
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />

        </Box>
        <Box display="flex" justifyContent="center" >
          <FormControlLabel
            control={<Switch name="twoSteps" style={{ marginBottom: "5px" }} onChange={formik.handleChange} value={formik.values.twoSteps} value color="primary" />}
            label="Turn on two-step verification"
          />

        </Box>
        <Box display="flex" justifyContent="center">
          <ReCAPTCHA
            ref={captcha}
            style={{ marginBottom: "5px" }}
            sitekey="6LccqDUbAAAAAIKK1KwYlATRJBeE55-mJ7dOj9th"
          />
        </Box>
        <Box style={{ marginBottom: "5px" }}>
          {stateWarningCaptcha ? <Alert severity="warning" variant="outlined" onClose={() => (setStateWarningCaptcha(false))}>Please complete the recaptcha</Alert> : null}
          {stateWarningUser ? <Alert severity="warning" onClose={() => (setStateWarningCaptcha(false))}>This email is already registered</Alert> : null}
        </Box>

        <Box marginBottom={1.5}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Sign in
          </Button>


        </Box>

        {stateLoading ? <LinearProgress /> : null}
      </form>

    </Box>

  );
}

//exportacion del componente
export default Signup;
