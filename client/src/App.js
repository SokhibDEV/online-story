import { Context } from ".";

import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { check } from "./http/userApi";
import { Spinner } from "react-bootstrap";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      check()
        .then((data) => {
          user.setUser(true);
          user.setIsAuth(true);
        })
        .finally(() => setLoading(false));
    }, 1000); 
  }, []);

  if (loading) {
    return <Spinner animation={"grow"} />;
  }

  return (
    <div className="App">
      <Navbar />
      <AppRouter />
    </div>
  );
});

export default App;
