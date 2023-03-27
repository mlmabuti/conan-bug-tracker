import {useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Stack} from "@mui/material";
import {db} from '../firebase-config';
import {doc, updateDoc} from "firebase/firestore";

const style = {
    position: 'absolute',
    width: '40%',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 10,
    p: 4,

};

export const DescriptionModal = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [toggleMarkAsResolved, setToggleMarkAsResolved] = useState("contained");
    const [toggleDeleteTicket, setToggleDeleteTicket] = useState("outlined")

//    useEffect(() => {
//        if (auth.currentUser.uid === props.project.userId) {
//            setToggleMarkAsResolved("contained");
//            setToggleDeleteTicket("outlined")
//        }
//    }, [])

    const getTicketIndex = () => {
        for (let i = 0; i < props.allTickets.length; i++) {
            if (props.ticket === props.allTickets[i]) {
                return i;
            }
        }
    }
    const excludeTicket = (index) => {
        let newTickets = [];
        for (let i = 0; i < props.allTickets.length; i++) {
            if (i !== index) {
                newTickets.push(props.allTickets[i])
            }
        }
        return newTickets;
    }

    const deleteTicket = async (index) => {
        const projectDoc = doc(db, "projects", props.projectId)

            await updateDoc(projectDoc, {
                tickets: [...excludeTicket(index)]
            });
            props.getTicketList();
    }

    const updateTickets = (index) => {
        let updatedTickets = [];

        for (let i = 0; i < props.allTickets.length; i++) {
            if (i === index) {
                props.allTickets[i].status = "Resolved"
            }
            updatedTickets.push(props.allTickets[i])
        }
        return updatedTickets;
    }

    const markTicketAsResolved = async (index) => {
        const projectDoc = doc(db, "projects", props.projectId);
            await updateDoc(projectDoc, {
                tickets: [...updateTickets(index)]
            })
            props.getTicketList();
    }

    return (<div>
            <Button size="large" color="info" onClick={handleOpen}>{props.ticket.ticketTitle}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h5" component="h2">
                        {props.ticket.ticketTitle}
                    </Typography>
                    <Typography sx={{my: 2}}>
                        {props.ticket.description}
                    </Typography>
                    <hr/>
                    <Stack spacing={1}>
                        <Typography>
                            {"Ticket Author: " + props.ticket.ticketAuthor}
                        </Typography>
                        <Typography>
                            {"Assignee: " + props.ticket.assignee}
                        </Typography>
                        <Typography>
                            {"Priority: " + props.ticket.priority}
                        </Typography>
                        <Typography>
                            {"Label: " + props.ticket.label}
                        </Typography>
                        <Typography>
                            {"Status: " + props.ticket.status}
                        </Typography>

                        {props.ticket.status !== 'Resolved' ? <>
                            <Typography>
                                {"Due: " + props.ticket.due}
                            </Typography>
                            <Button variant={toggleMarkAsResolved} onClick={() => markTicketAsResolved(getTicketIndex()) }
                                    color="success" sx={{mt: 2}}>
                                Mark as resolved
                            </Button>
                            <Button variant={toggleDeleteTicket} onClick={() => deleteTicket(getTicketIndex())}
                                    color="error"
                                    sx={{mt: 2}}>
                                Delete Ticket
                            </Button>
                        </> :
                            <>
                            <Button variant={toggleDeleteTicket} onClick={() => deleteTicket(getTicketIndex())}
                                    color="error"
                                    sx={{mt: 2}}>
                                Delete Ticket
                            </Button>
                            </>
                        }
                    </Stack>
                </Box>
            </Modal>
        </div>);
}