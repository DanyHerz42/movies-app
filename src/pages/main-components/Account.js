import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { Divider, Avatar, Box, Button} from '@material-ui/core';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(10),
    height: theme.spacing(10),

  },
  primaryColor: {
    backgroundColor: theme.palette.primary.main
  }
}));

const Account = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [user, setUser] = useState({})
  useEffect(async () => {
    const requestConfig = {
      headers: {
        "x-access-token": props.token
      }
    }
    const userRequest = await axios.get("https://mov-review-api.herokuapp.com/users/get-user-data", requestConfig);
    setUser(userRequest.data)
  }, [])

  const logOut = () => {
    localStorage.removeItem("accessToken");
    history.push("/")
  }
  return (
    <div>
      <Typography variant="h4" color="initial">Account details</Typography>
      <Divider inset />
      <Box display="flex" justifyContent="center" >
        <Box flexDirection="column" display="flex" alignItems="center" width={300}>
          <Avatar className={[classes.small, classes.primaryColor,]}></Avatar>
          <br></br>
          <Typography variant="p" color="initial"><span style={{ fontWeight: "bold" }}>Username: </span>{user.username}</Typography>
          <br></br>
          <Typography variant="p" color="initial"><span style={{ fontWeight: "bold" }}>Email: </span>{user.email}</Typography>
          <br></br>
          <Typography variant="p" color="initial"><span style={{ fontWeight: "bold" }}>Phone: </span>+{user.phone}</Typography>
          <br></br>
          <Button variant="contained" color="secondary" fullWidth onClick={logOut}>
            Log out
          </Button>
        </Box>
      </Box>
    </div>
  )
}

export default Account;
