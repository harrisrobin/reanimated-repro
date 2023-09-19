import React, {useCallback, useMemo, useState} from 'react';
import {AppContext, IAppContext} from '../../hooks/useAppContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HoldMenuProvider from '../../lib/hold-menu/components/provider';

export const AppProviders = ({children}: {children: React.ReactNode}) => {
  const safeAreaInsets = useSafeAreaInsets();

  const [state, setState] = useState<IAppContext>({
    theme: 'light',
    toggleTheme: () => {},
  });

  const toggleTheme = useCallback(() => {
    setState({...state, theme: state.theme === 'light' ? 'dark' : 'light'});
  }, [state]);

  const appContextVariables = useMemo(
    () => ({
      ...state,
      toggleTheme,
    }),
    [state, toggleTheme],
  );

  const onOpen = useCallback(() => {
    console.log('App onOpen');
  }, []);

  const onClose = useCallback(() => {
    console.log('App onClose');
  }, []);

  return (
    <AppContext.Provider value={appContextVariables}>
      <HoldMenuProvider
        theme={state.theme}
        safeAreaInsets={safeAreaInsets}
        onOpen={onOpen}
        onClose={onClose}>
        {children}
      </HoldMenuProvider>
    </AppContext.Provider>
  );
};
