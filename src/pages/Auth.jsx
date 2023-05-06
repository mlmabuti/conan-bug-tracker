import {Button, Container, Link, Paper, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {auth, googleProvider} from '../firebase-config';
import {createUserWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import GoogleIcon from '@mui/icons-material/Google';

export const Auth = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isIncorrect, setIsIncorrect] = useState(false);

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            props.setLoggedIn(true)
        } catch (err) {
            console.error(err)
        }
    }

    return (<Container maxWidth="xs">
            <Paper sx={{p: 6, mt: "25%"}} elevation={2}>
		    <Stack spacing={2}>
                    <Typography variant="h4" alignSelf="center">Sign in</Typography>
                    <center>
                        <Typography variant="body" sx={{mb: "12px"}} alignSelf="center">Welcome to Conan, this app aims to introduce bug tracking to students in the CICS. <br/> <br/>
                            It is currently under development as part of a research study. As such, we welcome your feedback and suggestions to help us improve the app.
                        </Typography>
                    </center>

                    <Stack spacing={1}>
                        <Button sx={{p:1.2}} variant="contained" onClick={signInWithGoogle}> <GoogleIcon sx={{mb:.2, mr:1}} /> Continue with
                            Google</Button>
                    </Stack>

                </Stack>
            </Paper>
        </Container>)
}
