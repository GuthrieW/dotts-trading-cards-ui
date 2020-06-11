const axios = require('axios').default;

export const METHOD = {
	GET: 'GET',
	POST: 'POST',
	PATCH: 'PATCH',
	DELETE: 'DELETE',
};

export const callApi = async (
	url = throwIfMissing(url),
	options = {
		method: METHOD.GET,
	},
	data = null
) => {
	return axios({
		method: options.method,
		url: url,
		data: data,
	})
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			console.log('AXIOS ERROR: ', error);
			if (error.response) {
				return error.response.data;
			}
		});
};

function throwIfMissing(parameter) {
	throw new Error('Missing parameter: ' + parameter);
}
