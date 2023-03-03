import {Button, Container, Link, Paper, Stack, TextField, Typography} from "@mui/material";

export const Auth = (props) => {
    const login = () => {
        props.setLoggedIn(true)
    }
    return (
        <Container maxWidth="sm">
            <Paper sx={{p: 6, mt: "25%"}} elevation={2}>
                <Stack spacing={2}>
                    <Typography variant="h3" sx={{mb: "12px"}} alignSelf="center"> Login </Typography>
                    <TextField type="email" label="Email"></TextField>
                    <TextField type="password" label="Password"></TextField>

                    <Stack spacing={1}>
                        <Button variant="contained" onClick={login}>Login</Button>
                        <Button color="warning" variant="contained">Continue with Google</Button>
                    </Stack>

                    <Typography align="right">
                        <Link>
                            Forgot your password?
                        </Link>
                    </Typography>
                </Stack>
            </Paper>
        </Container>
    )
}