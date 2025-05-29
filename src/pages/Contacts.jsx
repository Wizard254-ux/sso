import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
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
    Snackbar,
    CircularProgress
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    FileUpload as FileUploadIcon
} from '@mui/icons-material';
import axios from 'axios';

const Contacts = () => {
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
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organizationId: '',
        title: '',
        department: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        notes: '',
        tags: []
    });
    const [errors, setErrors] = useState({});
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const [totalContacts, setTotalContacts] = useState(0);

    useEffect(() => {
        fetchContacts();
        fetchOrganizations();
    }, [page, rowsPerPage, searchTerm, selectedOrganization]);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem("user"));
            const params = new URLSearchParams({
                page: page + 1,
                limit: rowsPerPage,
                search: searchTerm,
                organizationId: selectedOrganization
            });

            const response = await axios.get(`http://localhost:8001/user/contacts?${params}`, {
                headers: {
                    Authorization: `Bearer ${user.refreshToken}`,
                },
                withCredentials: true,
            });

            if (response.data.success === 1) {
                console.log('Contacts data:', response.data.data.contacts);
                setContacts(response.data.data.contacts || []);
                setTotalContacts(response.data.data.pagination?.total || 0);
            } else {
                setError(response.data.message || 'Failed to fetch contacts');
            }
            setLoading(false);
        } catch (err) {
            console.error("Error fetching contacts:", err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to fetch contacts');
            setLoading(false);
        }
    };

    const fetchOrganizations = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const response = await axios.get('http://localhost:8001/user/organizations', {
                headers: {
                    Authorization: `Bearer ${user.refreshToken}`,
                },
                withCredentials: true,
            });
            
            if (response.data.success) {
                console.log('Organizations data:', response.data.organizations);
                setOrganizations(response.data.organizations || []);
            } else {
                setError('Failed to fetch organizations');
            }
        } catch (err) {
            console.error("Error fetching organizations:", err.response?.data || err.message);
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

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        console.log('Form field changed:', name, value);
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.organizationId) newErrors.organizationId = 'Organization is required';
        if (!formData.title) newErrors.title = 'Title is required';

        console.log('Form validation errors:', newErrors);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const contactData = {
                ...formData,
                dateAdded: new Date(),
                lastChanged: new Date(),
                source: 'manual',
                rating: 0,
                subscribed: true,
                dateSubscribed: new Date()
            };

            console.log('Creating contact with data:', contactData);
            console.log('Organization ID:', contactData.organizationId);
            console.log('Title:', contactData.title);

            const response = await axios.post('http://localhost:8001/user/contacts', contactData, {
                headers: {
                    Authorization: `Bearer ${user.refreshToken}`,
                },
                withCredentials: true,
            });

            console.log('Create contact response:', response.data);

            if (response.data.success === 1) {
                // Fetch the updated contacts list instead of manually adding the contact
                await fetchContacts();

                setSnackbar({
                    open: true,
                    message: response.data.message || 'Contact created successfully',
                    severity: 'success'
                });
                setOpenCreateModal(false);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    organizationId: '',
                    title: '',
                    department: '',
                    address: '',
                    city: '',
                    state: '',
                    country: '',
                    zipCode: '',
                    notes: '',
                    tags: []
                });
            } else {
                setErrors({ submit: response.data.message || 'Failed to create contact' });
            }
        } catch (err) {
            console.error('Error creating contact:', err.response?.data || err);
            const errorMessage = err.response?.data?.message || 'Failed to create contact';
            setErrors({ submit: errorMessage });
        }
    };

    const handleEdit = (contact) => {
        setSelectedContact(contact);
        setFormData({
            firstName: contact.firstName || '',
            lastName: contact.lastName || '',
            email: contact.email || '',
            phone: contact.phone || '',
            organizationId: contact.organizationId || '',
            title: contact.title || '',
            department: contact.department || '',
            address: contact.address || '',
            city: contact.city || '',
            state: contact.state || '',
            country: contact.country || '',
            zipCode: contact.zipCode || '',
            notes: contact.notes || '',
            tags: contact.tags || []
        });
        setOpenEditModal(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const contactData = {
                ...formData,
                lastChanged: new Date()
            };

            const response = await axios.put(`http://localhost:8001/user/contacts/${selectedContact._id}`, contactData, {
                headers: {
                    Authorization: `Bearer ${user.refreshToken}`,
                },
                withCredentials: true,
            });

            if (response.data.success === 1) {
                // Use the response data which has the populated organization
                setContacts(prevContacts => 
                    prevContacts.map(contact => 
                        contact._id === selectedContact._id 
                            ? response.data.contact
                            : contact
                    )
                );

                setSnackbar({
                    open: true,
                    message: response.data.message || 'Contact updated successfully',
                    severity: 'success'
                });
                setOpenEditModal(false);
                setSelectedContact(null);
            } else {
                setErrors({ submit: response.data.message || 'Failed to update contact' });
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to update contact';
            setErrors({ submit: errorMessage });
        }
    };

    const handleDelete = async (contactId) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const response = await axios.delete(`http://localhost:8001/user/contacts/${contactId}`, {
                    headers: {
                        Authorization: `Bearer ${user.refreshToken}`,
                    },
                    withCredentials: true,
                });

                if (response.data.success === 1) {
                    setSnackbar({
                        open: true,
                        message: response.data.message || 'Contact deleted successfully',
                        severity: 'success'
                    });
                    // Refresh the contacts list
                    await fetchContacts();
                } else {
                    setSnackbar({
                        open: true,
                        message: response.data.message || 'Failed to delete contact',
                        severity: 'error'
                    });
                }
            } catch (err) {
                console.error('Error deleting contact:', err.response?.data || err);
                setSnackbar({
                    open: true,
                    message: err.response?.data?.message || 'Failed to delete contact',
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

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('csv_file', importFile);
            formData.append('organizationId', importOrganization);
            formData.append('mapping', JSON.stringify({
                firstName: 'firstName',
                lastName: 'lastName',
                email: 'email',
                phone: 'phone',
                companyName: 'companyName',
                title: 'title',
                address: 'address',
                city: 'city',
                state: 'state',
                zipCode: 'zipCode',
                country: 'country'
            }));
            formData.append('values', JSON.stringify({
                organizationId: importOrganization
            }));

            console.log('Sending import request with mapping:', {
                firstName: 'firstName',
                lastName: 'lastName',
                email: 'email',
                phone: 'phone',
                companyName: 'companyName',
                title: 'title',
                address: 'address',
                city: 'city',
                state: 'state',
                zipCode: 'zipCode',
                country: 'country'
            });

            const user = JSON.parse(localStorage.getItem("user"));
            const response = await axios.post('http://localhost:8001/user/contacts/import-csv', formData, {
                headers: {
                    Authorization: `Bearer ${user.refreshToken}`,
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true,
            });

            console.log('Import response:', response.data);

            if (response.data.success === 1) {
                // Refresh the contacts list
                await fetchContacts();
                
                setSnackbar({
                    open: true,
                    message: response.data.message || 'Contacts imported successfully',
                    severity: 'success'
                });
                setOpenImportModal(false);
                setImportFile(null);
                setImportOrganization('');
            } else {
                setSnackbar({
                    open: true,
                    message: response.data.message || 'Failed to import contacts',
                    severity: 'error'
                });
            }
        } catch (err) {
            console.error('Import error:', err);
            setSnackbar({
                open: true,
                message: err.response?.data?.message || 'Failed to import contacts',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const renderForm = () => (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleFormChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.organizationId}>
                    <InputLabel>Organization</InputLabel>
                    <Select
                        name="organizationId"
                        value={formData.organizationId}
                        onChange={handleFormChange}
                        label="Organization"
                        required
                    >
                        {organizations.map((org) => (
                            <MenuItem key={org._id} value={org._id}>
                                {org.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.organizationId && (
                        <Box sx={{ color: 'error.main', mt: 1 }}>
                            {errors.organizationId}
                        </Box>
                    )}
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    error={!!errors.title}
                    helperText={errors.title}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Department"
                    name="department"
                    value={formData.department}
                    onChange={handleFormChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleFormChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleFormChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleFormChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="ZIP Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleFormChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleFormChange}
                    multiline
                    rows={4}
                />
            </Grid>
        </Grid>
    );

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

                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        {loading && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                                <CircularProgress />
                            </Box>
                        )}

                        {!loading && contacts.length === 0 && (
                            <Box sx={{ p: 3, textAlign: 'center' }}>
                                <Typography>No contacts found</Typography>
                            </Box>
                        )}

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
                                    {contacts && contacts.map((contact) => {
                                        if (!contact) return null;
                                        console.log('Rendering contact:', contact);
                                        return (
                                            <TableRow key={contact._id}>
                                                <TableCell>
                                                    {contact.firstName || ''} {contact.lastName || ''}
                                                </TableCell>
                                                <TableCell>{contact.email || ''}</TableCell>
                                                <TableCell>{contact.phone || ''}</TableCell>
                                                <TableCell>
                                                    {contact.organizationId?.name || 'N/A'}
                                                </TableCell>
                                                <TableCell>{contact.title || 'N/A'}</TableCell>
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
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TablePagination
                            component="div"
                            count={totalContacts}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Grid>
            </Grid>

            {/* Create Contact Modal */}
            <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)} maxWidth="md" fullWidth>
                <DialogTitle>Create New Contact</DialogTitle>
                <form onSubmit={handleCreate}>
                    <DialogContent>
                        {renderForm()}
                        {errors.submit && (
                            <Box sx={{ color: 'error.main', mt: 2 }}>
                                {errors.submit}
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenCreateModal(false)}>Cancel</Button>
                        <Button type="submit" variant="contained">
                            Create Contact
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* Edit Contact Modal */}
            <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)} maxWidth="md" fullWidth>
                <DialogTitle>Edit Contact</DialogTitle>
                <form onSubmit={handleUpdate}>
                    <DialogContent>
                        {renderForm()}
                        {errors.submit && (
                            <Box sx={{ color: 'error.main', mt: 2 }}>
                                {errors.submit}
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
                        <Button type="submit" variant="contained">
                            Save Changes
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

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

export default Contacts;