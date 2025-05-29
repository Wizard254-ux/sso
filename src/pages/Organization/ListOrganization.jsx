import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  Modal,
  Button,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import useModal from "../../hooks/useModal";
import DeleteOrganization from "./DeleteOrganization";
import { setCookie } from "../../utilities/cookies";
// import edit from "../../assets/SidebarIcons/tabler_edit.png";
// import delet from "../../assets/SidebarIcons/Vector.png";
import { useMediaQuery, useTheme } from '@mui/material';
import OrganizationNavbar from "./OrganizationNavbar";
// import dotsIcon from "../../assets/SidebarIcons/proicons_more.png"
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";



const EditIcon = () => <img src='/images/tabler_edit.png' alt="edit" />;
const DeleteIcon = () => <img src='/images/Vector.png' alt="delete" />;
const Dot = () => <img src='/images/proicons_more.png' alt="..." />;

const ListOrganization = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [deleteOrg, setDeleteOrg] = useState(null);
  const [editOrg, setEditOrg] = useState(null); // State for editing organization
  const { modalState, openModal, closeModal } = useModal();
  const [editModalState, setEditModalState] = useState(false); // Separate state for the edit modal
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getOrganizationList = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await axios.get("http://localhost:8001/user/organizations", {
        headers: {
          Authorization: `Bearer ${user.refreshToken}`,
        },
        withCredentials: true, // Optional, if backend uses cookies
      });
      setOrganizations(response.data.organizations)
    } catch (err) {
      console.error("Error fetching user:", err.response?.data || err.message);
    }
  };

  const openMenu = (event, org) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrg(org);
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditOrg((prev) => ({ ...prev, logo: file }));
    }
  };

  const closeMenu = () => {
    setAnchorEl(null);
    setSelectedOrg(null);
  };

  const deleteOrganization = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      await axios.delete(`http://localhost:8001/user/organizations/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${user.refreshToken}`,
        },
        withCredentials: true, // Optional if backend uses cookies
      });

      toast.success('Organization Deleted Succesfully', {
        position: "top-center",
      });
      // Refresh the organization list
      getOrganizationList();
    } catch (err) {
      console.error("Error deleting organization:", err.response?.data || err.message);
      // Optionally show an error message
      // e.g., toast.error("Failed to delete organization");
    }
  };


  // Handle Delete Organization
  async function handleDelete(org) {
    const user = JSON.parse(localStorage.getItem("user"));  
    try {
      const response = await axios.delete(`http://localhost:8001/user/organizations/${org._id}`, {
        headers: {
          Authorization: `Bearer ${user.refreshToken}`,
        },
        withCredentials: true,
      });
      const data = response.data;
      if (data.success) {
        setOrganizations((prevOrganizations) =>
          prevOrganizations.filter((o) => o._id !== org._id)
        );
        closeModal();
        setDeleteOrg(null);
      } else {
        console.log("Failed to delete the organization");
      }
    } catch (error) {
      console.error("Error deleting organization", error);
    }
  }

  function openDeleteBox(org) {
    openModal();
    setDeleteOrg(org);
  }

  // Handle Organization Selection
  async function handleSelect(org) {
    navigate("/Dashboard");
  }

  // Fetch Organizations
  const getOrganizations = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await axios.get(`http://localhost:8001/user/organizations`, {
        headers: {
          Authorization: `Bearer ${user.refreshToken}`,
        },
        withCredentials: true,
      });
      const data = response.data;
      console.log(data)
      if (data.success) {
        setOrganizations(data.data);
      }
    } catch (error) {
      console.error("Error fetching organizations", error);
    }
  };

  // Handle Edit Organization
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditOrg((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const formData = new FormData();
      formData.append("name", editOrg.name);
      formData.append("email", editOrg.email);
      formData.append("website", editOrg.website);
      if (editOrg.logo) {
        formData.append("image", editOrg.logo);
      }

      const response = await axios.put(
        `http://localhost:8001/user/organizations/${editOrg._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.refreshToken}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      const data = response.data;

      if (data.success) {
        setOrganizations((prev) =>
          prev.map((org) =>
            org._id === editOrg._id ? { ...org, ...data.organization } : org
          )
        );
        toast.success("Organization updated successfully");
        closeEditModal();
      } else {
        toast.error(data.message || "Failed to update the organization");
      }
    } catch (error) {
      console.error("Error updating organization", error);
      toast.error(error.response?.data?.message || "Error updating organization");
    }
  };

  const openEditModal = () => {
    setEditModalState(true); // Open the edit modal
  };

  const closeEditModal = () => {
    setEditModalState(false); // Close the edit modal
  };

  useEffect(() => {
    getOrganizationList();
  }, []);

  const editClick = (org) => {
    navigate(`/EditOrganization/${org._id}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <OrganizationNavbar />
      <Box
        sx={{
          backgroundColor: "background.main",
          paddingX: { xs: 3, sm: 5 },
          paddingY: 10,
        }}
      >
        <Box sx={{ paddingRight: { xs: 0, sm: 0 } }}>
          <div className="flex justify-between">
            <Typography variant="h4">Organization List</Typography>
            {/* <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/CreateOrganization')} // Change route as needed
              sx={{ textTransform: "none" }}
            >
              Add Organization
            </Button> */}
          </div>
          <Typography sx={{ marginTop: ".7rem", color: "text.three", fontSize: isMobile ? "13px" : "" }}>
            HR organization refers to the style of coordination, communication and management, a team or an employee uses throughout his/her contract with the organization.
          </Typography>
          <Typography sx={{ marginTop: 5, color: "text.three" }}>
            Total Organizations
          </Typography>
          <Typography
            variant="h4"
            sx={{ marginTop: ".2rem", marginBottom: 5, color: "text.three" }}
          >
            {organizations.length}
          </Typography>
        </Box>

        <Box sx={{ overflowX: "auto" }} className="text-center">
          <Grid container wrap="nowrap" sx={{ p: 1, minWidth: 1000 }}>
            <Grid item xs={2.5}>Organization</Grid>
            <Grid item xs={2.5}>Status</Grid>
            <Grid item xs={2.5}>Subscription Status</Grid>
            <Grid item xs={2.5}>User</Grid>
            {/* <Grid item xs={2}>Email</Grid>
            <Grid item xs={2}>Website</Grid>
            <Grid item xs={2}>Address</Grid>
            <Grid item xs={1}>Country</Grid>
            <Grid item xs={1}>ZipCode</Grid>
            <Grid item xs={1}>City</Grid>
            <Grid item xs={2}>Industry</Grid> */}
            <Grid item xs={0.5}>Action</Grid>
          </Grid>
          <Divider sx={{ minWidth: 1000, mb: 3 }} />
          <Box>
            {organizations.map((org) => (
              <Grid 
                key={org._id} 
                container 
                wrap="nowrap" 
                sx={{ 
                  p: 1, 
                  minWidth: 1200,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
                onClick={() => handleSelect(org)}
              >
                <Grid item xs={2.5} className="flex gap-3">
                  {org.logo &&
                    <img 
                      src={`${process.env.REACT_APP_SERVER}/static/${org.logo}`} 
                      style={{ width: '30px', height: '30px' }} 
                      className="rounded-full" 
                      alt="Logo" 
                    />
                  }
                  <span className="capitalize">{org.name}</span>
                </Grid>
                <Grid item xs={2.5}>User</Grid>
                <Grid item xs={2.5}>Enterprise</Grid>
                <Grid item xs={2.5}>1</Grid>
                {/* <Grid item xs={2}>{org.Email}</Grid>
                <Grid item xs={2}>{org.Address}</Grid>
                <Grid item xs={2}>{org.Website}</Grid>
                <Grid item xs={2}>{org.Address}</Grid>
                <Grid item xs={1}>{org.Country}</Grid>
                <Grid item xs={1}>{org.ZipCode}</Grid> 
                <Grid item xs={1}>{org.City}</Grid>
                <Grid item xs={2}>{org.CompanyIndustry}</Grid>*/}
                <Grid item xs={0.5}>
                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <FaRegEdit 
                      onClick={() => {
                        setEditOrg(org);
                        setEditModalState(true);
                      }} 
                      className="w-4 h-4 mr-2 cursor-pointer" 
                      color="blue" 
                    />
                    <RiDeleteBin6Line 
                      onClick={() => openDeleteBox(org)} 
                      className="w-5 h-5 cursor-pointer" 
                      color="red" 
                    />
                  </div>
                </Grid>
              </Grid>
            ))}
          </Box>
        </Box>


        {/* Delete Modal */}
        <Modal
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={modalState} // Use the delete modal state
          onClose={closeModal}
        >
          <DeleteOrganization
            onClose={closeModal}
            onDelete={handleDelete}
            org={deleteOrg}
          />
        </Modal>

        {/* Edit Modal */}
        <Modal
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            '& .MuiBackdrop-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.8)'  // This makes the overlay darker
            }
          }}
          open={editModalState}
          onClose={() => {
            setEditModalState(false);
            setEditOrg(null);
          }}
        >
          <Box sx={{ 
            backgroundColor: "white",  // Changed from background.view to white
            padding: 4, 
            borderRadius: 2,
            width: { xs: '90%', sm: '500px' },
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)'  // Added shadow
          }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Edit Organization</Typography>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleEditSubmit();
            }}>
              <div className="w-[13%] pb-3 flex items-center">
                <p className="text-[20px] whitespace-nowrap">
                  Organization Name
                </p>
              </div>
              <TextField
                name="name"
                size="small"
                value={editOrg?.name || ""}
                variant="outlined"
                onChange={handleEditChange}
                placeholder="Enter Name"
                fullWidth
              />

              <div className="w-[13%] pb-3 flex items-center">
                <p className="text-[20px] whitespace-nowrap">
                  Organization Email
                </p>
              </div>
              <TextField
                name="email"
                size="small"
                value={editOrg?.email || ""}
                variant="outlined"
                onChange={handleEditChange}
                placeholder="Enter Email"
                fullWidth
              />

              <div className="w-[13%] pb-3 flex items-center">
                <p className="text-[20px] whitespace-nowrap">
                  Organization Website url
                </p>
              </div>
              <TextField
                name="Website"
                size="small"
                value={editOrg?.website || ""}
                variant="outlined"
                onChange={handleEditChange}
                placeholder="Enter Email"
                fullWidth
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setEditOrg((prev) => ({
                      ...prev,
                      logo: file, // Store the file object for upload
                    }));
                  }
                }}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{ marginTop: 2 }}
              >
                Save Changes
              </Button>
            </form>
          </Box>
        </Modal>
        <ToastContainer />
      </Box>
    </div >
  );
};

export default ListOrganization;


