import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    Alert,
    Snackbar
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    FileUpload as FileUploadIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreateContact from './CreateContact';
import EditContact from './EditContact';

const ListContact = () => {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrganization, setSelectedOrganization] = useState('');
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [openImportModal, setOpenImportModal] = useState(false);
    const [importFile, setImportFile] = useState(null);
    const [importOrganization, setImportOrganization] = useState('');
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        fetchContacts();
        fetchOrganizations();
    }, [page, rowsPerPage, searchTerm, selectedOrganization]);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: page + 1,
                limit: rowsPerPage,
                search: searchTerm,
                organizationId: selectedOrganization
            });

            const response = await axios.get(`/user/contacts?${params}`);
            setContacts(response.data.data.contacts);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch contacts');
            setLoading(false);
        }
    };

    const fetchOrganizations = async () => {
        try {
            const response = await axios.get('/user/organizations');
            setOrganizations(response.data.data);
        } catch (err) {
            setError('Failed to fetch organizations');
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPage(0);
    };

    const handleOrganizationFilter = (event) => {
        setSelectedOrganization(event.target.value);
        setPage(0);
    };

    const handleEdit = (contact) => {
        setSelectedContact(contact);
        setOpenEditModal(true);
    };

    const handleDelete = async (contactId) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            try {
                await axios.delete(`/user/contacts/${contactId}`);
                setSnackbar({
                    open: true,
                    message: 'Contact deleted successfully',
                    severity: 'success'
                });
                fetchContacts();
            } catch (err) {
                setSnackbar({
                    open: true,
                    message: 'Failed to delete contact',
                    severity: 'error'
                });
            }
        }
    };

    const handleImport = async () => {
        if (!importFile || !importOrganization) {
            setSnackbar({
                open: true,
                message: 'Please select a file and organization',
                severity: 'error'
            });
            return;
        }

        const formData = new FormData();
        formData.append('csv', importFile);
        formData.append('organizationId', importOrganization);

        try {
            const response = await axios.post('/user/contacts/import', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSnackbar({
                open: true,
                message: `Successfully imported ${response.data.data.imported} contacts`,
                severity: 'success'
            });

            setOpenImportModal(false);
            setImportFile(null);
            setImportOrganization('');
            fetchContacts();
        } catch (err) {
            setSnackbar({
                open: true,
                message: 'Failed to import contacts',
                severity: 'error'
            });
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6" component="h2">
                                Contacts
                            </Typography>
                            <Box>
                                <Button
                                    variant="contained"
                                    startIcon={<FileUploadIcon />}
                                    onClick={() => setOpenImportModal(true)}
                                    sx={{ mr: 1 }}
                                >
                                    Import
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={() => setOpenCreateModal(true)}
                                >
                                    Add Contact
                                </Button>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <TextField
                                label="Search"
                                variant="outlined"
                                size="small"
                                value={searchTerm}
                                onChange={handleSearch}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    )
                                }}
                                sx={{ flexGrow: 1 }}
                            />
                            <FormControl size="small" sx={{ minWidth: 200 }}>
                                <InputLabel>Organization</InputLabel>
                                <Select
                                    value={selectedOrganization}
                                    onChange={handleOrganizationFilter}
                                    label="Organization"
                                >
                                    <MenuItem value="">All Organizations</MenuItem>
                                    {organizations.map((org) => (
                                        <MenuItem key={org._id} value={org._id}>
                                            {org.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>Organization</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {contacts.map((contact) => (
                                        <TableRow key={contact._id}>
                                            <TableCell>
                                                {contact.firstName} {contact.lastName}
                                            </TableCell>
                                            <TableCell>{contact.email}</TableCell>
                                            <TableCell>{contact.phone}</TableCell>
                                            <TableCell>
                                                {organizations.find(org => org._id === contact.organizationId)?.name}
                                            </TableCell>
                                            <TableCell>{contact.title}</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleEdit(contact)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDelete(contact._id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TablePagination
                            component="div"
                            count={-1}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Grid>
            </Grid>

            {/* Create Contact Modal */}
            <CreateContact
                open={openCreateModal}
                onClose={() => setOpenCreateModal(false)}
                onSuccess={() => {
                    setOpenCreateModal(false);
                    fetchContacts();
                    setSnackbar({
                        open: true,
                        message: 'Contact created successfully',
                        severity: 'success'
                    });
                }}
                organizations={organizations}
            />

            {/* Edit Contact Modal */}
            {selectedContact && (
                <EditContact
                    open={openEditModal}
                    onClose={() => {
                        setOpenEditModal(false);
                        setSelectedContact(null);
                    }}
                    onSuccess={() => {
                        setOpenEditModal(false);
                        setSelectedContact(null);
                        fetchContacts();
                        setSnackbar({
                            open: true,
                            message: 'Contact updated successfully',
                            severity: 'success'
                        });
                    }}
                    contact={selectedContact}
                    organizations={organizations}
                />
            )}

            {/* Import Contacts Modal */}
            <Dialog open={openImportModal} onClose={() => setOpenImportModal(false)}>
                <DialogTitle>Import Contacts</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <input
                            type="file"
                            accept=".csv"
                            onChange={(e) => setImportFile(e.target.files[0])}
                            style={{ marginBottom: '1rem' }}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Organization</InputLabel>
                            <Select
                                value={importOrganization}
                                onChange={(e) => setImportOrganization(e.target.value)}
                                label="Organization"
                            >
                                {organizations.map((org) => (
                                    <MenuItem key={org._id} value={org._id}>
                                        {org.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenImportModal(false)}>Cancel</Button>
                    <Button onClick={handleImport} variant="contained">
                        Import
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ListContact; 