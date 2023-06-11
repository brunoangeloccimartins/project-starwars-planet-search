import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { act } from 'react-dom/test-utils';
import PlanetsProvider from '../context/PlanetsProvider';
import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData'

describe('Testa se tem todos os selects e inputs necessários', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    render(<PlanetsProvider>
            <App />
          </PlanetsProvider>);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('Testa se a aplicação possui um input de texto', () => {
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });
  it('Testa se ao digitar algo no input a tabela é filtrada', async () => {
    await waitFor(() => expect(screen.getByText(/Tatooine/i)).toBeInTheDocument(),
    {timeout:4000});
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    act(() => {
      userEvent.type(input,'oo')
    })
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3);
  });
  it('Testa tudo', async () => {
    await waitFor(() => expect(screen.getByText(/Tatooine/i)).toBeInTheDocument(),
    {timeout:4000});
    const [columnCombo, comparisonCombo] = screen.getAllByRole('combobox');
    const numberInput = screen.getByRole('spinbutton');
    const filterBtn = screen.getByRole('button', {  name: /filtrar/i});
    act(() => {
      userEvent.selectOptions(columnCombo, 'diameter');
      userEvent.selectOptions(comparisonCombo,'maior que');
      userEvent.clear(numberInput);
      userEvent.type(numberInput,'8900');
      userEvent.click(filterBtn);
    })
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(8);
    
    act(() => {
      userEvent.selectOptions(columnCombo, 'population');
      userEvent.selectOptions(comparisonCombo,'menor que');
      userEvent.clear(numberInput);
      userEvent.type(numberInput,'1000000');
      userEvent.click(filterBtn);
    })
    const rows2 = screen.getAllByRole('row');
    expect(rows2).toHaveLength(3);

    act(() => {
      userEvent.selectOptions(columnCombo, 'rotation_period');
      userEvent.selectOptions(comparisonCombo,'igual a');
      userEvent.clear(numberInput);
      userEvent.type(numberInput,'24');
      userEvent.click(filterBtn);
    })
    const rows3 = screen.getAllByRole('row');
    expect(rows3).toHaveLength(2);

    const [,,btn] = screen.getAllByRole('button', {name:'X'});
    act(() => {
      userEvent.click(btn);
    })
    const rows4 = screen.getAllByRole('row');
    expect(rows4).toHaveLength(3);

    const removeAll = screen.getByRole('button', {  name: /remover filtragens/i});
    act(() => {
      userEvent.click(removeAll);
    })
    const rows5 = screen.getAllByRole('row');
    expect(rows5).toHaveLength(11);
  })
});
