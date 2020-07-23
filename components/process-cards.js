import React from 'react';
import {
	Container,
	Row,
	Col,
	Form,
	Label,
	FormGroup,
	Input,
	Button,
} from 'reactstrap';
import Swal from 'sweetalert';
import { Status } from '../common/api/http-status';
import { API_URL } from '../common/api/api-url';
import { callApi, Method } from '../common/api/call-api';
import Layout from './layout';

const LABELS = {
	cardRarity: 'Card Rarity',
	playerName: 'Player Name',
	playerTeam: 'Player Team',
	nsflUsername: 'NSFL Username',
	cardImageUrl: 'Card Image URL',
};

class ProcessCards extends React.Component {
	constructor() {
		super();
		this.state = {
			'_id': '',
			'nsfl-username': '',
			'player-name': '',
			'player-team': '',
			'card-rarity': '',
			'card-image-url': '',
			'can-process-card': false,
		};

		this.getUnapprovedCard = this.getUnapprovedCard.bind(this);
		this.approveCard = this.approveCard.bind(this);
		this.deleteCard = this.deleteCard.bind(this);
	}

	async componentDidMount() {
		this.getUnapprovedCard();
	}

	async getUnapprovedCard() {
		const url = `${API_URL}/card/getUnapprovedCard`;
		const method = Method.GET;

		await callApi(url, method).then((response) => {
			if (response.data == null) {
				Swal({
					title: 'No cards',
					text: 'All cards have been processed, thank you!',
					icon: 'success',
				});

				this.setState({
					'_id': '',
					'nsfl-username': '',
					'player-name': '',
					'player-team': '',
					'card-rarity': '',
					'card-image-url': '',
					'can-process-card': false,
				});

				return;
			}

			if (response.status === Status.OK) {
				this.setState({
					'_id': response.data._id,
					'nsfl-username': response.data.submission_username,
					'player-name': response.data.player_name,
					'player-team': response.data.player_team,
					'card-rarity': response.data.rarity,
					'card-image-url': response.data.image_url,
					'can-process-card': true,
				});
			} else {
				Swal({
					title: 'Server Error',
					text: 'The server encountered an error',
					icon: 'error',
				});
			}
		});

		return;
	}

	async approveCard() {
		this.setState({
			'can-process-card': false,
		});

		const url = `${API_URL}/card/approveCard`;
		const method = Method.POST;
		const data = {
			cardId: this.state['_id'],
		};

		await callApi(url, method, data)
			.then((response) => {
				if (response.status === Status.OK) {
					Swal({
						title: 'Card Approved',
						icon: 'success',
					});
				} else if (response.status === Status.UNAUTHORIZED) {
					Swal({
						title: 'Unauthorized',
						text: 'Only admins are authorized to approve cards',
						icon: 'error',
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

		this.getUnapprovedCard();
		return;
	}

	async deleteCard() {
		this.setState({
			'can-process-card': false,
		});

		const url = `${API_URL}/card/${this.state['_id']}`;
		const method = Method.DELETE;

		await callApi(url, method)
			.then((response) => {
				if (response.status === Status.OK) {
					Swal({
						title: 'Card Deleted',
						icon: 'success',
					});
				} else if (response.status === Status.UNAUTHORIZED) {
					Swal({
						title: 'Unauthorized',
						text: 'Only admins are authorized to delete cards',
						icon: 'error',
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

		this.getUnapprovedCard();
		return;
	}

	render() {
		return (
			<Layout title='Approve a Card'>
				<Row>
					<Col>
						<Form>
							<FormGroup>
								<Label>{LABELS.nsflUsername}</Label>
								<Input
									type='text'
									value={this.state['nsfl-username']}
									name='nsfl-username'
									disabled={true}
								/>
							</FormGroup>
							<FormGroup>
								<Label>{LABELS.playerName}</Label>
								<Input
									type='text'
									value={this.state['player-name']}
									name='player-name'
									disabled={true}
								/>
							</FormGroup>
							<FormGroup>
								<Label>{LABELS.playerTeam}</Label>
								<Input
									type='text'
									value={this.state['player-team']}
									name='player-team'
									disabled={true}
								></Input>
							</FormGroup>
							<FormGroup>
								<Label>{LABELS.cardRarity}</Label>
								<Input
									type='text'
									value={this.state['card-rarity']}
									name='card-rarity'
									disabled={true}
								></Input>
							</FormGroup>
							<FormGroup>
								<Label>{LABELS.cardImageUrl}</Label>
								<Input
									type='text'
									value={this.state['card-image-url']}
									name='card-image-url'
									disabled={true}
								/>
							</FormGroup>
							<FormGroup>
								<Button
									type='button'
									color='success'
									className='btn m-2'
									disabled={!this.state['can-process-card']}
									onClick={this.approveCard}
								>
									Approve Card
								</Button>
							</FormGroup>
							<FormGroup>
								<Button
									type='button'
									color='danger'
									className='btn m-2'
									disabled={!this.state['can-process-card']}
									onClick={this.deleteCard}
								>
									Delete Card
								</Button>
							</FormGroup>
						</Form>
					</Col>
					<Col>
						<Container>
							{this.state['can-process-card'] && (
								<img
									style={{ maxHeight: '504px' }}
									src={this.state['card-image-url']}
								/>
							)}
						</Container>
					</Col>
				</Row>
			</Layout>
		);
	}
}

export default ProcessCards;
