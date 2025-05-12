import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../api/index';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    setError('');
    
    try {
        const data = await postData("/auth/signUp", { username, password });
        if (data.access_token === true) {
            throw new Error("Le token d'accès est invalide.");
        }
        localStorage.setItem("token", data.access_token);
    }
    catch (err) {
        const errorMessage = err.response?.data?.message || err.message || "Une erreur est survenue.";
        setError(errorMessage);
        console.error("Erreur lors de la connexion:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-900 via-green-700 to-green-900">
      <div className="bg-white/90 rounded-xl shadow-2xl p-10 flex flex-col items-center max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-green-800 mb-6 drop-shadow-lg">Créer un compte</h1>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            className="px-4 py-3 rounded-lg border-2 border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="px-4 py-3 rounded-lg border-2 border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200 text-lg border-2 border-yellow-700 mt-2"
          >
            S'inscrire
          </button>
        </form>
        <a className="mt-4 hover:text-gray-600 hover:cursor-pointer" onClick={() => navigate('/login')}>Déjà un compte ?</a>
      </div>
    </div>
  );
}

export default Register;
