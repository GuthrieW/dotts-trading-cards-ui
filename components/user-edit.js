import React from 'react';
import Layout from './layout';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Swal from 'sweetalert';
import { Status } from './../common/api/http-status';
import { API_URL } from './../common/api/api-url';
import { callApi, Method } from './../common/api/call-api';

const LABELS = {
	cardRarity: 'Card Rarity',
	playerName: 'Player Name',
	playerTeam: 'Player Team',
	nsflUsername: "Card Creator's ISFL Username",
	cardImageUrl: 'Card Image URL',
	approved: 'Approved',
	currentRotation: 'Current Rotation',
};

export default class UserEdit extends React.Component {
	constructor() {
		super();
		this.state = {
			'username': '',
			'number-of-packs': 0,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	async componentDidMount() {
		const userId = this.props.router.query.userId;
		const url = `${API_URL}/user/${userId}`;
		const method = Method.GET;

		await callApi(url, method)
			.then((response) => {
				if (response.status === Status.OK) {
					this.setState({
						user: response.data,
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

		const url = `${API_URL}/user/updateNumberOfPacks`;
		const method = Method.POST;
		const data = {
			_id: this.state['username'],
			numberOfPacks: this.state['number-of-packs'],
		};

		await callApi(url, method, data)
			.then((response) => {
				if (response.status === Status.OK) {
					Swal({
						title: 'User Updated',
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
		return (
			<Layout title='Edit a User'>
				<Row>
					<Col>
						<Form>
							<FormGroup>
								<Label>{LABELS.nsflUsername}</Label>
								<Input
									type='text'
									name='username'
									value={this.state['username']}
									placeholder={LABELS.nsflUsername}
									onChange={this.handleChange}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Number of Packs Available</Label>
								<Input
									type='number'
									disabled={
										!(
											this.state.isAdmin ||
											this.state.isProcessor ||
											this.state.isSubmitter
										)
									}
									name='number-of-packs'
									value={this.state['number-of-packs']}
									onChange={this.handleChange}
								/>
							</FormGroup>
							<Button color='primary' type='submit'>
								Update
							</Button>
						</Form>
					</Col>
				</Row>
			</Layout>
		);
	}
}
