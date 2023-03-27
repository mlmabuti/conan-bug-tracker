import {Button, List, Popover, ListItemText, ListItem} from "@mui/material";
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

    return (<>
            <Button aria-describedby={id} onClick={handleClick}>
                <PeopleAlt/>
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
                    <List>
                        {
                            props.members.map((e) => (
                                <ListItem>
                                <ListItemText primary={e}/>
                                </ListItem>
                            ))
                        }
                    </List>
            </Popover>
        </>)
}