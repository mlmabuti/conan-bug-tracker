import {
    Paper,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

export const TicketsTable = (props) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h6" sx={{px:1}}>
                                Ticket Name
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h6">
                                Priority
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
                    {
                        props.project.tickets.map( (ticket) =>
                        <TableRow>
                            <TableCell>
                                <Button variant="text" color="info">{ticket.ticketTitle}</Button>
                            </TableCell>
                            <TableCell>
                                <Typography>{ticket.priority}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>{ticket.author}</Typography>
                            </TableCell>
                        </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

// {props.projects.map( (project) =>
//    <TableRow>
//        <TableCell>
//            <Button variant="text" color="info" onClick={
//                () => props.chooseProject(project)
//            }>
//                {project.title}
//            </Button>
//        </TableCell>
//        <TableCell>
//            <Typography>
//                {project.author}
//            </Typography>
//        </TableCell>
//    </TableRow>
//)
//}
