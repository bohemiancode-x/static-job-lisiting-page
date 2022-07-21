import React from "react";
import Joblist from "./components/Joblist";

function App() {
  return (
    <div className="App bg-body h-fit pb-5 ">
      <nav className="h-20 bg-header-lg sm:bg-header-sm bg-primary"></nav>
      <Joblist />
    </div>
  );
}

export default App;
