import { render, screen, waitFor } from '@testing-library/react';
import Tables from '../src/components/Tables';
import { fetchData } from '../src/api';

jest.mock('../src/api'); // mock pour simuler les fausse données, pas besoin de back pour tester

it('affiche les tables après chargement', async () => {
  const fakeTables = [
    {
      id: 1,
      name: 'Table A',
      players: [1, 2],
      pot: 100,
      currentBet: 10,
      currentTurn: 1,
      round: 2,
      currentRound: 1,
    },
  ];

  fetchData.mockResolvedValueOnce(fakeTables);

  render(<Tables />);

  expect(screen.getByText(/chargement/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/table a/i)).toBeInTheDocument();
    expect(screen.getByText(/2 \/ 3/i)).toBeInTheDocument();
    expect(screen.getByText(/pot: 100/i)).toBeInTheDocument();
  });
});

it('affiche une erreur si l\'API échoue', async () => {
  fetchData.mockRejectedValueOnce(new Error('API error'));

  render(<Tables />);

  await waitFor(() => {
    expect(screen.getByText(/erreur lors du chargement des tables/i)).toBeInTheDocument();
  });
});

it('affiche un message si aucune table n\'est disponible', async () => {
  fetchData.mockResolvedValueOnce([]);

  render(<Tables />);

  await waitFor(() => {
    expect(screen.getByText(/aucune table disponible/i)).toBeInTheDocument();
  });
});