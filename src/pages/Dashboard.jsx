import {Button, Box, Card, CircularProgress, Container, Stack, Typography} from "@mui/material";
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
    const [isLoading, setIsLoading] = useState(false);
    const projectCollectionRef = collection(db, "projects");
    const getProjectList = async () => {
        setIsLoading(true)
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
        setIsLoading(false)
    };

    useEffect(() => {
        getProjectList()
    }, []);

    return (<>
        {chosenProject ?
            <Project project={chosenProject} getProjectList={getProjectList} chooseProject={chooseProject}/> :
            <Container maxWidth="lg">
                <Card sx={{p: 4, m: 6}} elevation={2}>
                    <Stack direction="row"
                           alignItems="center"
                           justifyContent="space-between"
                           sx={{mb: 3}}
                    >
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="h4">Projects | </Typography>
                            <Typography
                                variant="h6">{`Logged in as ${auth.currentUser.displayName.substring(0, auth.currentUser.displayName.indexOf(' '))}`}</Typography>
                        </Stack>
                        <Stack direction="row">

                            <NewProjectFormModal collectionRef={projectCollectionRef}
                                                 getProjectList={getProjectList}/>

                            <Button sx={{mx: 1}} onClick={getProjectList} variant="outlined">
                                <RefreshIcon/>
                            </Button>

                        </Stack>
                    </Stack>
                    {
                        isLoading ?
                            <CircularProgress/> :
                            <ProjectsTable projects={projectList} chooseProject={chooseProject}/>
                    }
                </Card>
            </Container>}
    </>)
}