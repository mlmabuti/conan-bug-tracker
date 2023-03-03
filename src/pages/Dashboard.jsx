import {Button, Card, Container, Stack, Typography} from "@mui/material";
import {ProjectsTable} from "../components/ProjectsTable.jsx";
import {projectList} from "../assets/sample-projects.js";
import {Projects} from "./Projects.jsx";
import {useState} from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {NewProjectModal} from "../components/NewProjectModal.jsx";

export const Dashboard = () => {
    const [chosenProject, chooseProject] = useState(null);
    return (
        <>
            {
                chosenProject ?
                    <Projects project={chosenProject} chooseProject={chooseProject}/>
                    :
                    <Container maxWidth="lg">
                        <Card sx={{p: 4, m: 6}} elevation={2}>
                            <Stack direction="row"
                                   alignItems="center"
                                   justifyContent="space-between"
                                   sx={{mb: 3}}
                            >
                                <Typography variant="h4">{`Projects`}</Typography>
                                <NewProjectModal/>
                            </Stack>
                            <ProjectsTable projects={projectList} chooseProject={chooseProject}/>
                        </Card>
                    </Container>
            }
        </>
    )
}