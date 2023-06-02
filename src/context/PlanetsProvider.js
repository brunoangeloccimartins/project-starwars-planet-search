import React, { useState } from 'react';
import propTypes from 'prop-types';
import PlanetsContext from './planetsContext';

export default function PlanetsProvider({ children }) {
  const [planetFilter, setPlanetFilter] = useState([]);

  const callApi = async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    let { results } = await response.json();
    results = results.map((element) => {
      delete element.residents;
      return element;
    });
    setPlanetFilter(results);
  };

  const value = { planetFilter, callApi };

  return (
    <PlanetsContext.Provider value={ value }>{children}</PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: propTypes.node.isRequired,
};
