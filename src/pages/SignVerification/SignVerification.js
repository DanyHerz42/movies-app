import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Grid, Box, Button, TextField, Typography, Link } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Logo from '../../assets/log.png';
import './styles.css'
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { number } from 'yup/lib/locale';


const validationSchema = yup.object({
  codeYes: yup.number('Enter a phone number').required('Phone number is required')
});

const SignVerification = () => {
  const location = useLocation();
  const history = useHistory()
  // console.log(location.state);
  const [stateWarnings, setStateWarnigs] = useState(0)

  const formik = useFormik({
    initialValues: {
      codeYes: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {

        if (typeof (location.state.values.phone) === number) {
          location.state.values.phone = "+" + location.state.values.phone;
        }
        let senddCode = await axios.post('http://localhost:4000/sign/verifyCode', { phone: location.state.values.phone, code: values.codeYes });

        if (senddCode.data.message === 2) {

          if (location.state.way === 1) {
            let getToken = await axios.post('http://localhost:4000/sign/signup', { values: location.state.values })
            history.push({
              pathname: "/user-home",
              state: {
                token: getToken.data.token
              }
            });
            localStorage.setItem("accessToken", getToken.data.token);
          }else{
            history.push({
              pathname: "/user-home",
              state: {
                token: location.state.token
              }
            });
          }


        } else if (senddCode.data.message === 1) {
          setStateWarnigs(senddCode.data.message)
        } else if (senddCode.data.message === 3) {

          setTimeout(() => {
            setStateWarnigs(senddCode.data.message)
          }, 3000)

        }


      } catch (error) {
        console.log(error);
      }


    },
  });

  const resend = async (event) => {
    event.preventDefault();
    setStateWarnigs(0);
    formik.resetForm()
    try {
      let verificationCode = await axios.post('http://localhost:4000/sign/verificationTwice', { phone: location.state.values.phone })
    } catch (error) {
      console.log(error);
    }

  };


  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={12} className="border">
          <Box paddingLeft={1} bgcolor="#2d2e4d" >
            <img src={Logo} width={50} />
          </Box>
        </Grid>

        <Grid item md={4} className="form-ver" alignItems="center">


          <Box marginY={6} marginX={2}>
            <Typography variant="h6" style={{ textAlign: "center", marginBottom: "10px" }} color="primary">We have sent a verification code of 6 digits to {location.state.values.phone}</Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="codeYes"
                name="codeYes"
                label="Enter the verification code"
                value={formik.values.codeYes}
                onChange={formik.handleChange}
                error={formik.touched.codeYes && Boolean(formik.errors.codeYes)}
                helperText={formik.touched.codeYes && formik.errors.codeYes}
                variant="outlined"
                style={{ marginBottom: "10px" }}
              />
              {stateWarnings === 1 ? <Alert style={{ marginBottom: "10px" }} severity="warning">This code have expired</Alert> : null}
              {stateWarnings === 3 ? <Alert style={{ marginBottom: "10px" }} severity="error">This code is invalid</Alert> : null}

              <Button color="primary" variant="contained" disabled={stateWarnings === 1 ? true : false} fullWidth type="submit" style={{ marginBottom: "10px" }}>
                Verify
              </Button>

              {stateWarnings === 1 ? <Link href="#" onClick={resend} text variant="body2"> Resend verification code</Link> : null}

            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default SignVerification

