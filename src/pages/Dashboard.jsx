import {Button, Card, Container, Stack, Typography} from "@mui/material";
import {ProjectsTable} from "../components/ProjectsTable.jsx";
import {Project} from "./Project.jsx";
import {useEffect, useState} from "react";
import {NewProjectFormModal} from "../components/NewProjectFormModal.jsx";
import {auth, db} from "../firebase-config";
import {getDocs, collection} from "firebase/firestore";
import RefreshIcon from '@mui/icons-material/Refresh';

export const Dashboard = () => {
    const [chosenProject, chooseProject] = useState(null);

    const [projectList, setProjectList] = useState([]);
    const projectCollectionRef = collection(db, "projects");
    const getProjectList = async () => {
        try {
            const data = await getDocs(projectCollectionRef);
            let filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id,}));
            filteredData = filteredData.filter((e) => {
                return auth.currentUser.uid === e.userId || e.members.includes(auth.currentUser.email)
            })
            setProjectList(filteredData);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getProjectList()
    }, []);

    return (<>
            {chosenProject ? <Project project={chosenProject} getProjectList={getProjectList} chooseProject={chooseProject}/> :
                <Container maxWidth="lg">
                    <Card sx={{p: 4, m: 6}} elevation={2}>
                        <Stack direction="row"
                               alignItems="center"
                               justifyContent="space-between"
                               sx={{mb: 3}}
                        >
                            <Typography variant="h4">{`Projects`}</Typography>
                            <Stack direction="row">



                                <NewProjectFormModal collectionRef={projectCollectionRef}
                                                     getProjectList={getProjectList}/>

                                <Button sx={{mx:1}} onClick={getProjectList} color="success" variant="contained">
                                    <RefreshIcon/>
                                </Button>

                            </Stack>
                        </Stack>
                        <ProjectsTable projects={projectList} chooseProject={chooseProject}/>
                    </Card>
                </Container>}
        </>)
}