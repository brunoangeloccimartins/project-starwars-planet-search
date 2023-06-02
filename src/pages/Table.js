import { useContext, useEffect } from 'react';
import PlanetsContext from '../context/planetsContext';

function Table() {
  const { planetFilter, callApi } = useContext(PlanetsContext);
  const header = planetFilter[0];

  useEffect(() => {
    callApi();
  }, []);

  if (header === undefined) {
    return (<p>Loading</p>);
  }

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(header).map((element) => (
            <th key={ element }>
              {element.toUpperCase()}
            </th>))}
        </tr>
      </thead>
      <tbody>
        {planetFilter.map((planet) => (
          <tr key={ planet.name }>
            {Object.values(planet).map((value) => (
              <td key={ value }>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
