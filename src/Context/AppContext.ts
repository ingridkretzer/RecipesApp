import { createContext } from 'react';

type AppContextType = {
  email: string
};

const AppContext = createContext({} as AppContextType);

export default AppContext;
