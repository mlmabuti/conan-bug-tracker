import {Box, LinearProgress, Typography} from "@mui/material";

export default function LinearProgressWithLabel(props) {

    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{width: '100%', mr: 1}}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{minWidth: 35}}>
                {
                    props.value || props.value === 0 ?
                        <Typography variant="body2" color="text.secondary">{`${Math.round(
                            props.value,
                        )}%`}</Typography> :
                        <Typography variant="body2" color="text.secondary">Refresh</Typography>
                }
            </Box>
        </Box>
    );
}
