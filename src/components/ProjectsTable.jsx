import {
    Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from "@mui/material";

export const ProjectsTable = (props) => {
    return (<TableContainer component={Box}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Typography variant="h6" sx={{px: 1}}>
                            Title
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="h6">
                            No. of Tickets
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="h6">
                            Author
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {props.projects.map((project) => <TableRow key={project.title}>
                    <TableCell>
                        <Button size="large" variant="text" color="info" onClick={() => props.chooseProject(project)}>
                            {project.title}
                        </Button>
                    </TableCell>
                    <TableCell>
                        <Typography>
                            {project.tickets[0].ticketTitle === "" ? 0 : project.tickets.length}
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography>
                            {project.author}
                        </Typography>
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
    </TableContainer>)
}