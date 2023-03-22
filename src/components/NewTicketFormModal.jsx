import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useState} from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {TextField} from "@mui/material";
import {getDoc, updateDoc} from "firebase/firestore";

const style = {
    position: 'absolute',
    width: '40%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 10,
    p: 4,
};

export const NewTicketFormModal = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [newAssignee, setNewAssignee] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newDue, setNewDue] = useState("");
    const [newLabel, setNewLabel] = useState("");
    const [newPriority, setNewPriority] = useState("");
    const [newTicketAuthor, setNewTicketAuthor] = useState("SAMPLE");
    const [newTicketTitle, setNewTicketTitle] = useState("");


    const onSubmitTicket = async () => {
        if (newTicketTitle === "") {
            handleClose();
            return
        }

        try {
            const docSnap = await getDoc(props.projectRef);
            let oldTickets = docSnap.data().tickets;

            oldTickets = oldTickets.filter((e) => e.ticketTitle)

            await updateDoc(props.projectRef, {
                tickets: [...oldTickets, {
                    ticketTitle: newTicketTitle,
                    ticketAuthor: newTicketAuthor,
                    priority: newPriority,
                    label: newLabel,
                    due: newDue,
                    description: newDescription,
                    assignee: newAssignee,
                    status: "Unresolved"
                }]
            });
        } catch (e) {
            console.error(e);
        }
        props.getTicketList();

        setNewAssignee("");
        setNewTicketAuthor("");
        setNewLabel("");
        setNewDue("");
        setNewDescription("");
        setNewTicketTitle("");

        handleClose();
    }

    return (<>
            <Button onClick={handleOpen} variant="contained">
                <AddCircleIcon/>
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" sx={{my: 2}}>
                        Create New Ticket
                    </Typography>
                    <TextField fullWidth required label="Ticket Name"
                               onChange={(e) => setNewTicketTitle(e.target.value)} sx={{mt: 1}}/>
                    <TextField fullWidth required multiline rows={3}
                               onChange={(e) => setNewDescription(e.target.value)}
                               label="Description" sx={{mt: 1}}/>
                    <TextField fullWidth required label="Assignee" onChange={(e) => setNewAssignee(e.target.value)}
                               sx={{mt: 1}}/>
                    <TextField fullWidth required label="Priority" onChange={(e) => setNewPriority(e.target.value)}
                               sx={{mt: 1}}/>
                    <TextField fullWidth required label="Label" onChange={(e) => setNewLabel(e.target.value)}
                               sx={{mt: 1}}/>
                    <TextField fullWidth required label="Due Date" onChange={(e) => setNewDue(e.target.value)}
                               sx={{mt: 1}}/>

                    <Button fullWidth variant="contained" color="primary" sx={{mt: 1}} onClick={onSubmitTicket}>
                        Submit
                    </Button>
                </Box>
            </Modal>
        </>);
}