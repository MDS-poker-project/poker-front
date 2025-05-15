import { fetchData } from "../api";
import { useEffect, useState } from "react";
import pokerImage from '../assets/poker-chips.png';
import playerImage from '../assets/players.png';
import moneyImage from '../assets/money1.png';
import { useNavigate } from "react-router-dom";

function Tables() {
    
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [loginState, setLoginState] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(loading, error, tables);
    try {
      fetchData("/tables")
        .then((res) => {
          console.log(res);
          setTables(res);
          setLoading(false);
        })
        .catch(() => {
          setError("Erreur lors du chargement des tables.");
          setLoading(false);
        });
    } catch (err) {
      setError("Erreur lors du chargement des tables.");
      setLoading(false);
    }
    // Vérifie si le joueur est connecté (présence d'un token)
    const token = localStorage.getItem("token");
    if (token) {
      setLoginState('player');
    }
  }, []);

  const handleTableNavigate = (tableId) => {
    if (localStorage.getItem("token")) {
      navigate(`/tables/${tableId}`);
    }
    else {
      alert("Veuillez vous connecter pour rejoindre une table.");
    }
  }
  
  return (
    <div className="flex-1 flex flex-col justify-center items-center z-20">
      {/* Liste des tables (2/3 gauche) */}
        <div className="bg-white/90 rounded-xl shadow-2xl p-6 w-full md:max-w-3xl">
          <h2 className="text-2xl font-bold text-green-900 mb-8 text-center">Tables de jeu disponibles</h2>
          {loading ? (
            <div className="text-gray-600 text-center">Chargement...</div>
          ) : error ? (
            <div className="text-red-600 text-center">{error}</div>
          ) : tables?.length === 0 ? (
            <div className="text-gray-600 text-center">Aucune table disponible.</div>
          ) : (
            <ul className="space-y-3 max-h-[70vh] overflow-y-auto">
              {tables?.map((table) => (
                <li key={table.id} className="bg-green-100 border border-green-300 rounded-lg p-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between shadow">
                  <div className="text-center">
                    <span className="font-semibold text-green-900">{table.name || `Table #${table.id}`}</span>
                    {/* {table.status && <span className="ml-2 text-xs text-gray-600">({table.status})</span>} */}
                  </div>
                 <div className="Logos flex justify-evenly gap-5">
                   <div>
                     <img src={playerImage} alt="players" className="w-[30px] h-[30px]"/>
                     <span className="text-sm text-gray-600">{table.players.length} / 3</span>
                   </div>
                   <div>
                     <img src={moneyImage} alt="money" className="w-[30px] h-[30px]"/>
                     <span className="text-sm text-gray-600">Pot: {table.pot}€</span>                  
                   </div>
                   <div>
                      <img src={pokerImage} alt="poker-chips" className="w-[30px] h-[30px]"/>
                     <span className="text-sm text-gray-600">Mise: {table.currentBet}</span>
                   </div>
                 </div>
                  <div className="flex flex-col">
                      <span className="text-sm text-gray-600">Tour: {table.currentTurn}</span>
                      <span className="text-sm text-gray-600">Manche: {table.round}</span>
                      <span className="text-sm text-gray-600">Manche en cours: {table.currentRound}</span>
                  </div>
                  <div className="mt-2 md:mt-0 flex gap-2">
                    <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg text-sm border-2 transition cursor-pointer" onClick={() => handleTableNavigate(table.id)}>Rejoindre</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
  );
}

export default Tables;