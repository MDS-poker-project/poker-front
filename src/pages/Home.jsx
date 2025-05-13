import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "../components/Login";
import { fetchData } from "../api";
import Register from "../components/Register";
import Player from "../components/Player";

function Home() {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [player, setPlayer] = useState(null);
  const [register, setRegister] = useState(false);

  useEffect(() => {
    console.log("player", player);
  }, [player]);

  useEffect(() => {
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
      setPlayer(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-stretch bg-gradient-to-br from-green-900 via-green-700 to-green-900">
      {/* Liste des tables (2/3 gauche) */}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="bg-white/90 rounded-xl shadow-2xl p-8 w-full max-w-3xl">
          <h2 className="text-2xl font-bold text-green-900 mb-6 text-center">Tables de jeu disponibles</h2>
          {loading ? (
            <div className="text-gray-600 text-center">Chargement...</div>
          ) : error ? (
            <div className="text-red-600 text-center">{error}</div>
          ) : tables?.length === 0 ? (
            <div className="text-gray-600 text-center">Aucune table disponible.</div>
          ) : (
            <ul className="space-y-3 max-h-[70vh] overflow-y-auto">
              {tables?.map((table) => (
                <li key={table.id} className="bg-green-100 border border-green-300 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between shadow">
                  <div>
                    <span className="font-semibold text-green-900">{table.name || `Table #${table.id}`}</span>
                    {/* {table.status && <span className="ml-2 text-xs text-gray-600">({table.status})</span>} */}
                  </div>
                  <div className="mt-2 md:mt-0 flex gap-2">
                    <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg text-sm border-2 border-green-900 transition">Rejoindre</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* Partie droite : login ou infos joueur */}
      <div className="w-full max-w-md flex flex-col justify-center items-center">
        <div className="p-8 w-full flex flex-col items-center">
          {!player ? (
            <Login 
              setPlayer={setPlayer}
            />
          ) : register ? (
            <Register />
          ) : (
            <Player />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
