
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Button
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';
import { useEffect, useState } from "react";

const products = [
    {
        id: "1",
        name: "Sunil Joshi",
        post: "Web Designer",
        pname: "Elite Admin",
        priority: "Low",
        pbg: "primary.main",
        budget: "3.9",
    },
    {
        id: "2",
        name: "Andrew McDownland",
        post: "Project Manager",
        pname: "Real Homes WP Theme",
        priority: "Medium",
        pbg: "secondary.main",
        budget: "24.5",
    },
    {
        id: "3",
        name: "Christopher Jamil",
        post: "Project Manager",
        pname: "MedicalPro WP Theme",
        priority: "High",
        pbg: "error.main",
        budget: "12.8",
    },
    {
        id: "4",
        name: "Nirav Joshi",
        post: "Frontend Engineer",
        pname: "Hosting Press HTML",
        priority: "Critical",
        pbg: "success.main",
        budget: "2.4",
    },
];


const Nominees = () => {
    const [nominees, setNominees] = useState<Nominee[]>([]);
    const [filteredNominees, setFilteredNominees] = useState<Nominee[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10); // Set how many records you want per page
  

  // Fetch nominees from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch("/api/nominees");
        const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/nominees/all-nominees`);
       
        const data = await response.json();
        // Access the nominees array within the API response
        console.log(data.nominees)
        setNominees(data.nominees);
        setFilteredNominees(data.nominees);
      } catch (error) {
        console.error("Error fetching nominees:", error);
      }
    };

    fetchData();
  }, []);

    return (

        <DashboardCard title="Nominees List">
                    <Button variant="contained" href="/nominees/add-nominee"   disableElevation color="primary" >
                                Nominate
                              </Button>
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >

                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Id
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Phone Number
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Status
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Date Nominated
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {nominees.map((nominee) => (
                            <TableRow key={nominee.id}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {nominee.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                            {nominee?.title} {nominee?.first_name} {nominee?.othernames}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {nominee?.email}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {nominee?.phone_number}
                                    </Typography>
                                </TableCell>
                                <TableCell>
    <Chip
        sx={{
            px: "4px",
            backgroundColor:
                nominee.status === "nominated"
                    ? "error.main"
                    : nominee.status === "accepted"
                    ? "primary.main"
                    : nominee.status === "inducted"
                    ? "success.main"
                    : nominee.status === "responded"
                    ? "secondary.main"
                    : !nominee.status
                    ? "secondary.main"
                    : "secondary.main", // Default color for other statuses
            color: "#fff",
        }}
        size="small"
        label={nominee?.status || "N/A"}
    />
</TableCell>


                                <TableCell align="right">
                                    <Typography variant="h6">{nominee?.nomination_date}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default Nominees;
