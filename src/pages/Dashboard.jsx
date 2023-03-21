import {Card, Container, Stack, Typography} from "@mui/material";
import {ProjectsTable} from "../components/ProjectsTable.jsx";
import {Project} from "./Project.jsx";
import {useEffect, useState} from "react";
import {NewProjectFormModal} from "../components/NewProjectFormModal.jsx";
import {db} from "../firebase-config";
import {getDocs, collection} from "firebase/firestore";

export const Dashboard = () => {
    const [chosenProject, chooseProject] = useState(null);

    const [projectList, setProjectList] = useState([]);
    const projectCollectionRef = collection(db, "projects");
    const getProjectList = async () => {
        try {
            const data = await getDocs(projectCollectionRef);
            const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id,}));
            setProjectList(filteredData);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getProjectList().then(r => 0);
    }, []);

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
                                <NewProjectFormModal collectionRef={projectCollectionRef}
                                                     getProjectList={getProjectList}/>
                            </Stack>
                            <ProjectsTable projects={projectList} chooseProject={chooseProject}/>
                        </Card>
                    </Container>
            }
        </>
    )
}