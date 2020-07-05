import React, { useContext, useEffect, useState } from 'react';
import convert from 'convert-units';
import clsx from 'clsx';

import Loader from '../Loader/Loader';

import { FhirContext } from '../../context/FhirContext';

import useObservation from '../../parsers/useObservation';

import './Main.scss';

const DEFAULT_HEIGHT = 68;
const DEFAULT_WEIGHT = 175;
const UNITS = ['Imperial', 'Metric'];

const Main = () => {
  const fhir = useContext(FhirContext);
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState(DEFAULT_WEIGHT);
  const [selectedUnit, setSelectedUnit] = useState(UNITS[0]);

  const { 
    loading: observationLoading,
    height: heightFhir,
    weight: weightFhir
  } = useObservation(fhir);

  useEffect(() => {
    setHeight(heightFhir ? heightFhir.value : DEFAULT_HEIGHT);
    setWeight(weightFhir ? weightFhir.value : DEFAULT_WEIGHT);
  }, [heightFhir, weightFhir]);

  const handleChangeHeight = (event) => {
    setHeight(+event.target.value);
  }

  const handleChangeWeight = (event) => {
    setWeight(+event.target.value);
  }


  const defaultUnits = selectedUnit === UNITS[0] ? ['lb', 'in'] : ['kg', 'm'];

  const handleUnitChange = (event) => {
    const value = event.target.value;
    const targetUnits = value === UNITS[0] ? ['lb', 'in'] : ['kg', 'm'];

    console.log(defaultUnits, targetUnits);

    const newWeight = convert(weight).from(defaultUnits[0]).to(targetUnits[0]);
    const newHeight = convert(height).from(defaultUnits[1]).to(targetUnits[1]);

    console.log(newWeight, newHeight);
    
    setWeight(newWeight.toFixed(2));
    setHeight(newHeight.toFixed(2));

    setSelectedUnit(value);
  }

  const bmiMultiplier = selectedUnit === UNITS[0] ? 703 : 1;
  const bmi = (bmiMultiplier * weight / (height ** 2)).toFixed(1);

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
              <span className='label'>{`${weightFhir ? weightFhir.unit : defaultUnits[0]}${weight !== 1 ? 's' : ''}`}</span>
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
              <span className='label'>{`${heightFhir ? heightFhir.unit : defaultUnits[1]}${height !== 1 ? 's' : ''}`}</span>
            </>
          }
        </div>
        <div className='input-wrapper'>
          {
            UNITS.map((unit) => (
              <div className='radio-button' key={unit}>
                <label>
                  <input
                    type='radio'
                    name='unit-selection'
                    checked={selectedUnit === unit}
                    onChange={handleUnitChange}
                    value={unit}
                  />
                  {unit}
                </label>
              </div>
            ))
          }
        </div>
      </form>
      
    </div>
  );
};

export default Main;