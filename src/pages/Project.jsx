import {Button, Container, Stack, Typography, Paper, ButtonGroup,} from "@mui/material";
import {TicketsTable} from "../components/TicketsTable"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useEffect, useState} from "react";
import {MembersPopover} from "../components/MembersPopover.jsx";
import {NewTicketFormModal} from "../components/NewTicketFormModal.jsx";
import {auth, db} from "../firebase-config";
import {doc, deleteDoc, getDoc} from "firebase/firestore";
import {DeletePopover} from "../components/DeletePopover.jsx";

export const Project = (props) => {
    const [toggleDeleteDisable, setToggleDeleteDisable] = useState("disabled")
    const [toggleDisable, setToggleDisable] = useState("disabled")
    const [showResolved, setShowResolved] = useState(false);

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

    const deleteProject = async (id) => {
        const projectDoc = doc(db, "projects", id);
        await deleteDoc(projectDoc);
        props.getProjectList();
        props.chooseProject(null)
    }

    useEffect(() => {
        if (auth.currentUser.uid === props.project.userId) {
            setToggleDisable("contained")
            setToggleDeleteDisable("text")
        }
        getTicketList()

    }, [])

    return (<>
        <Container maxWidth="lg">
            <Paper sx={{p: 4, m: 6}}>
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
                    <DeletePopover toggleDisable={toggleDeleteDisable} deleteProject={deleteProject} project={props.project}/>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={2}>
                        <Button color="primary" variant="outlined"
                                onClick={() => showResolved ? setShowResolved(false) : setShowResolved(true)}>
                            {showResolved ? 'Show Unresolved' : 'Show Resolved'}
                        </Button>
                        <ButtonGroup variant="contained">

                            <NewTicketFormModal toggleDisable={toggleDisable} getTicketList={getTicketList} projectRef={projectRef}/>

                            <MembersPopover members={props.project.members}/>

                            <Button color="warning" onClick={() => props.chooseProject(null)}>
                                <ArrowBackIcon/>
                            </Button>
                        </ButtonGroup>
                    </Stack>
                </Stack>

                {<TicketsTable tickets={ticketList} getTicketList={getTicketList} project={props.project} projectId={props.project.id}
                               showResolved={showResolved}/>}
            </Paper>
        </Container>
    </>)
}