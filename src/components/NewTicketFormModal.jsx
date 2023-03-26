import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useState} from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {getDoc, updateDoc} from "firebase/firestore";
import {auth} from "../firebase-config.js";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
        let temp = dateTime.split(" ");
        let date = [];
        for (let i = 0; i < 4; i++) {
            date.push(temp[i])
        }
        return date[2] + " " + date[1] + ", " + date[3] + ". " + date[0].substring(0,3) + ".";
    }

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
                    ticketAuthor: auth.currentUser.displayName,
                    priority: newPriority,
                    label: newLabel,
                    due: extractDate(newDue.toString()),
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
        setNewLabel("");
        setNewDue(null);
        setNewDescription("");
        setNewTicketTitle("");

        handleClose();
    }

    return (<>
            <Button onClick={handleOpen} variant={props.toggleDisable}>
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


                    <TextField fullWidth required label="Ticket Name" inputProps={{ maxLength: 64 }}
                               placeholder="The maximum character limit is 64"
                               onChange={(e) => setNewTicketTitle(e.target.value)} sx={{mt: 1}}/>
                    <TextField fullWidth required multiline rows={3}
                               inputProps={{ maxLength: 256 }}
                               placeholder="The maximum character limit is 256"
                               onChange={(e) => setNewDescription(e.target.value)}
                               label="Description" sx={{mt: 2}}/>
                    <TextField fullWidth required label="Assignee" inputProps={{ maxLength: 80 }}
                               placeholder="E.g. Richard Hendricks, Bertram Gilfoyle, Jared Dunn"
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

                    <TextField required label="Label" inputProps={{ maxLength: 32 }}
                               placeholder="E.g. Issue, Bug, Enhancement, Documentation, Optional, and etc." onChange={(e) => setNewLabel(e.target.value)}
                               sx={{mt: 2}}/>

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