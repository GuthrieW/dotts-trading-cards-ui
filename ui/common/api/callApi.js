import Swal from 'sweetalert';

const Axios = require('axios').default;

export const Method = {
	GET: 'GET',
	POST: 'POST',
	PATCH: 'PATCH',
	DELETE: 'DELETE',
};

export const callApi = async (
	url = throwIfMissing(),
	method = Method.GET,
	data = {}
) => {
	Axios.defaults.withCredentials = true;
	return Axios({
		method: method,
		url: url,
		data: data,
	})
		.then((response) => {
			return response;
		})
		.catch((error) => {
			console.error('AXIOS ERROR: ', error);
			if (error.response) {
				return error.response;
			}
		});
};

function throwIfMissing(parameter) {
	throw new Error('Missing parameter: ' + parameter);
}
