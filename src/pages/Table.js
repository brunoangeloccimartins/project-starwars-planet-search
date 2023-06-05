import { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/planetsContext';

function Table() {
  const { planetFilter, callApi } = useContext(PlanetsContext);
  const header = planetFilter[0];

  const [inputValue, setInputValue] = useState({});
  const [filteredData, setFilteredData] = useState(planetFilter);
  const [columnSelect, setColumnSelect] = useState('population');
  const [comparisonSelect, setComparisonSelect] = useState('maior que');
  const [numberInput, setNumberInput] = useState('0');

  const column = ['population',
    'orbital_period', 'surface_water',
    'diameter', 'rotation_period'];
  const comparison = ['maior que', 'menor que', 'igual a'];

  const handleChange = (e) => {
    const { value, name } = e.target;

    setInputValue((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFilter = () => {
    const input = inputValue['name-filter'];
    const filteredPlanets = planetFilter.filter(
      (item) => !(input && input.length !== 0
        && !item.name.toLowerCase().includes(input.toLowerCase())),
    );
    setFilteredData(filteredPlanets);
  };

  const handleClick = () => {
    const selectedColumn = columnSelect;
    const selectedComparison = comparisonSelect;
    const selectedNumber = Number(numberInput);

    const filtered = planetFilter.filter((planet) => {
      const columnValue = Number(planet[selectedColumn]);

      if (selectedComparison === 'maior que') {
        return columnValue > selectedNumber;
      } if (selectedComparison === 'menor que') {
        return columnValue < selectedNumber;
      } if (selectedComparison === 'igual a') {
        return columnValue === selectedNumber;
      }
      return true;
    });

    setFilteredData(filtered);
  };

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (inputValue['name-filter']?.length !== 0) {
      handleFilter();
    } else {
      setFilteredData(planetFilter);
    }
  }, [inputValue, planetFilter]);

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
      <select
        data-testid="column-filter"
        onChange={ (e) => setColumnSelect(e.target.value) }
      >
        {column.map((element) => (
          <option key={ element } value={ element }>
            {element}
          </option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ (e) => setComparisonSelect(e.target.value) }
      >
        {comparison.map((element) => (
          <option key={ element } value={ element }>
            {element}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={ numberInput }
        onChange={ (e) => setNumberInput(e.target.value) }
        data-testid="value-filter"
      />
      <button onClick={ handleClick } data-testid="button-filter">
        Filtrar
      </button>
      <table>
        <thead>
          <tr>
            {Object.keys(header).map((element) => (
              <th key={ element }>{element.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((planet) => (
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
