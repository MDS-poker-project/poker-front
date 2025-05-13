import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData, getTokenPayload } from '../api';

function Table() {
  const { id } = useParams();
  const [table, setTable] = useState(null);
  const [possibleActions, setPossibleActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [actionAmount, setActionAmount] = useState('');
  const playerId = getTokenPayload()?.sub || getTokenPayload()?.userId;
  const navigate = useNavigate();

  // Rejoint la table puis charge les infos
  const joinAndFetch = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await fetchData(`/tables/${id}/join`); // On ignore la réponse, on veut juste rejoindre
      const data = await fetchData(`/tables/${id}`);
      setTable(data);
      console.log(data);
      const actions = await fetchData(`/tables/${id}/actions`);
      console.log("actions", actions);
      setPossibleActions(actions);
      setLoading(false);
    } catch (err) {
      setError("Erreur lors du chargement de la table.", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    joinAndFetch();
    // eslint-disable-next-line
  }, [id]);

  // Rafraîchit la table et les actions
  const refreshTable = async () => {
    try {
      const data = await fetchData(`/tables/${id}`);
      console.log('table', data);
      setTable(data);
      const actions = await fetchData(`/tables/${id}/actions`);
      console.log(actions);
      setPossibleActions(actions);
    } catch (err) {
      setError("Erreur lors du rafraîchissement de la table.", err);
    }
  };

  // Joue une action (fold, call, raise, check, leave...)
  const handleAction = async (action) => {
    setError('');
    setMessage('');
    try {
      let endpoint = `/tables/${id}/actions/${action}`;
      if (action === 'raise' && actionAmount) {
        endpoint += `/${actionAmount}`;
      }
      const res = await fetchData(endpoint);
      if (typeof res === 'string') {
        setMessage(res);
        refreshTable();
        return;
      }
      refreshTable();
    } catch (err) {
      setError("Erreur lors de l'action.", err);
    }
  };

  const handleLeave = async () => {
    setError('');
    setMessage('');
    try {
      const res = await fetchData(`/tables/${id}/leave`);
      navigate('/');
      if (typeof res === 'string') {
        setMessage(res);
        return;
      }
    }
    catch (err) {
      setError("Erreur lors du départ de la table.", err);
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-green-900 text-white">Chargement de la table...</div>;
  }
  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-700">{error}</div>;
  }
  if (!table) return null;

  // Trouve le joueur courant
  const currentPlayer = table.players?.find(p => p.id === playerId);

  return (
    <div className="min-h-screen flex flex-col items-center p-6" style={{
      background: `repeating-linear-gradient(135deg, #c9b29b 0 40px, #bfa98e 40px 80px), repeating-linear-gradient(-135deg, #c9b29b 0 40px, #bfa98e 40px 80px)`,
      backgroundBlendMode: 'multiply',
      backgroundColor: '#bfa98e',
    }}>
      <div className="w-full h-full flex-1 justify-between flex flex-col gap-6">
        <div className="flex justify-start items-center mb-2">
          <button
            onClick={() => handleLeave()}
            className="flex items-center gap-2 text-red-700 hover:text-red-900 font-bold text-lg px-3 py-1 rounded transition-colors hover:cursor-pointer"
            title="Quitter la table"
          >
            <span className="text-2xl">&times;</span>
            <span>Quitter</span>
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Zone table/pot/river */}
          <div className="flex-1 flex flex-col items-center gap-4">
            {/* Table de poker visuelle */}
            <div className="relative w-[80%] h-[60vh] md:w-[90%] md:h-[40vh] flex items-center justify-center mb-6">
              {/* Table verte ovale responsive avec contour bois */}
              <div className="absolute w-full h-full flex items-center justify-center"
                style={{
                  borderRadius: '50% / 40%',
                  boxShadow: '0 0 40px 10px #7c5a3a inset, 0 0 0 16px #a67c52, 0 0 0 24px #7c5a3a', // effet bois en ombre et double contour
                  background: '#a67c52',
                  backgroundBlendMode: 'multiply',
                  border: '8px solid #7c5a3a',
                  transition: 'border-radius 0.3s',
                }}
              >
                {/* Table verte centrale */}
                <div className="w-[100%] h-[100%] flex items-center justify-center"
                  style={{
                    borderRadius: '50% / 40%',
                    background: '#22643a',
                    boxShadow: '0 0 24px 2px #0006 inset',
                  }}
                >
                  {/* Pot au centre */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-200 border-2 border-yellow-600 rounded-full px-4 py-2 text-green-900 font-bold shadow-lg z-10">
                    Pot: {table.pot} $
                  </div>
                  {/* River au centre, sous le pot */}
                  <div className="absolute left-1/2 top-[60%] -translate-x-1/2 flex gap-2 z-10">
                    {table.river?.length === 0 ? (
                      <span className="text-gray-200 italic">(river vide)</span>
                    ) : (
                      table.river.map((card, i) => (
                        <span key={i} className="bg-white border border-gray-400 rounded px-2 py-1 shadow text-green-900 font-mono text-sm">{card.rank} {card.suit}</span>
                      ))
                    )}
                  </div>
                  {/* Joueurs autour de la table */}
                  {table.players?.map((player, idx) => {
                    let style = {
                        minWidth: 60,
                        position: 'absolute',
                    };

                    const isCurrent = player.isAI === false;
                    const isLeft = !isCurrent && idx % 2 === 1;
                    const isRight = !isCurrent && idx % 2 === 0;

                    if (isCurrent) {
                        style.left = '50%';
                        style.top = '100%';
                        style.transform = 'translate(-50%, 30px)'; // parfaitement centré horizontalement, sous la table
                        style.zIndex = 30;
                    } else if (isLeft) {
                        style.left = '5%';
                        style.top = '50%';
                        style.transform = 'translate(-50%, -50%)';
                    } else if (isRight) {
                        style.left = '95%';
                        style.top = '50%';
                        style.transform = 'translate(-50%, -50%)';
                    }

                    return (
                        <div
                        key={player.id}
                        className={`flex flex-col items-center z-20 ${isCurrent ? 'font-bold text-green-900' : 'text-gray-900'}`}
                        style={style}
                        >
                        <div className={`px-2 py-1 rounded-lg shadow ${isCurrent ? 'bg-green-200 border-2 border-green-700' : 'bg-white/80 border border-gray-300'}`}>{player.username}</div>
                        <div className="text-xs">{player.money} $</div>
                        <div className="text-xs italic">{player.state}</div>
                        {isCurrent && currentPlayer?.hand?.length ? (
                            <div className="flex gap-1 mt-1">
                            {currentPlayer.hand.map((card, i) => (
                                <span key={i} className="bg-yellow-100 border rounded px-1 py-0.5 text-green-900 font-mono text-xs">{card.rank} {card.suit}</span>
                            ))}
                            </div>
                        ) : null}
                        </div>
                    );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {message && <div className="mt-4 text-center text-lg text-white font-semibold">{message}</div>}
        {/* Actions */}
        <div className="mt-6 flex justify-between items-center gap-2">
          <div className="flex flex-wrap gap-3">
            {Array.isArray(possibleActions) && possibleActions.length > 0 && (
              possibleActions.map(action => (
                action === 'raise' ? (
                  <form key={action} onSubmit={e => { e.preventDefault(); handleAction('raise'); }} className="flex gap-2 items-center">
                    <input type="number" min="1" className="border rounded px-2 py-1 w-20 bg-white" placeholder="Montant" value={actionAmount} onChange={e => setActionAmount(e.target.value)} />
                    <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg border-2 border-yellow-700 hover:cursor-pointer">Relancer</button>
                  </form>
                ) : null // On ne gère plus les autres boutons ici
              ))
            )}
          </div>
          {/* Boutons fixes à droite */}
          <div className="flex gap-2 ml-4">
            {possibleActions.includes('small_blind') && (
              <button
                onClick={() => handleAction('small_blind')}
                className="font-bold py-2 px-4 rounded-lg border-2 bg-blue-700 hover:bg-blue-800 text-white border-blue-900 capitalize"
              >
                Petite blinde
              </button>
            )}
            {possibleActions.includes('big_blind') && (
              <button
                onClick={() => handleAction('big_blind')}
                className="font-bold py-2 px-4 rounded-lg border-2 bg-purple-700 hover:bg-purple-800 text-white border-purple-900 capitalize"
              >
                Grosse blinde
              </button>
            )}
            <button
              onClick={() => possibleActions.includes('call') && handleAction('call')}
              disabled={!possibleActions.includes('call')}
              className={`font-bold py-2 px-4 rounded-lg border-2 capitalize ${possibleActions.includes('call') ? 'bg-green-700 hover:bg-green-800 text-white border-green-900 hover:cursor-pointer' : 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed'}`}
            >
              Suivre
            </button>
            <button
              onClick={() => possibleActions.includes('check') && handleAction('check')}
              disabled={!possibleActions.includes('check')}
              className={`font-bold py-2 px-4 rounded-lg border-2 capitalize ${possibleActions.includes('check') ? 'bg-green-700 hover:bg-green-800 text-white border-green-900 hover:cursor-pointer' : 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed'}`}
            >
              Checker
            </button>
            <button
              onClick={() => possibleActions.includes('fold') && handleAction('fold')}
              disabled={!possibleActions.includes('fold')}
              className={`font-bold py-2 px-4 rounded-lg border-2 capitalize ${possibleActions.includes('fold') ? 'bg-green-700 hover:bg-green-800 text-white border-green-900 hover:cursor-pointer' : 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed'}`}
            >
              Se coucher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
