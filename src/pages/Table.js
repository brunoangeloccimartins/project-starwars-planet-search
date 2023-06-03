import { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/planetsContext';

function Table() {
  const { planetFilter, callApi } = useContext(PlanetsContext);
  const header = planetFilter[0];

  const [inputValue, setInputValue] = useState({});
  const [filteredPlanets, setFilteredPlanets] = useState(planetFilter);

  const handleChange = (e) => {
    const { value, name } = e.target;

    setInputValue((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFilter = () => {
    const input = inputValue['name-filter'];
    const filteredData = planetFilter.filter((item) => !(input
      && input.length !== 0
      && !item.name.toLowerCase().includes(input.toLowerCase())));
    setFilteredPlanets(filteredData);
  };

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (inputValue['name-filter']?.length !== 0) {
      handleFilter();
    }
  }, [inputValue]);

  if (header === undefined) {
    return <p>Loading</p>;
  }

  const { 'name-filter': nameFilter = '' } = inputValue;

  return (
    <main>
      <input
        key="name-input"
        type="text"
        name="name-filter"
        data-testid="name-filter"
        value={ nameFilter }
        onChange={ handleChange }
      />
      <table>
        <thead>
          <tr>
            {Object.keys(header).map((element) => (
              <th key={ element }>{element.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(nameFilter === '' || nameFilter === undefined)
            ? planetFilter.map((planet) => (
              <tr key={ planet.name }>
                {Object.values(planet).map((value) => (
                  <td key={ value }>{value}</td>
                ))}
              </tr>
            ))
            : filteredPlanets.map((planet) => (
              <tr key={ planet.name }>
                {Object.values(planet).map((value) => (
                  <td key={ value }>{value}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}

export default Table;
