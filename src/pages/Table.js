import { useEffect, useState } from 'react';

function Table() {
  const [tableColumn, setTableColumn] = useState([]);
  const [tableContent, setTableContent] = useState([]);

  const callApi = async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    const data = await response.json();
    const keys = data.results[0];
    const columns = Object.keys(keys).filter((header) => header !== 'residents');
    setTableContent(data.results);
    setTableColumn(columns);
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          {tableColumn.map((element) => (
            <th key={ element }>{element}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableContent.map((element, index) => (
          <tr key={ index }>
            {tableColumn.map((column) => (
              <td key={ column }>{element[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
