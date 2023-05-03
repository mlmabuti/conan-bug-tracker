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

const date = new Date();

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

export const Project = (props) => {
    const [toggleDisable, setToggleDisable] = useState("disabled")
    const [showResolved, setShowResolved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const projectRef = doc(db, "projects", props.project.id)
    const [ticketList, setTicketList] = useState([]);

    const [progress, setProgress] = useState(0);
    const [tickets, setTickets] = useState(props.project.tickets)

    const countResolved = () => {
        let ctr = 0;

        for (let i = 0; i < tickets.length; i++) {
            if (tickets[i].status === "Resolved") {
                ctr++;
            }
        }
        return ctr;
    }

    const [resolved, setResolved] = useState(countResolved());

    const getTicketList = async () => {
        setIsLoading(true)
        getProgress()
        try {
            const docSnap = await getDoc(projectRef);
            const tickets = docSnap.data().tickets;
            setTicketList(tickets);
            setTickets(tickets)
        } catch (e) {
            console.error(e);
        }
        setIsLoading(false)
    };

    const getProgress = () => {
        setResolved(countResolved())
        console.log(resolved)
        console.log("called")
        setProgress(resolved / tickets.length * 100);
    }

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

                <LinearProgressWithLabel sx={{mb:4, mt:3.5}} value={progress} />

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
                    <TicketsTable getProgress={getProgress} currentUser={auth.currentUser.displayName} tickets={ticketList} getTicketList={getTicketList} project={props.project} projectId={props.project.id}
                               showResolved={showResolved}/>
                }
            </Paper>
        </Container>
    </>)
}