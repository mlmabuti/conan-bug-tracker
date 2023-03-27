import {Box, Button, Popover, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";

export const DeletePopover = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (<>
        <Button size="small" disableRipple={true} disableElevation={true} disableFocusRipple={true} color="error" variant={props.toggleDisable} onClick={handleClick}>
            <DeleteIcon sx={{width: "20px"}}/>
        </Button>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom', horizontal: 'left',
                }}
            >
                <Box textAlign="center" sx={{p:1}}>

                <Typography sx={{m: 1}}>Are you sure you want to delete this project?</Typography>
                <Button variant="outlined" sx={{mx:.5}} color="error" onClick={() => props.deleteProject(props.project.id)}>
                    Yes
                </Button>
                <Button variant="contained" sx={{mx:.5}} color="success" onClick={handleClose}>
                    No
                </Button>
                </Box>

            </Popover>
        </>)
}