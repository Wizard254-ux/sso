import { useCallback } from 'react';
import { useMessage } from '../components/Header';

function useHttpErrorHandler() {
	const { showError } = useMessage();
	const errorHandler = useCallback(
		err => {
			console.log(err);
			const error = err.response?.data.message;
			const errors = err.response?.data.errors;
			if (error) showError(error);
			if (errors) showError(errors);
		},
		[showError]
	);

	return errorHandler;
}

export default useHttpErrorHandler;
