import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Tables from '../src/components/Tables';
import ApiService from '../src/api/ApiService';

jest.mock('../src/api/ApiService', () => ({
  __esModule: true,
  default: {
    fetchData: jest.fn(),
    postData: jest.fn(),
  },
}));

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

  ApiService.fetchData.mockResolvedValueOnce(fakeTables);

  // Dans MemoryRouter pour éviter les erreurs avec useNavigate
  render(
    <MemoryRouter>
      <Tables />
    </MemoryRouter>
  );

  expect(screen.getByText(/chargement/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/table a/i)).toBeInTheDocument();
    expect(screen.getByText(/2 \/ 3/i)).toBeInTheDocument();
    expect(screen.getByText(/pot: 100/i)).toBeInTheDocument();
  });
});

it('affiche une erreur si l\'API échoue', async () => {
  ApiService.fetchData.mockRejectedValueOnce(new Error('API error'));

  // Dans MemoryRouter pour éviter les erreurs avec useNavigate
  render(
    <MemoryRouter>
      <Tables />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/erreur lors du chargement des tables/i)).toBeInTheDocument();
  });
});

it('affiche un message si aucune table n\'est disponible', async () => {
  ApiService.fetchData.mockResolvedValueOnce([]);

  // Dans MemoryRouter pour éviter les erreurs avec useNavigate
  render(
    <MemoryRouter>
      <Tables />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/aucune table disponible/i)).toBeInTheDocument();
  });
});