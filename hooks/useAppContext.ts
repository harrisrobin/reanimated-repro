import {createContext, useContext} from 'react';

export interface IAppContext {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const AppContext = createContext<IAppContext | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === null) {
    throw new Error(
      "Internal context cannot be null, please add 'Provider' to the root component.",
    );
  }

  return context;
};
