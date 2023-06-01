import React, { useContext, useEffect } from 'react';
import './App.css';
import Table from './pages/Table';
import planetsContext from './context/planetsContext';

function App() {
  const { planetsApi } = useContext(planetsContext);

  useEffect(() => { planetsApi(); }, []);

  return (
    <Table />
  );
}

export default App;
