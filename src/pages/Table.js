import { useEffect, useState } from 'react';

function Table() {
  
  return (
    <main>
    <header>
    <input
    type='text'
    data-testid='name-filter'/>
    </header>
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
    </main>
  );
}

export default Table;
