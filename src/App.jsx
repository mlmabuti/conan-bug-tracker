import {Container, Typography} from '@mui/material'
import {Auth} from "./components/Auth.jsx";
import {useState} from "react";
import {Dashboard} from "./components/Dashboard.jsx";
import {Navbar} from "./components/Navbar.jsx";

function App() {
    const [loggedIn, setLoggedIn] = useState(true);

  return (
      <>
          {loggedIn ?
              <>
              <Navbar setLoggedIn={setLoggedIn}/>
              <Dashboard />
              </>
              :
            <Auth setLoggedIn={setLoggedIn}/>
          }
      </>
  )
}

export default App
