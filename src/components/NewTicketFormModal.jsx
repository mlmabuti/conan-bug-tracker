import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useState} from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {TextField} from "@mui/material";

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

export const NewTicketFormModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
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

                    <TextField fullWidth required label="Ticket Name" sx={{mt: 1}}/>
                    <TextField fullWidth required multiline rows={3} label="Description" sx={{mt: 1}}/>
                    <TextField fullWidth required label="Assignee" sx={{mt: 1}}/>
                    <TextField fullWidth required label="Priority" sx={{mt: 1}}/>
                    <TextField fullWidth required label="Label" sx={{mt: 1}}/>
                    <TextField fullWidth required label="Due Date" sx={{mt: 1}}/>

                    <Button fullWidth variant="contained" color="primary" sx={{mt: 1}} onClick={() =>
                        handleClose()
                    }>
                        Submit
                    </Button>
                </Box>
            </Modal>
        </>
    );
}