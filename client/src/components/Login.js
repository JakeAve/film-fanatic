import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

export default function Login(props) {
  const { onLoginChange } = props;
  const [userName, setUserName] = useState();

  function onSuccess(object) {
    setUserName(object.profileObj.givenName);
    onLoginChange(object.profileObj);
  }

  function onFailure() {
    window.alert(`Login Failed. You must be logged in to rate or add comments`);
  }

  function logout() {
    setUserName(null);
    onLoginChange(false);
  }

  if (userName)
    return (
      <GoogleLogout
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        buttonText={'Logout as ' + userName}
        onLogoutSuccess={logout}
      ></GoogleLogout>
    );
  else
    return (
      <GoogleLogin
        buttonText="Login With Google"
        clientId="118171773883-7jblg258b3qb3u5okf2pcq344fm422p9.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
        isSignedIn={true}
      />
    );
}
