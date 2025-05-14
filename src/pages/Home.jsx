import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import Player from "../components/Player";
import Tables from "../components/Tables";
import Header from "../components/Header";
import chipImage from "../assets/poker-chip.png";
import moneyImage from "../assets/money1.png";

function Home() {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loginState, setLoginState] = useState("login");

  useEffect(() => {
    console.log("player", loginState);
  }, [loginState]);

  return (
    <div className="h-full bg-gradient-to-br from-green-900 via-green-700 to-green-900">
      <Header />
      <div className="flex flex-col md:flex-row justify-center items-center">
        {/* Liste des tables (2/3 gauche) */}
        <div className="w-4/4 flex justify-center items-center p-5">
          <Tables />
        </div>

        {/* Partie droite : login ou infos joueur */}
        <div className="w-2/4 flex justify-center items-center p-5">
          <div className="flex items-center">
            {loginState === "login" ? (
              <Login setLoginState={setLoginState} />
            ) : loginState === "register" ? (
              <Register setLoginState={setLoginState} />
            ) : (
              <Player />
            )}
          </div>
        </div>
        <img src={ chipImage} alt="poker-chip" className="h-25 absolute top-30 right-30 z-10"/>
      </div>
    </div>
  );
}

export default Home;
