import React, { useEffect } from 'react';
import { oauth2 as SMART } from 'fhirclient';

import Loader from '../Loader/Loader';

import './Launch.scss';

const Launch = () => {

  useEffect(() => {
    SMART.authorize({
      clientId: process.env.REACT_APP_CLIENT_ID,
      scope: "launch openid profile user/Patient.read user/Observation.read",
      redirectUri: "./",
    });
  }, [])

  return (
    <Loader />
  );
};

export default Launch;