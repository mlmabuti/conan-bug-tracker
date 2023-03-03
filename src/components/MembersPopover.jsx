import {Button, Popover, Typography} from "@mui/material";
import {PeopleAlt} from "@mui/icons-material";
import {useState} from "react";

export const MembersPopover = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Button aria-describedby={id} color="info" onClick={handleClick}>
                <PeopleAlt/>
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{p: 2}}>{props.members}</Typography>
            </Popover>
        </>
    )
}