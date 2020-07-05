import React, { createContext, useState, useEffect } from 'react';
import { oauth2 as SMART } from 'fhirclient';
import Loader from '../components/Loader/Loader';

export const FhirContext = createContext();

export const FhirProvider = ({ children }) => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    SMART.ready((client) => {
      setClient(client);
    })
  }, [])

  return (
    <FhirContext.Provider value={client}>
      {client ? children : <Loader />}
    </FhirContext.Provider>
  )
}