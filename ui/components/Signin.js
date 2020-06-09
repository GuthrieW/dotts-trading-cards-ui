import { Button } from 'reactstrap';
import Swal from 'sweetalert';
import { API_URL } from '/nsfl-trading-cards/ui/common/api/apiUrl';
import { Status } from '/nsfl-trading-cards/ui/common/api/httpStatus';
import { callApi, Method } from '/nsfl-trading-cards/ui/common/api/callApi';
import Layout from './Layout';
import SigninButton from './../images/google_signin_buttons/signin.png';
// import SigninButtonPressed from './../images/google_signin_buttons/signin-pressed.png';
// import SigninButtonFocus from './../images/google_signin_buttons/signin-focus.png';

export default class Signin extends React.Component {
	constructor() {
		super();
		this.state = {
			redirect: false,
		};

		this.handleOnClick = this.handleOnClick.bind(this);
	}

	async handleOnClick() {
		const url = API_URL + '/auth/google';
		const options = {
			method: Method.GET,
		};

		await callApi(url, options)
			.then((response) => {
				console.log('here');
				// if (response.status === Status.OK) {
				// 	console.log(response);
				// 	this.setState({
				// 		redirect: true,
				// 	});
				// }
			})
			.catch((error) => {
				Swal({
					title: 'Internal Server Error',
					icon: 'error',
				});
				console.log('CALL API ERROR', error);
			});
	}

	render() {
		// if (this.state.redirect) {
		// 	return <Redirect to='/index' />;
		// }

		return (
			<Layout title='Signin Page'>
				<h1>Login</h1>
				<img src={SigninButton} onClick={this.handleOnClick} />
			</Layout>
		);
	}
}
