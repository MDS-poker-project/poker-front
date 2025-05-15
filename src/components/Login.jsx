import React, { useState } from 'react';
import ApiService from '../api/ApiService';

function Login({setLoginState}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
        setError('Veuillez remplir tous les champs.');
        return;
        }
        setError('');
        
        try {
            const data = await ApiService.postData("/auth/signIn", { username, password });
            if (data.access_token === true) {
                throw new Error("Le token d'accès est invalide.");
            }
            localStorage.setItem("token", data.access_token);
            setLoginState('player');
        }
        catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Une erreur est survenue.";
            setError(errorMessage);
            console.error("Erreur lors de la connexion:", err);
        }
    };

  return (
      <div className="bg-white/90 rounded-xl shadow-2xl px-10 py-5 flex flex-col items-center p-6 max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-green-800 mb-6 drop-shadow-lg">Connexion</h1>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Identifiant"
            className="px-4 py-3 rounded-lg border-2 border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="px-4 py-3 rounded-lg border-2 border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 hover:cursor-pointer text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200 text-lg border-2 border-green-900 mt-2"
          >
            Se connecter
          </button>
        </form>
        <a className="mt-4 hover:text-gray-600 hover:cursor-pointer" onClick={() => setLoginState('register')}>Pas encore de compte ?</a>
      </div>
      
  );
}

export default Login;
