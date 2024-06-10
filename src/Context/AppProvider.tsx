import { useState } from 'react';
import AppContext from './AppContext';

function AppProvider({ children } : { children : React.ReactNode }) {
  const getEmail = () => {
    return JSON.parse(localStorage.getItem('email') || '[]');
  };
  const [email, setEmail] = useState(getEmail());

  return (
    <AppContext.Provider value={ email }>
      <div>
        { children }
      </div>
    </AppContext.Provider>
  );
}

export default AppProvider;
