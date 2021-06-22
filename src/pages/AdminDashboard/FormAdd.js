import React, { useState } from 'react';
import { Redirect, useHistory} from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { LinearProgress, Box, Grid, Divider } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Tabla from './Tabla';

const validationSchema = yup.object({
  name: yup
    .string('Enter your a name')
    .required('This field is required'),
  sinopsis: yup
    .string('Enter your a sinopsis')
    .required('This field is required'),
  producedBy: yup
    .string("Enter a text")
    .required("This field is required"),
  imageURL: yup
    .string("Enter a image URL")
    .required("This field is required"),
});

const FormAdd = (props) => {
  const [progress, setProgress] = useState(false);
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: "",
      sinopsis: "",
      producedBy: "",
      imageURL: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setProgress(true)
        const requestConfig = {
          headers: {
            "x-access-token": props.token
          }
        }
        const addMovie = await axios.post('https://mov-review-api.herokuapp.com/movies/create-movie', values, requestConfig)
        formik.handleReset()
        setProgress(false);
        setSuccess(true);
        window.location.reload()
        setTimeout(() => {
          setSuccess(false)
        }, 4000);
      } catch (error) {
        console.error(error);
      }
    },
  });

  const logout = () => {
    return(
      history.push("/admin-login")
    )
  }

  return (
    <>
      <Grid item sm={12} md={12} lg={3}>
        <Box padding={2}>
          <form onSubmit={formik.handleSubmit}>
            <Typography variant="h6" color="initial" style={{ textAlign: "center" }}>Add movie</Typography>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              variant="outlined"
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              id="sinopsis"
              name="sinopsis"
              label="sinopsis"
              value={formik.values.sinopsis}
              onChange={formik.handleChange}
              error={formik.touched.sinopsis && Boolean(formik.errors.sinopsis)}
              helperText={formik.touched.sinopsis && formik.errors.sinopsis}
              variant="outlined"
              multiline
              rows={4}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              id="producedBy"
              name="producedBy"
              label="Produced By"
              value={formik.values.producedBy}
              onChange={formik.handleChange}
              error={formik.touched.producedBy && Boolean(formik.errors.producedBy)}
              helperText={formik.touched.producedBy && formik.errors.producedBy}
              variant="outlined"
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              id="imageURL"
              name="imageURL"
              label="imageURL"
              value={formik.values.imageURL}
              onChange={formik.handleChange}
              error={formik.touched.imageURL && Boolean(formik.errors.imageURL)}
              helperText={formik.touched.imageURL && formik.errors.imageURL}
              variant="outlined"
              style={{ marginBottom: "10px" }}
            />

            {success ? <Alert severity="success" style={{ marginBottom: "10px" }}>movie added successfully!</Alert> : null}

            <Button color="primary" variant="contained" fullWidth type="submit" style={{ marginBottom: "10px" }}>
              add
            </Button>
            {progress ? <LinearProgress /> : null}
          </form>
          <Divider />
          <Button color="secondary" variant="contained" fullWidth type="submit" style={{ marginBottom: "10px", marginTop: "10px"}} onClick={logout}>
            log out
          </Button>
        </Box>
      </Grid>
      <Grid item sm={12} md={12} lg={9}>
        <Tabla token={props.token} />

      </Grid>
    </>
  );
};

export default FormAdd;