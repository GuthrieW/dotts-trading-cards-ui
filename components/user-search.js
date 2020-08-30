import React from 'react';
import Layout from './layout';
import Swal from 'sweetalert';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { API_URL } from './../common/api/api-url';
import { Status } from './../common/api/http-status';
import { callApi, Method } from './../common/api/call-api';
import Router from 'next/router';

export default class CardSearch extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			user: {},
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.redirectToEditCard = this.redirectToEditUser.bind(this);
	}

	async handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;

		this.setState({
			[name]: value,
		});

		return;
	}

	async handleSubmit(event) {
		event.preventDefault();

		if (this.state['username'] === '') {
			Swal({
				title: 'Query rejected',
				text: 'Please provide a username',
				icon: 'error',
			});
			return;
		}

		const url = `${API_URL}/user/search/${this.state['username']}`;
		const method = Method.GET;

		await callApi(url, method)
			.then((response) => {
				if (response.status === Status.OK) {
					if (response.data != 'USER_NOT_FOUND') {
						this.setState({
							user: response.data,
						});
						redirectToEditUser(response.data._id);
					} else {
						Swal({
							title: 'User not found',
							icon: 'warning',
						});
					}
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

	async redirectToEditUser(userId) {
		Router.push({
			pathname: `/user-edit`,
			query: { userId: userId },
		});
	}

	render() {
		return (
			<Layout title='User Search'>
				<Row>
					<Col>
						<Form onSubmit={this.handleSubmit}>
							<FormGroup>
								<Label>Username</Label>
								<Input
									type='text'
									name='username'
									placeholder='Username'
									onChange={this.handleChange}
								/>
							</FormGroup>
							<Button color='primary' type='submit'>
								Search
							</Button>
						</Form>
					</Col>
				</Row>
			</Layout>
		);
	}
}
