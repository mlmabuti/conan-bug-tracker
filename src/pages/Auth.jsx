import {Button, Container, Link, Paper, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {auth, googleProvider} from '../firebase-config';
import {createUserWithEmailAndPassword, signInWithPopup} from "firebase/auth";

export const Auth = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isIncorrect, setIsIncorrect] = useState(false);

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            console.log("logged in as" + auth.currentUser.email)
            props.setLoggedIn(true)
            setIsIncorrect(false);
        } catch (err) {
            console.error(err)
            setIsIncorrect(true);
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            console.log("logged in as " + auth.currentUser.email)
            props.setLoggedIn(true)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Container maxWidth="xs">
            <Paper sx={{p: 6, mt: "25%"}} elevation={2}>
                <Stack spacing={2}>
                    <Typography variant="h4" sx={{mb: "12px"}} alignSelf="center"> Sign in</Typography>

                    {isIncorrect ?
                        <Typography variant="subtitle2" sx={{color: "red"}}>
                            Invalid email or password. Please try again.
                        </Typography> :
                        false
                    }

                    <TextField type="email" label="Email" onChange={(e) => setEmail(e.target.value)}></TextField>
                    <TextField type="password" label="Password"
                               onChange={(e) => setPassword(e.target.value)}></TextField>

                    <Stack spacing={1}>
                        <Button variant="contained" onClick={signIn}>Sign in</Button>
                        <Button color="warning" variant="contained" onClick={signInWithGoogle}>Continue with
                            Google</Button>
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