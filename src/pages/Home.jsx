import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import Player from "../components/Player";

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
    <div className="min-h-screen flex items-stretch bg-gradient-to-br from-green-900 via-green-700 to-green-900">
      {/* Partie droite : login ou infos joueur */}
      <div className="w-full max-w-md flex flex-col justify-center items-center">
        <div className="p-8 w-full flex flex-col items-center">
          {loginState === "login" ? (
            <Login 
              setLoginState={setLoginState}
            />
          ) : loginState === "register" ? (
            <Register 
              setLoginState={setLoginState}
            />
          ) : (
            <Player />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
