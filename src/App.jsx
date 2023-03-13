import {Auth} from "./pages/Auth.jsx";
import {useState} from "react";
import {Dashboard} from "./pages/Dashboard.jsx";
import {Navbar} from "./components/Navbar.jsx";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [colorMode, setColorMode] = useState('light')

    const darkTheme = createTheme({
        palette: {
            mode: colorMode,
        },
    });

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                {loggedIn ?
                    <>
                        <Navbar setLoggedIn={setLoggedIn} setColorMode={setColorMode} colorMode={colorMode}/>
                        <Dashboard/>
                    </>
                    :
                    <Auth setLoggedIn={setLoggedIn}/>
                }
            </ThemeProvider>
        </>
    )
}

export default App
