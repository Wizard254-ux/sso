import { useState } from 'react';

const useFormHandler = (initialValues) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
    };

    return {
        values,
        setValues,
        errors,
        handleChange,
        resetForm,
    };
};

export default useFormHandler;
