import {
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from "@mui/material";

import {DescriptionModal} from "./DescriptionModal.jsx";

export const TicketsTable = (props) => {
    let resolvedTickets = props.tickets.filter(ticket => ticket.status === 'Resolved');
    let unresolvedTickets = props.tickets.filter(ticket => ticket.status !== 'Resolved' && ticket.ticketTitle);
    try {
        if (props.search) {
            const filteredResolvedTickets = resolvedTickets.filter((ticket) => {
                return ticket.ticketTitle.toLowerCase().includes(props.search.toLowerCase()) ||
                    ticket.priority.toLowerCase().includes(props.search.toLowerCase()) ||
                    ticket.assignee.toLowerCase().includes(props.search.toLowerCase()) ||
                    ticket.due.toLowerCase().includes(props.search.toLowerCase()) ||
                    ticket.label.toLowerCase().includes(props.search.toLowerCase()) ||
                    ticket.lastModified.toLowerCase().includes(props.search.toLowerCase()) ||
                    ticket.ticketAuthor.toLowerCase().includes(props.search.toLowerCase())


            })
            const filteredUnresolvedTickets = unresolvedTickets.filter((ticket) => {
                return ticket.ticketTitle.toLowerCase().includes(props.search.toLowerCase()) ||
                    ticket.priority.toLowerCase().includes(props.search.toLowerCase()) ||
                    ticket.assignee.toLowerCase().includes(props.search.toLowerCase()) ||
                    ticket.due.toLowerCase().includes(props.search.toLowerCase()) ||
                    ticket.label.toLowerCase().includes(props.search.toLowerCase()) ||
                    ticket.lastModified.toLowerCase().includes(props.search.toLowerCase()) ||
                    ticket.ticketAuthor.toLowerCase().includes(props.search.toLowerCase())

            })

            if (props.search && props.showResolved) {
                resolvedTickets = filteredResolvedTickets;
            } else if (props.search && !props.showResolved) {
                unresolvedTickets = filteredUnresolvedTickets;
            }
        }
    } catch (e) {
        console.error(e);
    }

    return (<TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            {
                                props.showResolved ?
                            <Typography variant="h6" sx={{px: 1}}>
                                Resolved Tickets
                            </Typography> :
                            <Typography variant="h6" sx={{px: 1}}>
                                Unresolved Tickets
                            </Typography>
                            }
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
                        <TableCell>
                            <Typography variant="h6">
                                Last Modified
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {props.showResolved ? resolvedTickets.reverse().map((ticket) =>
                            <TableRow key={ticket.ticketTitle}>
                            <TableCell>
                                <DescriptionModal currentUser={props.currentUser} allTickets={props.tickets} ticket={ticket} project={props.project}
                                                  getTicketList={props.getTicketList} projectId={props.projectId}/>
                            </TableCell>
                            <TableCell>
                                <Typography>{ticket.priority}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>{ticket.assignee}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>{ticket.lastModified}</Typography>
                            </TableCell>
                        </TableRow>
                        ) :
                        unresolvedTickets.sort((a, b) => {
                            const priorities = ['Very High', 'High', 'Medium', 'Low'];
                            return priorities.indexOf(b.priority) - priorities.indexOf(a.priority);
                        }).reverse().map((ticket) => <TableRow key={ticket.ticketTitle}>
                            <TableCell>
                                <DescriptionModal onTicketStatusChange={props.onTicketStatusChange} currentUser={props.currentUser} project={props.project} allTickets={props.tickets} getTicketList={props.getTicketList}
                                                  tickets={unresolvedTickets} ticket={ticket}
                                                  projectId={props.projectId}/>
                            </TableCell>
                            <TableCell>
                                <Typography>{ticket.priority}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>{ticket.assignee}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>{ticket.lastModified}</Typography>
                            </TableCell>
                        </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>)
}
