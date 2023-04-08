import {Button, List, Popover, ListItemText, ListItem} from "@mui/material";
import {PeopleAlt} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {EditMembersModal} from "./EditMembersModal.jsx";
import {getDoc} from "firebase/firestore";
import {auth} from "../firebase-config.js";

export const MembersPopover = (props) => {
    const [membersList, setMembersList] = useState([]);
    const [toggleEditMembers, setToggleEditMembers] = useState("disabled");
    const getMembersList = async () => {
        try {
            const docSnap = await getDoc(props.projectRef);
            const members = docSnap.data().members;
            setMembersList(members);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        setToggleEditMembers(auth.currentUser.uid === props.project.userId ? "outlined" : "disabled" )
        getMembersList()
    }, [])

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
                            membersList.map((e) => (
                                <ListItem>
                                <ListItemText primary={e}/>
                                </ListItem>
                            ))
                        }

                        <ListItem>
                            <EditMembersModal toggleEditMembers={toggleEditMembers} projectRef={props.projectRef} getMembersList={getMembersList} members={membersList}/>
                        </ListItem>
                    </List>
            </Popover>
        </>)
}