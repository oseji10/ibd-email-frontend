import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Button,
    TextField,
    TablePagination
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

// Helper function to format the date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'long', // Full name of the day (e.g., Friday)
        year: 'numeric', // 4-digit year
        month: 'long',  // Full month name (e.g., September)
        day: 'numeric'  // Day of the month (e.g., 18)
    }).format(date);
};

const Nominees = () => {
    const [nominees, setNominees] = useState<Nominee[]>([]);
    const [filteredNominees, setFilteredNominees] = useState<Nominee[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(10); // Set how many records you want per page
    const token = Cookies.get('token'); // Retrieve the token from cookies

    // Fetch nominees from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nominees/all-nominees`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Add token to the request header
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setNominees(data.nominees);
                setFilteredNominees(data.nominees);
            } catch (error) {
                console.error("Error fetching nominees:", error);
            }
        };

        fetchData();
    }, [token]);

    // Handle search functionality
    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = nominees.filter((nominee) => {
            const fullName = `${nominee?.title} ${nominee?.first_name} ${nominee?.othernames}`.toLowerCase();
            return (
                fullName.includes(value) ||
                nominee?.email.toLowerCase().includes(value) ||
                nominee?.nomination_date.toLowerCase().includes(value)
            );
        });

        setFilteredNominees(filtered);
        setCurrentPage(0); // Reset to first page when search is triggered
    };

    // Handle pagination
    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRecordsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    // Pagination logic
    const paginatedNominees = filteredNominees.slice(
        currentPage * recordsPerPage,
        currentPage * recordsPerPage + recordsPerPage
    );

    return (
        <DashboardCard title="Nominees List">
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Button
                    variant="contained"
                    href="/nominees/add-nominee"
                    disableElevation
                    color="primary"
                >
                    Nominate
                </Button>
                <TextField
                    variant="outlined"
                    label="Search by Name, Email, or Date"
                    value={searchTerm}
                    onChange={handleSearch}
                    sx={{ width: 300 }}
                />
            </Box>

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
                        {paginatedNominees.map((nominee) => (
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
                                    {/* Format the nomination date */}
                                    <Typography variant="h6">
                                        {formatDate(nominee?.nomination_date)}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>

            {/* Pagination component */}
            <TablePagination
                component="div"
                count={filteredNominees.length}
                page={currentPage}
                onPageChange={handleChangePage}
                rowsPerPage={recordsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </DashboardCard>
    );
};

export default Nominees;
