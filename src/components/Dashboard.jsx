import { Container } from "@mui/material";
import {ProjectsList} from "./ProjectsList.jsx";

export const Dashboard = () => {
    return (
        <>
            <Container maxWidth="lg">
                <ProjectsList/>
            </Container>
        </>
    )
}