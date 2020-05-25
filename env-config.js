const prod = process.env.NODE_ENV === 'production';
const url = prod ? '' : '';

console.log = () => {
	if (prod) {
		return;
	}
};

module.exports = {
	'process.env.API_SERVER': url,
	'process.env.API_LOGIN': url + '/users/login',
	'process.env.API_GRAPHQL': url + '/graphql',
	'process.env.API_REFRESH_TOKEN': url + '/users/refreshToken',
};