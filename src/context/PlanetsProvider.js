import React, { useState } from 'react';
import propTypes from 'prop-types';
import PlanetsContext from './planetsContext';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const callApi = async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    const { results } = await response.json();
    results.forEach((element) => {
      delete element.residents;
    });
    setPlanets(results);
  };

  callApi();
  const value = { planets, setPlanets, callApi };

  return (
    <PlanetsContext.Provider value={ value }>{children}</PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: propTypes.node.isRequired,
};
