import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  AlertTitle,
  Dialog,
  DialogTitle,
  Typography,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import createOrg from "../../assets/createOrganization image.png";
import { useMediaQuery, useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";

// EditOrganization Component
const EditOrganization = () => {
  const { id } = useParams(); // Get the organization ID from the URL
  const [organizationName, setOrganizationName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [picture, setPicture] = useState(null);
  const [image, setImage] = useState(null);
  const [page, setPage] = useState(0);
  const [showMessage, setShowMessage] = useState({
    show: false,
    message: "",
    severity: "",
  });
  const [organizationData, setOrganizationData] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Handle form submission (update organization)
  const handelSubmit = async () => {
    const updatedOrg = {
      _id: organizationData._id, // Use the current organization's ID
      name: organizationName,
      email,
      website,
      logo: setImage(image), // Assuming you want to update the logo as base64
    };
  
    try {
      const response = await axios.put(`/hr/organization/${updatedOrg._id}`, updatedOrg);
      if (response.data.success) {
        setShowMessage({
          show: true,
          message: "Organization updated successfully",
          severity: "success",
        });
  
        // Delay navigation to let the user see the success message
        setTimeout(() => {
          navigate("/listOrganization");
        }, 2000); // 2 seconds delay
      } else {
        setShowMessage({
          show: true,
          message: response.data.message || "Failed to update the organization",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error updating organization", error);
      setShowMessage({
        show: true,
        message: error.response?.data?.message || "Error updating organization",
        severity: "error",
      });
    }
  };
  
  // Fetch organization data on component mount or ID change
  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        const response = await axios.get(`/hr/organization/${id}`);
        const data = response.data;
        if (data.success) {
          const org = data.data;
          setOrganizationData(org);
          setOrganizationName((prev) => prev || org.name); // Only set if empty
          setEmail((prev) => prev || org.email);
          setWebsite((prev) => prev || org.website);
          setImage(org.logo);
        }
      } catch (error) {
        console.error("Error fetching organization data", error);
      }
    };

    fetchOrganizationData();
  }, [id]);

  const handleOrganizationChange = (event) => {
    setOrganizationName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleWebsiteChange = (event) => {
    setWebsite(event.target.value);
  };

  const handlePhotoChange = (e) => {
    const { files } = e.target;
    if (!files || files.length === 0) {
      setShowMessage({
        show: true,
        message: "No file selected",
        severity: "error",
      });
      return;
    }

    const file = files[0];
    const isValidExtension = ["PNG", "JPEG", "JPG", "AVIF", "WEBP"].some(
      (ext) => new RegExp(`(${ext})$`, "i").test(file.name)
    );

    if (!isValidExtension) {
      setShowMessage({
        show: true,
        message:
          "Please provide a valid photo file format (PNG, JPEG, JPG, AVIF, WEBP).",
        severity: "error",
      });
      return;
    }

    setShowMessage({
      show: true,
      message: "Photo updated successfully",
      severity: "success",
    });
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    setPicture(file);
  };

  const handleClose = () => {
    setShowMessage({ show: false, message: "", severity: "" });
  };

  const isFormValidate =
    organizationName == "" ||
    picture == "";

  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.main",
          p: { xs: 3, sm: 8 },
          width: "100vw",
          minHeight: "100vh",
        }}
      >
        <Snackbar
          open={showMessage.show}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert
            severity={showMessage.severity}
            variant="filled"
            sx={{ width: "100%" }}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <AlertTitle>{showMessage.severity}</AlertTitle>
            {showMessage.message}
          </Alert>
        </Snackbar>

        <Box
          sx={{
            marginTop: { xs: "3rem", sm: "0" },
            textAlign: { xs: "center", sm: "start" },
          }}
        >
          <Typography sx={{ fontSize: { xs: "1.6rem", sm: "2.2rem" } }}>
            Edit an Organization to track the status of your employees
          </Typography>

          <Typography
            className=" text-neutral-500"
            sx={{
              marginTop: ".7rem",
              paddingX: { xs: 2, sm: 0 },
              marginRight: { xs: 0, sm: 36 },
              fontSize: { xs: "0.7rem", sm: "1rem" },
            }}
          >
            HR organization refers to the style of coordination, communication, and management, a team or an employee uses throughout his/her contract with the organization.
          </Typography>

          <div className="flex justify-center items-center">
            <img
              className={`origin-center ${isMobile ? "h-[30vh] md:w-[15%] mt-[15%] mb-[11%]" : "h-[40vh] md:w-[20%] mb-20% mt-[5%] mb-[4%] "} `}
              src={createOrg}
              alt="Organization"
            />
          </div>

          <div>
            <TextField
              name="organizationName"
              size="small"
              value={organizationName}
              variant="outlined"
              onChange={(e) => setOrganizationName(e.target.value)}
              placeholder="Organization Name"
              fullWidth
            />
          </div>

          <div className="flex justify-end">
            <Button
              className="ml-auto"
              variant="contained"
              onClick={() => {
                setPage(1);
              }}
              sx={{ px: 5, py: 1 }}
              disabled={organizationName?.length === 0}
            >
              Next
            </Button>
          </div>
        </Box>
      </Box>

      <Dialog open={page == 1} onClose={() => setPage(0)} fullWidth>
        <DialogTitle className="flex justify-end">
          <Close onClick={() => setPage(0)} />
        </DialogTitle>

        <div className="w-full flex flex-col gap-8 p-8">
          <div>
            <div className="w-[13%] pb-3 flex items-center">
              <p className="text-[20px] whitespace-nowrap">Organization Email</p>
            </div>
            <TextField
              name="email"
              size="small"
              value={email}
              variant="outlined"
              onChange={handleEmailChange}
              placeholder="Enter Email"
              fullWidth
            />
          </div>

          <div>
            <div className="w-[13%] pb-3 flex items-center">
              <p className="text-[20px] whitespace-nowrap">Organization Website URL</p>
            </div>
            <TextField
              name="website"
              size="small"
              value={website}
              variant="outlined"
              onChange={handleWebsiteChange}
              placeholder="Enter Website URL"
              fullWidth
            />
          </div>

          <div>
            <div className="w-[13%] pb-3 flex items-center">
              <p className="text-[20px] whitespace-nowrap">Organization Logo</p>
            </div>

            <div className="mb-4 flex flex-row">
              <div className="image-input-wrapper">
                <input
                  type="file"
                  accept="*"
                  required
                  onChange={handlePhotoChange}
                  className="image-input"
                />
                {image ? (
                  <img src={image} alt="Selected" className="image-preview" />
                ) : (
                  <div className="plus-icon">
                    <AddOutlinedIcon />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handelSubmit}
              variant="contained"
              sx={{ px: 5, py: 1 }}
              disabled={isFormValidate}
            >
              Update
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default EditOrganization;
