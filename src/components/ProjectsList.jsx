import {
    Box,
    Button,
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

export const ProjectsList = () => {
    const projects = [
        {
            title: "PiedPiper",
            author: "Richard Hendricks"
        },
        {
            title: "Yet-Another-JS-Framework",
            author: "Bertram Gilfoyle"
        },
        {
            title: "Bitcoin Mobile Miner",
            author: "Jared Dunn"
        },
    ]
    return (
    <Card sx={{p:4, m:6}} elevation={2}>
        <Typography variant="h4" sx={{mb:3}}>Projects</Typography>
        <TableContainer component={Box}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h6" sx={{px:1}}>
                                Title
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h6">
                                Author
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {projects.map( (project) =>
                        <TableRow>
                            <TableCell>
                                <Button variant="text" color="info">
                                    {project.title}
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {project.author}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )

                    }
                </TableBody>
            </Table>
        </TableContainer>
    </Card>
    )
}