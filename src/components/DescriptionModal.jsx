import {useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Stack} from "@mui/material";

const style = {
    position: 'absolute',
    top: '35%',
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

    return (
        <div>
            <Button onClick={handleOpen}>{props.ticket.ticketTitle}</Button>
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
                    <Typography sx={{ my: 2}}>
                        {props.ticket.description}
                    </Typography>
                    <hr/>
                    <Stack spacing={1}>
                    <Typography >
                        {"Ticket Author: " + props.ticket.author}
                    </Typography>
                    <Typography >
                        {"Assignee: " + props.ticket.assignee}
                    </Typography>
                    <Typography >
                        {"Priority: " + props.ticket.priority}
                    </Typography>
                    <Typography >
                        {"Label: " + props.ticket.label}
                    </Typography>
                {
                    props.ticket.status !== 'Resolved' ?
                        <>
                            <Typography >
                            {"Due: " + props.ticket.due}
                        </Typography>
                        <Button variant="contained" sx={{mt:2}} >
                            Mark as resolved
                        </Button>
                        </>
                    :
                    false
                    }
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}