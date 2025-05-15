import React, { useEffect, useState } from 'react';
import { fetchData } from '../api/index';

function Player() {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData('/player')
      .then((data) => {
        setPlayer(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Erreur lors du chargement des informations du joueur.", err);
        setPlayer('login');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white/90 rounded-xl shadow-2xl px-10 py-5 flex flex-col items-center max-w-md w-full">
        <div className="text-gray-600 text-center">Chargement des infos joueur...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/90 rounded-xl shadow-2xl px-10 py-5 flex flex-col items-center max-w-md w-full">
        <div className="text-red-600 text-center">{error}</div>
      </div>
    );
  }

  if (!player) return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="bg-white/90 rounded-xl shadow-2xl px-10 py-5 flex flex-col items-center max-w-md w-full">
      <h1 className="text-3xl font-extrabold text-green-800 mb-6 drop-shadow-lg">Profil Joueur</h1>
      <div className="w-full flex flex-col gap-4 items-center">
        <div className="text-lg font-semibold text-green-900">Pseudo : <span className="font-normal">{player.username}</span></div>
        <div className="text-lg font-semibold text-green-900">Argent : <span className="font-normal">{player.money} $</span></div>
        <div className="text-lg font-semibold text-green-900">État : <span className="font-normal">{player.state || 'aucun'}</span></div>
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-200 text-lg border-2 border-red-800"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}

export default Player;
