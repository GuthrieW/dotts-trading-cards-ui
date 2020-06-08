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
	},
	data = null
) => {
	return Axios({
		method: options.method,
		url: url,
		data: data,
	})
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			console.error('AXIOS ERROR: ', error);
			if (error.response) {
				return error.response.data;
			}
		});
};

function throwIfMissing(parameter) {
	throw new Error('Missing parameter: ' + parameter);
}
