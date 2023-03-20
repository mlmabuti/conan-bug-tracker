import {Button, Container, Stack, Typography, Paper, ButtonGroup} from "@mui/material";
import {TicketsTable} from "../components/TicketsTable"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useEffect, useState} from "react";
import {MembersPopover} from "../components/MembersPopover.jsx";
import {NewTicketFormModal} from "../components/NewTicketFormModal.jsx";
import { db } from "../firebase-config";
import { getDocs, collection } from "firebase/firestore";

export const Project = (props) => {
    const [showResolved, setShowResolved] = useState(false);

    // GET TICKET LIST INSTEAD OF PROJECT LIST

    return (
        <>
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
                            <Button color="primary" variant="text" onClick={() =>
                                showResolved ? setShowResolved(false) : setShowResolved(true)
                            }>
                                {showResolved ? 'Show Unresolved' : 'Show Resolved'}
                            </Button>
                            <ButtonGroup variant="contained">

                                <NewTicketFormModal />

                                <MembersPopover members={props.project.members}/>

                                <Button color="warning" onClick={() =>
                                    props.chooseProject(null)}>
                                    <ArrowBackIcon/>
                                </Button>
                            </ButtonGroup>
                        </Stack>
                    </Stack>

                    {
                        props.project.tickets ?
                            <TicketsTable project={props.project} showResolved={showResolved}/>
                            :
                            <>
                            <hr/>
                            <Typography variant="h6">You have no available tickets for this project.</Typography>
                            </>
                    }

                </Paper>
            </Container>
        </>
    )
}