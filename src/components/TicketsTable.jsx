import {
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from "@mui/material";

import {DescriptionModal} from "./DescriptionModal.jsx";

export const TicketsTable = (props) => {
    const resolvedTickets = props.tickets.filter(ticket => ticket.status === 'Resolved');
    const unresolvedTickets = props.tickets.filter(ticket => ticket.status !== 'Resolved' && ticket.ticketTitle);

    return (<TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h6" sx={{px: 1}}>
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
                                Assignee
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {props.showResolved ? resolvedTickets.map((ticket) => <TableRow key={ticket.ticketTitle}>
                            <TableCell>
                                <DescriptionModal ticket={ticket} project={props.project} projectId={props.projectId}/>
                            </TableCell>
                            <TableCell>
                                <Typography>{ticket.priority}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>{ticket.assignee}</Typography>
                            </TableCell>
                        </TableRow>) :

                        unresolvedTickets.map((ticket) => <TableRow key={ticket.ticketTitle}>
                            <TableCell>
                                <DescriptionModal project={props.project} allTickets={props.tickets} getTicketList={props.getTicketList}
                                                  tickets={unresolvedTickets} ticket={ticket}
                                                  projectId={props.projectId}/>
                            </TableCell>
                            <TableCell>
                                <Typography>{ticket.priority}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>{ticket.assignee}</Typography>
                            </TableCell>
                        </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>)
}
