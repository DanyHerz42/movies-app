import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

const UserHome = () => {
  const location = useLocation();
  // window.history.forward()
  if (!localStorage.getItem("accessToken") && !location.state.token) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <div>
      <h1>User home {localStorage.getItem("accessToken") || location.state.token}</h1>
    </div>
  )
}

export default UserHome
