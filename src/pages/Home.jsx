function Home() {
  return (
    <div className="home-container">
      <h1>Bienvenue sur Poker App</h1>
      <p>Jouez, créez des parties et défiez vos amis au poker en ligne !</p>
      <div className="home-buttons">
        <button className="home-btn" onClick={() => window.location.href='/register'}>Créer un compte</button>
        <button className="home-btn" onClick={() => window.location.href='/login'}>Connexion</button>
      </div>
    </div>
  );
}

export default Home;
