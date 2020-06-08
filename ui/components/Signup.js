import Head from 'next/head';
import Header from './Header';
import { Redirect } from 'react-router-dom';
import { Row, Col, Form, Label, FormGroup, Input, Button } from 'reactstrap';
import Swal from 'sweetalert';
import { API_URL } from '/nsfl-trading-cards/ui/common/api/apiUrl';
import { Status } from '/nsfl-trading-cards/ui/common/api/httpStatus';
import { callApi, Method } from '/nsfl-trading-cards/ui/common/api/callApi';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			redirect: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({
			[name]: value,
		});

		return;
	}

	async handleSubmit(event) {
		event.preventDefault();

		const url = API_URL + '/signup';
		const options = {
			method: Method.POST,
		};
		const data = {
			username: this.state.username,
			password: this.state.password,
		};

		await callApi(url, options, data)
			.then((data) => {
				if (data.status === Status.OK) {
					this.setState({
						redirect: true,
					});
				} else {
					Swal({
						title: 'Username Taken',
						text:
							'Username already in use.\nIf someone has taken your username please contact the administators',
						icon: 'error',
					});
				}
			})
			.catch((error) => {
				Swal({
					title: 'Internal Server Error',
					icon: 'error',
				});
			});
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to='/index' />;
		}

		return (
			<>
				<Head>
					<title>Create Next App</title>
					<link rel='icon' href='/favicon.ico' />
					<link
						rel='stylesheet'
						href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
						integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T'
						crossOrigin='anonymous'
					></link>
				</Head>
				<main>
					<Header />
					<div className='container'>
						<h1>Signup Page</h1>
						<Row>
							<Col>
								<Form onSubmit={this.handleSubmit}>
									<FormGroup>
										<Label>Username</Label>
										<Input type='text' name='username' placeholder='Username' />
									</FormGroup>
									<FormGroup>
										<Label>Password</Label>
										<Input type='text' name='password' placeholder='Password' />
									</FormGroup>
									<Button type='submit'>Sign Up</Button>
								</Form>
							</Col>
						</Row>
					</div>
				</main>
			</>
		);
	}
}
