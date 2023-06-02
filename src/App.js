import React, { useContext, useEffect } from 'react';
import './App.css';
import Table from './pages/Table';
import PlanetsProvider from './context/PlanetsProvider';
import planetsContext from './context/planetsContext';

function App() {
  const { callApi } = useContext(planetsContext);

  useEffect(() => {
    callApi();
  }, []);

  return (
    <PlanetsProvider>
      <Table />
    </PlanetsProvider>
  );
}

export default App;
