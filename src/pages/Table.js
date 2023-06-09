import { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/planetsContext';
import './table.css';

function Table() {
  const { planets } = useContext(PlanetsContext);

  const [inputValue, setInputValue] = useState('');
  const [columnSelect, setColumnSelect] = useState('population');
  const [comparisonSelect, setComparisonSelect] = useState('maior que');
  const [numberInput, setNumberInput] = useState('0');
  const [filters, setFilters] = useState([]);

  const column = ['population',
    'orbital_period', 'surface_water',
    'diameter', 'rotation_period'];
  const comparison = ['maior que', 'menor que', 'igual a'];

  const handleClick = () => {
    const filterObject = {
      selectedColumn: columnSelect,
      selectedComparison: comparisonSelect,
      selectedNumber: numberInput,
    };

    setFilters([...filters, filterObject]);
  };

  useEffect(() => {}, []);

  return (
    <main>
      <div className="container">
        <h1>Star Wars Planet Filter</h1>
        <div className="main-input">
          <input
            key="name-input"
            type="text"
            name="inputValue"
            data-testid="name-filter"
            value={ inputValue }
            onChange={ (e) => setInputValue(e.target.value) }
          />
        </div>
        <div className="select-column">
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
        </div>
        <div className="select-comparison">
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
        </div>
        <div className="seconde-input">
          <input
            type="number"
            value={ numberInput }
            onChange={ (e) => setNumberInput(e.target.value) }
            data-testid="value-filter"
          />
        </div>
        <div className="button-container">
          <button onClick={ handleClick } data-testid="button-filter">
            Filtrar
          </button>
        </div>
        {filters && (
          <div>
            {filters.map((filter) => (
              <p key={ filter.selectedColumn }>
                {`Selected Column: ${filter.selectedColumn},
                 Selected Comparison: ${filter.selectedComparison},
                  Selected Number: ${filter.selectedNumber}`}
              </p>
            ))}

          </div>
        )}
        { planets.length
          ? (
            <table>
              <thead>
                <tr>
                  {planets.length > 0 && Object.keys(planets[0]).map((element) => (
                    <th key={ element }>{element}</th>
                  ))}
                </tr>
              </thead>
              <tbody
                className="table-body"
              >
                {planets.length > 0
                 && planets.filter((planet) => planet.name.toLowerCase()
                   .includes(inputValue.toLowerCase()))
                   .filter((planet) => filters
                     .every(({ selectedColumn, selectedComparison, selectedNumber }) => {
                       if (selectedComparison === 'maior que') {
                         return (+planet[selectedColumn] > +selectedNumber
                      && +planet[selectedColumn] !== 'unknown');
                       }
                       if (selectedComparison === 'menor que') {
                         return (+planet[selectedColumn] < +selectedNumber
                    && +planet[selectedColumn] !== 'unknown');
                       } if (selectedComparison === 'igual a') {
                         return (+planet[selectedColumn] === +selectedNumber
                      && +planet[selectedColumn] !== 'unknown');
                       }
                       return true;
                     }))
                   .map((planet, index) => (
                     <tr key={ index }>
                       <td data-testid="planet-name">
                         {planet.name}
                       </td>
                       <td>{planet.rotation_period}</td>
                       <td>{planet.orbital_period}</td>
                       <td>{planet.diameter}</td>
                       <td>{planet.climate}</td>
                       <td>{planet.gravity}</td>
                       <td>{planet.terrain}</td>
                       <td>{planet.surface_water}</td>
                       <td>{planet.population}</td>
                     </tr>
                   ))}
              </tbody>
            </table>)
          : <p>Loading</p>}
      </div>
    </main>
  );
}

export default Table;
