import React, { useState } from 'react';
import { Router } from './router';


const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="app">
      <Router/>
    </div>
  );
};

export default App;

