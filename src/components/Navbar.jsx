import {Button, Link, Stack, Typography} from "@mui/material";


export const Navbar = (props) => {
    const logout = () => {
        props.setLoggedIn(false)
    }

    return (
        <Stack
            sx={{py: 2, borderBottom:"1px solid dimgray" }}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
        >
            <Stack direction="row" alignItems="center" spacing={1}>
                <img src={"/favicon.png"} width="32px" alt="conan-logo"/>
                <Typography variant="h5">Conan Bug Tracker</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={4}>
                <Link>Documentation</Link>
                <Button variant="outlined" color="error" onClick={logout}>
                    Logout
                </Button>
            </Stack>
        </Stack>
    )
}