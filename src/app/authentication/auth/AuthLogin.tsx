import React, { useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import Link from "next/link";
import axios from "axios"; // We'll use axios to make the API call

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import Cookies from 'js-cookie';

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission
    setError(""); // Clear any previous errors

    try {
      // Send POST request to /api/login with credentials
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`, // Ensure the server URL is correct
        {
          email,
          password,
        },
        {
          withCredentials: true, // This allows the browser to handle cookies
        }
      );

      if (response.status === 200) {
        Cookies.set('token', response.data.token, { expires: 7 });
        // Handle success, e.g., redirect to the dashboard
        window.location.href = "/dashboard"; // Redirect to dashboard
      }
    } catch (err) {
      // Handle errors (e.g., incorrect credentials)
      setError("Login failed. Please check your username or password.");
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <form onSubmit={handleLogin}>
        <Stack>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="email"
              mb="5px"
            >
              Username
            </Typography>
            <CustomTextField
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setUsername(e.target.value)} // Update state on input change
            />
          </Box>
          <Box mt="25px">
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
            >
              Password
            </Typography>
            <CustomTextField
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state on input change
            />
          </Box>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember this Device"
              />
            </FormGroup>
            <Typography
              component={Link}
              href="/"
              fontWeight="500"
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              Forgot Password?
            </Typography>
          </Stack>
        </Stack>
        {error && (
          <Typography color="error" variant="body2" mb={2}>
            {error}
          </Typography>
        )}
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit" // Make sure the button submits the form
          >
            Sign In
          </Button>
        </Box>
      </form>

      {subtitle}
    </>
  );
};

export default AuthLogin;
