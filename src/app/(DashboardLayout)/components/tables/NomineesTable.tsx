import { Button } from "@mui/material";
import { useEffect, useState } from "react";

interface Nominee {
  id: number;
  first_name: string;
  othernames: string;
  email: string;
  phone_number: string;
  address: string;
  nomination_date: string | null;
  title: string | null;
  status: string | null;
}

const NomineesTable = () => {
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

  // Filter nominees when search term changes
  useEffect(() => {
    const filtered = nominees.filter((nominee) =>
      nominee.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nominee.othernames?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nominee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nominee.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNominees(filtered);
    setCurrentPage(1); // Reset to the first page when searching
  }, [searchTerm, nominees]);

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredNominees.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(filteredNominees.length / recordsPerPage);

  // Handle changing page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
       
      <h1>Nominees List</h1>
      {/* Search Box */}
      <input
        type="text"
        placeholder="Search nominees..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: "20px",
          padding: "10px",
          width: "300px",
          fontSize: "16px",
        }}
      /> &nbsp;
       <Button variant="contained" href="/nominees/add-nominee"   disableElevation color="primary" >
            Nominate
          </Button>

      {/* Nominees Table */}
      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Name</th>
            {/* <th>Other Names</th> */}
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Nomination Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.length > 0 ? (
            currentRecords.map((nominee) => (
              <tr key={nominee.id}>
                {/* <td>{nominee.id}</td> */}
                {/* <td>{nominee.title || "N/A"}</td> */}
                <td>{nominee.title || "N/A"} {nominee.first_name } {nominee.othernames}</td>
                <td>{nominee.email || "N/A"}</td>
                <td>{nominee.phone_number || "N/A"}</td>
                <td>{nominee.address || "N/A" || "N/A"}</td>
                <td>{nominee.nomination_date || "N/A"}</td>
                <td>{nominee.status || "N/A"}</td>
                <td></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No nominees found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            style={{
              padding: "10px",
              margin: "0 5px",
              backgroundColor: currentPage === index + 1 ? "lightgray" : "white",
              cursor: "pointer",
              border: "1px solid #ccc",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NomineesTable;
