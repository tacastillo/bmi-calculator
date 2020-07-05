import React, { useContext, useEffect, useState } from 'react';
// import { useForm } from "react-hook-form";

import Loader from '../Loader/Loader';

import { FhirContext } from '../../context/FhirContext';
import { StoreContext } from '../../context/storeContext';

import usePatient from '../../parsers/usePatient';

import './Main.scss';
import useObservation from '../../parsers/useObservation';

const Main = () => {
  const fhir = useContext(FhirContext);
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();

  const {
    loading: patientLoading,
    lastName,
    firstName
  } = usePatient(fhir);

  const { 
    loading: observationLoading,
    height: heightFhir,
    weight: weightFhir
  } = useObservation(fhir);

  useEffect(() => {
    setHeight(heightFhir?.value);
    setWeight(weightFhir?.value);
  }, [heightFhir, weightFhir]);

  console.log(height, weight);

  return (
    <div className='main'>
      { patientLoading ? <Loader /> : <h1>{`${lastName}, ${firstName}`}</h1>}
      <form className='form-wrapper'>
        <div className='input-wrapper'>
          { !weight ? <Loader /> : <input type='number' value={weight}/> }
        </div>
        <div className='input-wrapper'>
          { !height ? <Loader /> : <input type='number' value={height}/> }
        </div>
      </form>
    </div>
  );
};

export default Main;