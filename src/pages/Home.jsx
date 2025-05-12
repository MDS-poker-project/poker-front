import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-900 via-green-700 to-green-900">
      <div className="bg-white/90 rounded-xl shadow-2xl p-10 flex flex-col items-center max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-green-800 mb-4 drop-shadow-lg">Poker App</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">Jouez, créez des parties et défiez vos amis au poker en ligne !</p>
        <div className="flex gap-4 w-full">
          <button
            className="flex-1 bg-yellow-400 hover:bg-yellow-600 hover:cursor-pointer font-bold py-3 px-6 rounded-lg shadow-md transition duration-200 text-lg border-2 border-yellow-700 text-black"
            onClick={() => navigate("/register")}
          >
            Créer&nbsp;un&nbsp;compte
          </button>
          <button
            className="flex-1 bg-orange-400 hover:bg-orange-600 hover:cursor-pointer font-bold py-3 px-6 rounded-lg shadow-md transition duration-200 text-lg border-2 border-green-900 text-black"
            onClick={() => navigate("/login")}
          >
            Connexion
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
