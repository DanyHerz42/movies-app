import React, { useState } from 'react';
import { Grid, Box, Typography, Button } from '@material-ui/core'
import './styles.css'
import Logo from '../../assets/log.png'
import Signup from '../Login'
import Signin from '../Signup'


const LandingPage = () => {

  const [state1, setState1] = useState(false);

  return (
    <div>
      <Grid container justify="flex-end">
        <Grid item xs={10}sm={10} md={10}>
          <Box paddingLeft={1} bgcolor="#2d2e4d" style={{ borderBottom: "1px solid gray" }}>
            <img src={Logo} width={50} />
          </Box>
        </Grid>
        <Grid item xs={2} sm={2} md={2} style={{ backgroundColor: "#2d2e4d"}}>
          <Box display="flex" flexDirection="row-reverse" justifyContent="space-around" paddingTop={1}>
            <Button variant="outlined" color="secondary" onClick={() => setState1(true)}>
              Sign Up
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setState1(false)}>
              Log In
            </Button>
          </Box>
        </Grid>
        <Grid item sm={12} md={8} className="root">
          <Box
            bgcolor="#2d2e4d"
            height="100%"
            className="div-left"
            display="flex"
            color="white"
            alignItems="center"
            // flexDirection="column"
          >
            <img src={Logo} width={200} height={200} />
            <Box className="div-headers">
              <Typography variant="h2" color="#fff">MovReview</Typography>
              <Typography variant="h5" color="#fff">Todas las peliculas son buenas o ¿No tanto?</Typography>
              
            </Box>
          </Box>
        </Grid>
        <Grid item sm={12} md={4} className="root">
          <Box bgColor="#2d2e4d"  display="flex" style={{height: "99%"}}>
            {state1 ? <Signin /> : <Signup />}
          </Box>
        </Grid>
      </Grid>
      
    </div>
  )
}

export default LandingPage
