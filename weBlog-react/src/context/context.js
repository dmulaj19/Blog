import React, { useState } from "react";

export const usePersistedState = (defaultValue, key) => {
  const value = JSON.parse(localStorage.getItem(key));
  const [state, setState] = React.useState(
    value === "" ? value : value || defaultValue,
    key
  );
  React.useEffect(() => {
    try {
      console.log("storing ", key);
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.log({e})
      console.log("Local Storage is full, Please empty data");
      //localStorage.clear();
    }
  }, [key, state]);

  const resetState = () => setState(defaultValue);
  return [state, setState, resetState];
};

const AppContext = React.createContext(null);

export const useAppContext = () => React.useContext(AppContext);

let store;

export const getStore = () => ({ ...store });

export const AppContextProvider = ({ children }) => {
  const user = usePersistedState(null, "user");
  const selectedBlog = usePersistedState(null, "selectedBlog");

  store = {
    user,
    selectedBlog,
  };
  console.log({ store });
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};
