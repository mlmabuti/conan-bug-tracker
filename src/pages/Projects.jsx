import {Button, Container, Stack, Typography, Paper, ButtonGroup, Popover} from "@mui/material";
import {TicketsTable} from "../components/TicketsTable"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {PeopleAlt} from "@mui/icons-material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useState} from "react";
import {MembersPopover} from "../components/MembersPopover.jsx";

export const Projects = (props) => {
    const [showResolved, setShowResolved] = useState(false);
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
                            <ButtonGroup variant="outlined">
                                <Button color="primary">
                                    <AddCircleIcon/>
                                </Button>

                                <MembersPopover members={props.project.members}/>

                                <Button color="warning" onClick={() =>
                                    props.chooseProject(null)}>
                                    <ArrowBackIcon/>
                                </Button>
                            </ButtonGroup>
                        </Stack>
                    </Stack>

                    <TicketsTable project={props.project} showResolved={showResolved}/>

                </Paper>
            </Container>
        </>
    )
}