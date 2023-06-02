import { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/planetsContext';

function Table() {
  const { planetFilter, callApi } = useContext(PlanetsContext);
  const header = planetFilter[0];

  const [inputValue, setInputValue] = useState({});
  const [filteredPlanets, setFilteredPlanets] = useState(planetFilter)
  
  const handleChange = (e) => {
    const { value, name } = e.target;
    
    setInputValue((prevValues) => ({
      ...prevValues, [name]:value
    }));
  };
  
  const handleFilter = () => {
    const filteredData = planetFilter.filter((item) => {
      console.log(item.name,inputValue)
      if (inputValue['name-filter'].length !== 0 && !item.name.toLowerCase().includes(inputValue['name-filter'].toLowerCase())) {
        return false;
      }
      return true
    })
    setFilteredPlanets(filteredData)
    console.log(filteredData)
  }

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if(inputValue['name-filter']?.length !== 0) {
      handleFilter();
    }
  },[inputValue])

  if (header === undefined) {
    return (<p>Loading</p>);
  }

  return (
    <main>
      <input
        key="name-input"
        type="text"
        name='name-filter'
        data-testid="name-filter"
        value={ inputValue['name-filter'] || '' }
        onChange={ handleChange }
      />
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
          {filteredPlanets.map((planet) => (
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
