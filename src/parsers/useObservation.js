import useResource from '../hooks/useResource';
import { useState, useEffect } from 'react';

const LOINC_SYSTEM = 'http://loinc.org';
const LOINC_HEIGHT = ['91370-7'];
const LOINC_WEIGHT = ['29463-7', '79348-9'];

const useObservation = (client, params = {}) => {
  params.patient = client.patient.id;

  const queryStringArray = Object.keys(params).map(key => `${key}=${params[key]}`);
  const queryString = queryStringArray.length > 0 ? `?${queryStringArray.join('&')}` : '';
  const { resource, loading } = useResource(client, `Observation${queryString}`);
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();

  useEffect(() => {
    if (!resource) {
      return
    }

    const observations = resource.entry ? resource.entry.map(({resource}) => resource) : [];
  
    observations.forEach((observation) => {
      if (observation.code.coding) {
        observation.code.coding.forEach((coding) => {
          if (coding.system === LOINC_SYSTEM) {
            if (LOINC_HEIGHT.indexOf(coding.code) >= 0) {
              setHeight(observation.valueQuantity)
            }

            if (LOINC_WEIGHT.indexOf(coding.code) >= 0) {
              setWeight(observation.valueQuantity)
            }
          }
        });
      }
    });
  }, [resource]);

  return {
    resource,
    height,
    weight,
    loading,
  };
};

export default useObservation;