import React from "react";
import AppContainer from "./appcontainer.jsx";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AppContextProvider } from "./context/context.js";

const AppRouter = (props) => {
  return (
    <AppContextProvider>
      <Router>
        <Route render={(props) => <AppContainer {...props} />} />
      </Router>
    </AppContextProvider>
  );
};

export default AppRouter;
