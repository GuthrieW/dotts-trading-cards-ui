import React from 'react';
import { Container, Row, Col, Form, Label, FormGroup, Input } from 'reactstrap';
import Swal from 'sweetalert';
import { Status } from '../common/api/http-status';
import { API_URL } from '../common/api/api-url';
import { callApi, Method } from '../common/api/call-api';
import { NSFL_TEAMS } from '../common/data/teams';
import Layout from './layout';

const LABELS = {
	cardRarity: 'Card Rarity',
	playerName: 'Player Name',
	playerTeam: 'Player Team',
	nsflUsername: 'NSFL Username',
	cardImageUrl: 'Card Image URL',
};

class ApproveCard extends React.Component {
	constructor() {
		super();
		this.state = {
			'_id': '',
			'nsfl-username': '',
			'player-name': '',
			'player-team': TEAM_DEFAULT,
			'card-rarity': RARITY_LEVELS.DEFAULT,
			'card-image-url': '',
			'displayImage': false,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async componentDidMount() {}

	async handleSubmit(event) {
		event.preventDefault();

		const url = `${API_URL}/card/approve`;
		const method = Method.POST;
		const data = {
			_id: this.state['_id'],
		};

		await callApi(url, method, data)
			.then((response) => {
				if (response.status === Status.OK) {
					Swal({
						title: 'Card Approved',
						text: 'Thank you for approving the card!',
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

		return;
	}

	render() {
		return (
			<Layout title='Approve a Card'>
				<Row>
					<Col>
						<Form onSubmit={this.handleSubmit}>
							<FormGroup>
								<Label>{LABELS.nsflUsername}</Label>
								<Input
									type='text'
									name='nsfl-username'
									disabled={true}
								/>
							</FormGroup>
							<FormGroup>
								<Label>{LABELS.playerName}</Label>
								<Input
									type='text'
									name='player-name'
									disabled={true}
								/>
							</FormGroup>
							<FormGroup>
								<Label>{LABELS.playerTeam}</Label>
								<Input
									type='text'
									name='player-team'
									disabled={true}
								></Input>
							</FormGroup>
							<FormGroup>
								<Label>{LABELS.cardRarity}</Label>
								<Input
									type='text'
									name='card-rarity'
									disabled={true}
								></Input>
							</FormGroup>
							<FormGroup>
								<Label>{LABELS.cardImageUrl}</Label>
								<Input
									type='text'
									name='card-image-url'
									disabled={true}
								/>
							</FormGroup>
						</Form>
					</Col>
					<Col>
						<Container>
							{this.state.displayImage && (
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

export default ApproveCard;
