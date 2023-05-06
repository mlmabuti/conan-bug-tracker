import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useState} from "react";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {doc, updateDoc} from "firebase/firestore";
import {auth, db} from "../firebase-config.js";

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
    const oldTickets = props.allTickets;
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
        const currentDate = new Date();

        function getUsernameFromEmail(m) {
            let username = m.substring(0, m.indexOf("@")); // get the part before the @ sign
            username = username.toLowerCase().replace(/\b\w/g, function (c) {
                // convert the first letter of each word to uppercase
                return c.toUpperCase();
            }).replace(/\./g, " "); // replace dots with spaces
            return username;
        }

        for (let i = 0; i < props.allTickets.length; i++) {
            if (i === index) {
                props.allTickets[i].assignee = newAssignee;
                props.allTickets[i].description = newDescription;
                props.allTickets[i].due = newDue;
                props.allTickets[i].label = newLabel;
                props.allTickets[i].priority = newPriority;
                props.allTickets[i].ticketTitle = newTicketTitle;
                props.allTickets[i].lastModified = currentDate.toLocaleString();
                props.allTickets[i].lastModifiedBy = getUsernameFromEmail(auth.currentUser.email);
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

        if (!newAssignee || !newDue || !newLabel || !newPriority || !newTicketTitle) {
            return
        }

        try {
            const projectDoc = doc(db, "projects", props.projectId);
            await updateDoc(projectDoc, {
                tickets: [...updateTickets(getTicketIndex())]
            })
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
                    <TextField fullWidth required label="Ticket Name (Must not be a duplicate)"
                               inputProps={{maxLength: 42}}
                               placeholder="The maximum character limit is 42" value={newTicketTitle}
                               onChange={(e) => setNewTicketTitle(e.target.value)} sx={{mt: 1}}/>
                    <TextField fullWidth required multiline rows={3}
                               inputProps={{maxLength: 256}}
                               value={newDescription}
                               placeholder="The maximum character limit is 256"
                               onChange={(e) => setNewDescription(e.target.value)}
                               label="Description" sx={{mt: 2}}/>
                    <FormControl fullWidth sx={{mt: 2}}>
                        <InputLabel id="input-assignee-label">Assignee</InputLabel>
                        <Select
                            label={newAssignee}
                            labelId="input-assignee-label"
                            id="input-assignee"
                            value={newAssignee}
                            onChange={(e) => setNewAssignee(e.target.value)}
                        >
                            {
                                props.members.map((m) => (
                                    <MenuItem key={m.length + 1}
                                              value={m.substring(0, m.indexOf("@")).toLowerCase().replace(/\b\w/g, function (c) {
                                                  return c.toUpperCase();
                                              }).replace(/\./g, " ")}>{m.substring(0, m.indexOf("@")).toLowerCase().replace(/\b\w/g, function (c) {
                                        // convert the first letter of each word to uppercase
                                        return c.toUpperCase();
                                    }).replace(/\./g, " ")}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

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

                    <FormControl fullWidth sx={{mt: 2}}>
                        <InputLabel id="input-label-label">Label </InputLabel>
                        <Select
                            label="Label"
                            labelId="input-label-label"
                            id="input-label"
                            value={newLabel}
                            onChange={(e) => setNewLabel(e.target.value)}
                        >
                            <MenuItem value={"Issue"}>Issue</MenuItem>
                            <MenuItem value={"Enhancement"}>Enhancement</MenuItem>
                            <MenuItem value={"Task"}>Task</MenuItem>
                            <MenuItem value={"Documentation"}>Documentation</MenuItem>
                            <MenuItem value={"Optional"}>Optional</MenuItem>
                            <MenuItem value={"Others"}>Others</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField inputProps={{maxLength: 32}}
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