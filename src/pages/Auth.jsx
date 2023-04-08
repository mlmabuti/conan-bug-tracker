import {Button, Container, Link, Paper, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {auth, googleProvider} from '../firebase-config';
import {createUserWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import GoogleIcon from '@mui/icons-material/Google';

export const Auth = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isIncorrect, setIsIncorrect] = useState(false);

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
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
            props.setLoggedIn(true)
        } catch (err) {
            console.error(err)
        }
    }

    return (<Container maxWidth="xs">
            <Paper sx={{p: 6, mt: "25%"}} elevation={2}>
                <Stack spacing={3}>
                    <Typography variant="h5" align="center"> Sign in with Google </Typography>
                    <Typography variant="subtitle1" align="center" alignSelf="center">
                        Welcome beta testers! This app is designed to help us track and resolve issues in real-time,
                        making us more efficient and productive in our group software development projects.

                        <br/>
                        <br/>
                        You may visit our
                        <Link underline="hover" target="_blank"
                              href="https://github.com/mlmabuti/conan-bug-tracker"> GitHub repository </Link>
                        for more information and guidance.
                    </Typography>

                        <Button variant="contained" onClick={signInWithGoogle}>
                            <GoogleIcon sx={{mr: 1}}/>
                            Continue with Google</Button>
                </Stack>
            </Paper>
        </Container>)
}