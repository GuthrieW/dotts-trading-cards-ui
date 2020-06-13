import React from 'react';
import Swal from 'sweetalert';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Status } from '/nsfl-trading-cards/ui/common/api/httpStatus';
import { API_URL } from '/nsfl-trading-cards/ui/common/api/apiUrl';
import { callApi, Method } from '/nsfl-trading-cards/ui/common/api/callApi';
import Layout from './Layout';
import _filter from 'lodash/filter';

export default class Profile extends React.Component {
	constructor() {
		super();

		this.state = {
			username: '',
			isLoaded: false,
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
						isLoaded: true,
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

	render() {
		if (!this.state.isLoaded) {
			return <div>Loading...</div>;
		}

		if (!this.state.username) {
			return <div>API Failure...</div>;
		}

		return (
			<Layout title='Profile'>
				<Form onSubmit={this.handleSubmit}>
					<FormGroup>
						<Label>NSFL Username</Label>
						<Input
							type='text'
							value={this.state.username}
							name='nsfl-username'
							placeholder='NSFL Username'
							onChange={this.handleChange}
						></Input>
					</FormGroup>

					<Button type='submit'>Update Profile</Button>
				</Form>
			</Layout>
		);
	}
}
