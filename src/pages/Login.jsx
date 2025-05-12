import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    setError('');
    
    // Appel api
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-900 via-green-700 to-green-900">
      <div className="bg-white/90 rounded-xl shadow-2xl p-10 flex flex-col items-center max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-green-800 mb-6 drop-shadow-lg">Connexion</h1>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-lg border-2 border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
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
      </div>
    </div>
  );
}

export default Login;
