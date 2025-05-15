import Login from '../components/Login';
import { postData } from '../api/index';
import { render, fireEvent, waitFor } from '@testing-library/react';

// Mock de la fonction postData pour éviter les appels réels à l'API
jest.mock('../api/index', () => ({
    ...jest.requireActual('../api/index'),
    postData: jest.fn(),
}));

// Le composant s'affiche correctement
it('renders without crashing', () => {
    const { container } = render(<Login setLoginState={jest.fn()} />);
    expect(container).toBeInTheDocument();
});

// Le composant affiche les champs de connexion
it('renders the login form', () => {
    const { getByPlaceholderText, getByText } = render(<Login setLoginState={jest.fn()} />);
    expect(getByPlaceholderText('Identifiant')).toBeInTheDocument();
    expect(getByPlaceholderText('Mot de passe')).toBeInTheDocument();
    expect(getByText('Se connecter')).toBeInTheDocument();
});


// Le formulaire affiche un message d'erreur si les champs sont vides
it('shows an error message when the form is submitted with empty fields', async () => {
    const { getByText } = render(<Login setLoginState={jest.fn()} />);
    const submitButton = getByText('Se connecter');
    fireEvent.click(submitButton);
    // En await car le message d'erreur est dynamique
    expect(await getByText('Veuillez remplir tous les champs.')).toBeInTheDocument();
});

// Si on est connecté, on attend à ce que le token soit dans le localStorage
it('hides the form when the credentials are correct', async () => {
    const mockSetLoginState = jest.fn();
    const { getByPlaceholderText, getByText } = render(<Login setLoginState={mockSetLoginState} />);

    // Simule une réponse réussie de l'API
    postData.mockResolvedValueOnce({ access_token: 'mockToken' });

    fireEvent.change(getByPlaceholderText('Identifiant'), { target: { value: 'test' } });
    fireEvent.change(getByPlaceholderText('Mot de passe'), { target: { value: 'mdp' } });

    const submitButton = getByText('Se connecter');
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(localStorage.getItem('token')).toBe('mockToken');
    });
});