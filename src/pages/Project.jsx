import {Button, Box, Container, CircularProgress, Stack, Typography, Paper, ButtonGroup, LinearProgress} from "@mui/material";
import {TicketsTable} from "../components/TicketsTable"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useEffect, useState} from "react";
import {MembersPopover} from "../components/MembersPopover.jsx";
import {NewTicketFormModal} from "../components/NewTicketFormModal.jsx";
import {auth, db} from "../firebase-config";
import {doc, deleteDoc, getDoc} from "firebase/firestore";
import {DeletePopover} from "../components/DeletePopover.jsx";
import RefreshIcon from "@mui/icons-material/Refresh";
import LinearProgressWithLabel from "../components/LinearProgressWithLabel.jsx";


export const Project = (props) => {
    const [toggleDisable, setToggleDisable] = useState("disabled")
    const [showResolved, setShowResolved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const projectRef = doc(db, "projects", props.project.id)
    const [ticketList, setTicketList] = useState([]);
    const [progress, setProgress] = useState(0);

    const getTicketList = async () => {
        setIsLoading(true)
        try {
            const docSnap = await getDoc(projectRef);
            const tickets = docSnap.data().tickets;
            setTicketList(tickets);
        } catch (e) {
            console.error(e);
        }
        const resolved = ticketList.filter((ticket) => ticket.status === "Resolved")
        setProgress(resolved.length/ticketList.length*100);
        setIsLoading(false)
    };

    const deleteProject = async (id) => {
        const projectDoc = doc(db, "projects", id);
        await deleteDoc(projectDoc);
        props.getProjectList();
        props.chooseProject(null)
    }

    useEffect(() => {
        if (auth.currentUser.uid === props.project.userId) {
            setToggleDisable("outlined")
        }
        getTicketList();
    }, [])

    return (<>
        <Container maxWidth="xl">
            <Paper sx={{p: 4, m: 6}}>

                <LinearProgressWithLabel sx={{mb:4, mt:3.5}} value={progress} getTicketList={getTicketList} />

                <Stack
                    sx={{mb: 3}}
                    direction="row"
                    justifyContent="space-between"
                >

                    <Stack
                        direction="row"
                        spacing={0}>
                    <Typography variant="h4">
                        {props.project.title}
                    </Typography>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={2}>
                        <NewTicketFormModal currentUser={auth.currentUser.displayName} getTicketList={getTicketList} projectRef={projectRef}/>

                        <Button color="info" variant="contained"
                                onClick={() => showResolved ? setShowResolved(false) : setShowResolved(true)}>
                            {showResolved ? 'Show Unresolved' : 'Show Resolved'}
                        </Button>

                        <ButtonGroup size="small" variant="outlined">

                            <DeletePopover toggleDisable={toggleDisable} deleteProject={deleteProject} project={props.project}/>

                            <MembersPopover project={props.project} projectRef={projectRef} members={props.project.members}/>

                            <Button onClick={getTicketList} >
                                <RefreshIcon/>
                            </Button>

                            <Button onClick={() => props.chooseProject(null)}>
                                <ArrowBackIcon/>
                            </Button>


                        </ButtonGroup>
                    </Stack>
                </Stack>

                {
                    isLoading ? <CircularProgress/> :
                    <TicketsTable currentUser={auth.currentUser.displayName} tickets={ticketList} getTicketList={getTicketList} project={props.project} projectId={props.project.id}
                               showResolved={showResolved}/>
                }
            </Paper>
        </Container>
    </>)
}