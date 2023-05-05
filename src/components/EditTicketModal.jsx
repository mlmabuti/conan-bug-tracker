import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useState} from "react";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../firebase-config.js";

const currentDate = new Date();

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

export const EditTicketModal = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [newAssignee, setNewAssignee] = useState(props.ticket.assignee);
    const [newDescription, setNewDescription] = useState(props.ticket.description);
    const [newDue, setNewDue] = useState(props.ticket.due);
    const [newLabel, setNewLabel] = useState(props.ticket.label);
    const [newPriority, setNewPriority] = useState(props.ticket.priority);
    const [newTicketTitle, setNewTicketTitle] = useState(props.ticket.ticketTitle);

    const getTicketIndex = () => {
        for (let i = 0; i < props.allTickets.length; i++) {
            if (props.ticket === props.allTickets[i]) {
                return i;
            }
        }
    }

    const updateTickets = (index) => {
        let updatedTickets = [];

        for (let i = 0; i < props.allTickets.length; i++) {
            if (i === index) {
                props.allTickets[i].assignee = newAssignee;
                props.allTickets[i].description = newDescription;
                props.allTickets[i].due = newDue;
                props.allTickets[i].label = newLabel;
                props.allTickets[i].priority = newPriority;
                props.allTickets[i].ticketTitle = newTicketTitle;
                props.allTickets[i].lastModified = currentDate.toLocaleString();
                props.allTickets[i].lastModifiedBy = props.currentUser;
            }
            updatedTickets.push(props.allTickets[i])
        }
        return updatedTickets;
    }

    const onSubmitTicket = async () => {
        if (newTicketTitle === "") {
            handleClose();
            return
        }

        try {
            const projectDoc = doc(db, "projects", props.projectId);
            await updateDoc(projectDoc, {
                tickets: [...updateTickets(getTicketIndex())] })
            props.getTicketList();
        } catch (e) {
            console.error(e);
        }
        props.getTicketList();

        setNewAssignee("");
        setNewLabel("");
        setNewDue(null);
        setNewDescription("");
        setNewTicketTitle("");
        handleClose();
    }

    return (<>
        <Button onClick={handleOpen} color="primary">
            [EDIT]
        </Button>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2" sx={{my: 2}}>
                    Edit Ticket
                </Typography>
                <FormControl required fullWidth>
                    <TextField fullWidth required label="Ticket Name" inputProps={{ maxLength: 64 }}
                               placeholder="The maximum character limit is 64" value={newTicketTitle}
                               onChange={(e) => setNewTicketTitle(e.target.value) } sx={{mt: 1}}/>
                    <TextField fullWidth required multiline rows={3}
                               inputProps={{ maxLength: 256 }}
                               value={newDescription}
                               placeholder="The maximum character limit is 256"
                               onChange={(e) => setNewDescription(e.target.value) }
                               label="Description" sx={{mt: 2}}/>
                    <TextField fullWidth required inputProps={{ maxLength: 80 }}
                               placeholder="E.g. Richard Hendricks, Bertram Gilfoyle, Jared Dunn"
                               value={newAssignee}
                               onChange={(e) => setNewAssignee(e.target.value)}
                               sx={{mt: 2}}/>

                    <FormControl fullWidth sx={{mt: 2}}>
                        <InputLabel id="input-priority-label">Priority* </InputLabel>
                        <Select
                            label="Priority"
                            labelId="input-priority-label"
                            id="input-priority"
                            value={newPriority}
                            onChange={(e) => setNewPriority(e.target.value)}
                        >
                            <MenuItem value={"Very High"}>Very High</MenuItem>
                            <MenuItem value={"High"}>High</MenuItem>
                            <MenuItem value={"Medium"}>Medium</MenuItem>
                            <MenuItem value={"Low"}>Low</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField inputProps={{ maxLength: 32 }}
                               value={newLabel}
                               placeholder="E.g. Task, Issue, Bug, ptional, and etc." onChange={(e) => setNewLabel(e.target.value)}
                               sx={{mt: 2}}/>

                    <TextField inputProps={{ maxLength: 32 }}
                               value={newDue}
                               onChange={(e) => setNewDue(e.target.value)}
                               sx={{mt: 2}}/>

                    <Button fullWidth variant="contained" color="primary" sx={{mt: 2}}
                            onClick={onSubmitTicket}>
                        Submit
                    </Button>
                </FormControl>
            </Box>
        </Modal>
    </>);
}