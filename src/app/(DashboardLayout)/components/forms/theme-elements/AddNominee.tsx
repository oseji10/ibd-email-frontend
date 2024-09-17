import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import CustomTextField from "./CustomTextField";

const AddNomineeForm = () => {
  // State for nominee form data
  const [formData, setFormData] = useState({
    first_name: "",
    othernames: "",
    email: "",
    phone_number: "",
    address: "",
    title: "",
  });

  // State for form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Handle form data changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nominees/add-nominee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error submitting form");
      }

      const data = await response.json();
      setSubmitSuccess(data.message);
    //   setSubmitError("");
      // Clear the form after successful submission
      setFormData({
        first_name: "",
        othernames: "",
        email: "",
        phone_number: "",
        address: "",
        title: "",
      });
    } catch (error) {
      setSubmitError("Error submiting");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <Typography variant="h4" fontWeight={600} mb={4} align="center">New Nomination</Typography>

      <form onSubmit={handleSubmit}>
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="title" mb="5px">Title</Typography>
          <CustomTextField
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />
        </Box>

        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="first_name" mb="5px">First Name</Typography>
          <CustomTextField
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />
        </Box>

        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="othernames" mb="5px">Other Names</Typography>
          <CustomTextField
            id="othernames"
            name="othernames"
            value={formData.othernames}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            // required
          />
        </Box>

        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px">Email Address</Typography>
          <CustomTextField
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />
        </Box>

        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="phone_number" mb="5px">Phone Number</Typography>
          <CustomTextField
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            // required
            type="number"
          />
        </Box>

        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="address" mb="5px">Address</Typography>
          <CustomTextField
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            // required
          />
        </Box>

        {/* Display error message */}
        {submitError && <Typography color="error" mb={2}>{submitError}</Typography>}

        {/* Display success message */}
        {submitSuccess && <Typography color="success" mb={2}>Nominee added successfully!</Typography>}

        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Add Nominee"}
        </Button>
      </form>
    </div>
  );
};

export default AddNomineeForm;
