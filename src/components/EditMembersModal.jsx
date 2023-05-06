import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useState} from "react";
import {TextField} from "@mui/material";
import {updateDoc, getDoc} from "firebase/firestore";
import {auth} from "../firebase-config.js";

const style = {
    position: 'absolute',
    width: '40%',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 10,
    p: 4,
};

export const EditMembersModal = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [membersEmail, setMembersEmail] = useState([...props.members.filter((e) => e !== auth.currentUser.email), ""]);

    const getMembersList = async () => {
        try {
            props.getMembersList()
            const docSnap = await getDoc(props.projectRef);
            const members = docSnap.data().members;
            if (members.length > 3) {
                setMembersEmail([...members.filter((e) => e !== auth.currentUser.email)]);
            } else {
                setMembersEmail([...members.filter((e) => e !== auth.currentUser.email), ""]);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const onSubmitMembers = async () => {
        try {
            await updateDoc(props.projectRef, {
                members: [...membersEmail.filter((e) => e !== ""), auth.currentUser.email]
            });
        } catch (e) {
            console.error(e)
        }
        getMembersList()
        handleClose();
    }

    return (<div>
        <Button variant={props.toggleEditMembers} onClick={handleOpen} color={"info"}>Edit Members</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
        >
            <Box sx={style}>
                <Typography variant="h6" sx={{mb: 2}}>Email of each member</Typography>

                {
                    membersEmail.map((email, i) => (
                        <TextField
                            sx={{mb: 2}}
                            key={i}
                            fullWidth
                            value={email}
                            label={`Email ${i + 1}`}
                            placeholder={`member${i + 1}@neu.edu.ph`}
                            onChange={(e) => {
                                const newMembersEmail = [...membersEmail];
                                newMembersEmail[i] = e.target.value;
                                setMembersEmail(newMembersEmail);
                            }}
                        />
                    ))
                }
                <Button sx={{mt: 1}} fullWidth variant="contained" color="primary" onClick={onSubmitMembers}>
                    Submit
                </Button>
            </Box>
        </Modal>
    </div>);
}
