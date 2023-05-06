import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useState} from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {getDoc, updateDoc} from "firebase/firestore";
import {auth} from "../firebase-config.js";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

const style = {
    position: 'absolute',
    width: '30%',
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
    const [newDue, setNewDue] = useState(null);
    const [newLabel, setNewLabel] = useState("");
    const [newPriority, setNewPriority] = useState("");
    const [newTicketTitle, setNewTicketTitle] = useState("");

    const extractDate = (dateTime) => {
        const date = dateTime.split(" ");
        return date[2] + " " + date[1] + ", " + date[3] + ". " + date[0].substring(0, 3) + ".";
    }

    const onSubmitTicket = async () => {
        if (newTicketTitle === "") {
            handleClose();
            return
        }

        try {
            const docSnap = await getDoc(props.projectRef);
            let oldTickets = docSnap.data().tickets;
            let isDuplicateTitle = false;

            oldTickets.map((t) => {
                if (t.ticketTitle === newTicketTitle) {
                    isDuplicateTitle = true;
                }
            })

            if (isDuplicateTitle || !newAssignee || !newDue || !newLabel || !newPriority || !newTicketTitle) {
                return
            }

            oldTickets = oldTickets.filter((e) => e.ticketTitle)

            function getUsernameFromEmail(m) {
                let username = m.substring(0, m.indexOf("@")); // get the part before the @ sign
                username = username.toLowerCase().replace(/\b\w/g, function (c) {
                    // convert the first letter of each word to uppercase
                    return c.toUpperCase();
                }).replace(/\./g, " "); // replace dots with spaces
                return username;
            }

            const currentDate = new Date();

            function generateTicketId() {
                let random = Math.floor(Math.random() * 1000);
                return currentDate.getTime().toString() + random.toString();
            }

            await updateDoc(props.projectRef, {
                tickets: [...oldTickets, {
                    ticketTitle: newTicketTitle,
                    ticketAuthor: getUsernameFromEmail(auth.currentUser.email),
                    priority: newPriority,
                    label: newLabel,
                    due: extractDate(newDue.toString()),
                    description: newDescription,
                    assignee: newAssignee,
                    status: "Unresolved",
                    lastModified: currentDate.toLocaleString(),
                    lastModifiedBy: getUsernameFromEmail(auth.currentUser.email),
                    ticketId: generateTicketId(),
                }]
            });
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
        <Button onClick={handleOpen} variant="outlined" color="primary">
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
                <FormControl required fullWidth>

                    <TextField fullWidth required label="Ticket Name (Must not be a duplicate)"
                               inputProps={{maxLength: 42}}
                               placeholder="The maximum character limit is 42"
                               onChange={(e) => setNewTicketTitle(e.target.value)} sx={{mt: 1}}/>
                    <TextField fullWidth multiline rows={3}
                               inputProps={{maxLength: 256}}
                               placeholder="The maximum character limit is 256"
                               onChange={(e) => setNewDescription(e.target.value)}
                               label="Description" sx={{mt: 2}}/>

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

                    <FormControl fullWidth sx={{mt: 2}}>
                        <InputLabel id="input-priority-label">Priority</InputLabel>
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
                        <InputLabel id="input-assignee-label">Assignee</InputLabel>
                        <Select
                            label="Assignee"
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

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker sx={{mt: 2}} label="Due Date*" value={newDue} onChange={(e) => {
                            setNewDue(e);
                        }}
                        />
                    </LocalizationProvider>

                    <Button fullWidth variant="contained" color="primary" sx={{mt: 2}}
                            onClick={onSubmitTicket}>
                        Submit
                    </Button>
                </FormControl>
            </Box>
        </Modal>
    </>);
}