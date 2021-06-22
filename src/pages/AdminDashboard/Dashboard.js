import React, { useState } from 'react';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import { Grid, Box, Typography, Button, TextField, LinearProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
// import './styles.css':
import { useFormik } from 'formik';
import * as yup from 'yup'
import Logo from '../../assets/log.png'
import axios from 'axios';
import FormAdd from './FormAdd';


const Dashboard = () => {
  const location = useLocation();

  if (!location.state) {
    return (
      <Redirect to="/admin-login" />
    )
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        <Box paddingLeft={1} display="flex" alignItems="center" bgcolor="#2d2e4d" style={{ borderBottom: "1px solid gray" }}>
          <img src={Logo} width={50} style={{ paddingRight: "12px" }} />
          <Typography variant="h6" style={{ color: "white" }}>Movies Administrator</Typography>
        </Box>
      </Grid>
      
      <FormAdd token={location.state.token}/>
        


    </Grid>
  )
}

export default Dashboard;