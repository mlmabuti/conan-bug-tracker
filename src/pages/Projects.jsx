import {Button, Container, Stack, Typography, Paper} from "@mui/material";
import {TicketsTable} from "../components/TicketsTable"

export const Projects = (props) => {
    return (
        <>
            <Container maxWidth="lg">
                <Paper sx={{p:4, m:6}} >

                <Stack
                    sx={{mb:3}}
                    alignItems="center"
                    direction="row"
                justifyContent="space-between"
                >
                    <Typography variant="h4">
                        {props.project.title}
                    </Typography>

                    <Button variant="outlined" color="warning" onClick={() =>
                    props.chooseProject(null)}>
                        Back
                    </Button>
                </Stack>

                <TicketsTable project={props.project}/>
                </Paper>
            </Container>
        </>
    )
}