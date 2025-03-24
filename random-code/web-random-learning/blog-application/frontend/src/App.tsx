/*--------------------------------------------------------------*/

import React from "react";
import { HashRouter } from "react-router-dom";
import { Routes } from "./Routes";

/*--------------------------------------------------------------*/

const App: React.FC = () => {
  return (
    <div className="App">
      {/* Must use HashRouter for deployment with gh-pages  */}
      <HashRouter>
        <Routes />
      </HashRouter>
    </div>
  );
};

/*--------------------------------------------------------------*/

export default App;

/*--------------------------------------------------------------*/
