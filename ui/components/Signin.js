import { Redirect } from 'react-router-dom';
import { Row, Col, Form, Label, FormGroup, Input, Button } from 'reactstrap';
import Swal from 'sweetalert';
import { API_URL } from '/nsfl-trading-cards/ui/common/api/apiUrl';
import { Status } from '/nsfl-trading-cards/ui/common/api/httpStatus';
import { callApi, Method } from '/nsfl-trading-cards/ui/common/api/callApi';
import Layout from './Layout';
import SigninButton from './../images/google_signin_buttons/signin.png';
// import SigninButtonPressed from './../images/google_signin_buttons/signin-pressed.png';
import SigninButtonFocus from './../images/google_signin_buttons/signin-focus.png';

export default class Signn extends React.Component {
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
				if (response.status === Status.OK) {
					this.setState({
						redirect: true,
					});
				}
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
		if (this.state.redirect) {
			return <Redirect to='/index' />;
		}

		return (
			<Layout title='Login Page'>
				<h1>Login</h1>
				<Button onClick={this.handleOnClick}>
					<img src={SigninButtonFocus} />
				</Button>
			</Layout>
		);
	}
}
