import {Button, Container, Stack, Typography} from "@mui/material";
import {TicketsTable} from "../components/TicketsTable"

export const Projects = (props) => {
    return (
        <>
            <Container maxWidth="md">
                <Stack
                    alignItems="center"
                    direction="row"
                justifyContent="space-between"
                >
                    <Typography variant="h4" sx={{py:4}}>
                        {"Project: " + props.project.title}
                    </Typography>

                    <Button variant="outlined" color="warning" onClick={() =>
                    props.chooseProject(null)}>
                        Back
                    </Button>
                </Stack>

                <TicketsTable project={props.project}/>
            </Container>
        </>
    )
}