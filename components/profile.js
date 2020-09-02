import React from 'react';
import Swal from 'sweetalert';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import ReactLoading from 'react-loading';
import { Status } from './../common/api/http-status';
import { API_URL } from './../common/api/api-url';
import { callApi, Method } from './../common/api/call-api';
import Layout from './layout';
import _filter from 'lodash/filter';

export default class Profile extends React.Component {
	constructor() {
		super();

		this.state = {
			username: '',
			isLoading: true,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	async componentDidMount() {
		const url = `${API_URL}/user/currentUser`;
		const method = Method.GET;

		await callApi(url, method)
			.then((response) => {
				if (response.status === Status.OK) {
					this.setState({
						username: response.data.nsfl_username,
						isLoading: false,
					});
				} else {
					Swal({
						title: 'Server Error',
						text: 'The server encountered an error',
						icon: 'error',
					});
				}
			})
			.catch((error) => {
				console.error(error);
				Swal({
					title: 'Server Error',
					text: 'The server encountered an error',
					icon: 'error',
				});
			});
	}

	handleChange(event) {
		const value = event.target.value;

		this.setState({
			username: value,
		});
	}

	async handleSubmit(event) {
		event.preventDefault();

		const checkUrl = `${API_URL}/user/search/${this.state.username}`;
		const checkMethod = Method.GET;

		await callApi(checkUrl, checkMethod).then((response) => {
			if (response.status === Status.OK) {
				if (response.data.nsfl_username) {
					Swal({
						title: 'Username Taken',
						text: 'That username is already in use. If this is your username please contact caltroit_red_flames',
						icon: 'error',
					});

					return;
				}
		const url = `${API_URL}/user/username`;
		const method = Method.PATCH;
		const data = {
			nsfl_username: this.state.username,
		};

		await callApi(url, method, data)
			.then((response) => {
				if (response.status === Status.OK) {
					Swal({
						title: 'Username Updated',
						icon: 'success',
					});
				} else {
					Swal({
						title: 'Server Error',
						text: 'The server encountered an error',
						icon: 'error',
					});
				}
			})
			.catch((error) => {
				console.error(error);
				Swal({
					title: 'Server Error',
					text: 'The server encountered an error',
					icon: 'error',
				});
			});
				}
			}
		});
	}

	render() {
		if (this.state.isLoading) {
			return <ReactLoading type={'bars'} height={'20%'} width={'20%'} />;
		}

		if (!this.state.username && this.state.username !== '') {
			return <div>API Failure...</div>;
		}

		return (
			<Layout title='Profile'>
				<Form onSubmit={this.handleSubmit}>
					<FormGroup>
						<Label>ISFL Username</Label>
						<Input
							type='text'
							value={this.state.username}
							name='nsfl-username'
							placeholder='ISFL Username'
							onChange={this.handleChange}
						></Input>
					</FormGroup>

					<Button color='primary' type='submit'>
						Update Profile
					</Button>
				</Form>
			</Layout>
		);
	}
}
