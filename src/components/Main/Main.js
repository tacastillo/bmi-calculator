import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';

import Loader from '../Loader/Loader';

import { FhirContext } from '../../context/FhirContext';

import usePatient from '../../parsers/usePatient';
import useObservation from '../../parsers/useObservation';

import './Main.scss';

const DEFAULT_HEIGHT = 68;
const DEFAULT_WEIGHT = 175

const Main = () => {
  const fhir = useContext(FhirContext);
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState(DEFAULT_WEIGHT);

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
    setHeight(heightFhir ? heightFhir.value : DEFAULT_HEIGHT);
    setWeight(weightFhir ? weightFhir.value : DEFAULT_WEIGHT);
  }, [heightFhir, weightFhir]);

  const handleChangeHeight = (element) => {
    setHeight(+element.target.value);
  }

  const handleChangeWeight = (element) => {
    setWeight(+element.target.value);
  }

  const bmi = (703 * weight / (height ** 2)).toFixed(1);

  let status = 'obese';

  if (bmi < 18.5) {
    status = 'underweight';
  } else if (bmi < 25) {
    status = 'healthy';
  } else if (bmi < 30) {
    status = 'overweight'
  }

  return (
    <div className={clsx('main', status)}>
      <div className="output-wrapper">
        { observationLoading ? <Loader /> :
          <span className='output'>{bmi}</span>
        }
      </div>
      <form className='form-wrapper'>
        <div className='input-wrapper'>
          <span className='label'>{'Weight'}</span>
          { observationLoading ? <Loader /> :
            <>
              <input
                className='number-input'
                type='number'
                value={weight || 0}
                onChange={handleChangeWeight}
              />
              <span className='label'>{`${weightFhir ? weightFhir.unit : 'lb'}${weight !== 1 ? 's' : ''}`}</span>
            </>
          }
        </div>
        <div className='input-wrapper'>
          <span className='label'>{'Height'}</span>
          { observationLoading ? <Loader /> :
            <>
              <input
                className='number-input'
                type='number'
                value={height || 0}
                onChange={handleChangeHeight}
              />
              <span className='label'>{`${heightFhir ? heightFhir.unit : 'in'}${height !== 1 ? 's' : ''}`}</span>
            </>
          }
        </div>
      </form>
      
    </div>
  );
};

export default Main;