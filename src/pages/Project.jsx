import {Button, Container, Stack, Typography, Paper, ButtonGroup} from "@mui/material";
import {TicketsTable} from "../components/TicketsTable"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useEffect, useState} from "react";
import {MembersPopover} from "../components/MembersPopover.jsx";
import {NewTicketFormModal} from "../components/NewTicketFormModal.jsx";
import {db} from "../firebase-config";
import {doc, getDoc} from "firebase/firestore";


export const Project = (props) => {
    const [showResolved, setShowResolved] = useState(false);

    // GET TICKET LIST INSTEAD OF PROJECT LIST
    const projectRef = doc(db, "projects", props.project.id)
    const [ticketList, setTicketList] = useState([]);

    const getTicketList = async () => {
        try {
            const docSnap = await getDoc(projectRef);
            const tickets = docSnap.data().tickets;
            setTicketList(tickets);
            console.log(tickets);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getTicketList().then(r => 0);
    }, [])

    return (<>
        <Container maxWidth="lg">
            <Paper sx={{p: 4, m: 6}}>
                <Stack
                    sx={{mb: 3}}
                    direction="row"
                    justifyContent="space-between"
                >
                    <Typography variant="h4">
                        {props.project.title}
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={2}>
                        <Button color="primary" variant="text"
                                onClick={() => showResolved ? setShowResolved(false) : setShowResolved(true)}>
                            {showResolved ? 'Show Unresolved' : 'Show Resolved'}
                        </Button>
                        <ButtonGroup variant="contained">

                            <NewTicketFormModal getTicketList={getTicketList} projectRef={projectRef}/>

                            <MembersPopover members={props.project.members}/>

                            <Button color="warning" onClick={() => props.chooseProject(null)}>
                                <ArrowBackIcon/>
                            </Button>
                        </ButtonGroup>
                    </Stack>
                </Stack>

                {<TicketsTable tickets={ticketList} getTicketList={getTicketList} projectId={props.project.id}
                               showResolved={showResolved}/>}

            </Paper>
        </Container>
    </>)
}