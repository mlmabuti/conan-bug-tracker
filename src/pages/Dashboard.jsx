import {Button, Card, Container, Stack, Typography} from "@mui/material";
import {ProjectsTable} from "../components/ProjectsTable.jsx";
import {projectList} from "../assets/sample-projects.js";
import {Project} from "./Project.jsx";
import {useState} from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {NewProjectFormModal} from "../components/NewProjectFormModal.jsx";

export const Dashboard = () => {
    const [chosenProject, chooseProject] = useState(null);
    return (
        <>
            {
                chosenProject ?
                    <Project project={chosenProject} chooseProject={chooseProject}/>
                    :
                    <Container maxWidth="lg">
                        <Card sx={{p: 4, m: 6}} elevation={2}>
                            <Stack direction="row"
                                   alignItems="center"
                                   justifyContent="space-between"
                                   sx={{mb: 3}}
                            >
                                <Typography variant="h4">{`Projects`}</Typography>
                                <NewProjectFormModal/>
                            </Stack>
                            <ProjectsTable projects={projectList} chooseProject={chooseProject}/>
                        </Card>
                    </Container>
            }
        </>
    )
}