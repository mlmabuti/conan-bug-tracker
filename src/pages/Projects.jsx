import {Button, Container, Stack, Typography, Paper, Tab, Tabs, ButtonGroup} from "@mui/material";
import {TicketsTable} from "../components/TicketsTable"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {PeopleAlt} from "@mui/icons-material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoneIcon from "@mui/icons-material/Done";
export const Projects = (props) => {
    return (
        <>
            <Container maxWidth="lg">
                    <Paper sx={{p:4, m:6}} >
                    <Stack
                        sx={{mb:3}}
                        direction="row"
                    justifyContent="space-between"
                    >
                        <Typography variant="h4">
                            {props.project.title}
                        </Typography>

                        <Stack
                            direction="row"
                        spacing={2}>
                            <Button color="success" variant="outlined">
                                <DoneIcon/>
                                Resolved
                            </Button>
                            <ButtonGroup variant="outlined">
                                <Button color="primary" >
                                    <AddCircleIcon/>
                                </Button>
                                <Button color="info" >
                                    <PeopleAlt/>
                                </Button>
                                <Button color="warning" onClick={() =>
                                props.chooseProject(null)}>
                                    <ArrowBackIcon/>
                                </Button>
                            </ButtonGroup>
                        </Stack>
                    </Stack>
                <TicketsTable project={props.project}/>
                </Paper>
            </Container>
        </>
    )
}