import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useState} from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {TextField} from "@mui/material";
import {addDoc} from "firebase/firestore";
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

export const NewProjectFormModal = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // new project
    const [newProject, setNewProject] = useState("");
    const [membersEmail, setMembersEmail] = useState(["", "", ""]);

    const onSubmitProject = async () => {
        if (newProject === "") {
            handleClose();
            return;
        }
        try {
            await addDoc(props.collectionRef, {
                title: newProject,
                author: auth.currentUser.displayName,
                members: [...membersEmail.filter((e) => e !== ""),
                    auth.currentUser.email]
                ,
                tickets: [{
                    ticketTitle: "",
                    ticketAuthor: "",
                    priority: "",
                    assignee: "",
                    description: "",
                    due: "",
                    label: "",
                    status: "",
                }],
                userId: auth?.currentUser?.uid,
            });
        } catch (e) {
            console.error(e)
        }
        props.getProjectList();
        handleClose();
    }

    return (<div>
        <Button onClick={handleOpen} variant="contained">
            <AddCircleIcon/>
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    Create New Project
                </Typography>
                <TextField required fullWidth label="Project Title" inputProps={{maxLength: 48}}
                           placeholder="The maximum character limit is 48" onChange={(e) => {
                    setNewProject(e.target.value)
                }} sx={{my: 2}}/>
                <Typography variant="h6" sx={{mb: 2}}>Exact email of each member</Typography>

                {
                    membersEmail.map((email, i) => (
                        <TextField
                            sx={{mb: 2}}
                            key={i}
                            fullWidth
                            label={`Email ${i + 1} (Optional)`}
                            placeholder={`member${i + 1}@neu.edu.ph`}
                            value={email}
                            onChange={(e) => {
                                const newMembersEmail = [...membersEmail];
                                newMembersEmail[i] = e.target.value;
                                setMembersEmail(newMembersEmail);
                            }}
                        />
                    ))
                }
                <Button sx={{mt: 1}} fullWidth variant="contained" color="primary" onClick={onSubmitProject}>
                    Submit
                </Button>
            </Box>
        </Modal>
    </div>);
}