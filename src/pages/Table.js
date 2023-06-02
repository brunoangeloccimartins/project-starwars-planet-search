import { useContext } from 'react';
import planetsContext from '../context/planetsContext';

function Table() {
  const { planetFilter } = useContext(planetsContext);

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(planetFilter[0]).map((key) => (
            <th key={ key }>{key}</th>
          ))}
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
