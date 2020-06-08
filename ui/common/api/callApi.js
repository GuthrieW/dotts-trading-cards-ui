const Axios = require('axios').default;

export const Method = {
	GET: 'GET',
	POST: 'POST',
	PATCH: 'PATCH',
	DELETE: 'DELETE',
};

export const callApi = async (
	url = throwIfMissing(url),
	options = {
		method: Method.GET,
		data: null,
	}
) => {
	return Axios({
		url,
		...options,
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
