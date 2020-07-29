import React from 'react';
import Layout from './layout';
import { withRouter } from 'next/router';
import {
	Container,
	Row,
	Col,
	Form,
	FormGroup,
	Label,
	Input,
	Button,
	CustomInput,
} from 'reactstrap';
import Swal from 'sweetalert';
import { RARITY_LEVELS, TEAM_DEFAULT } from './../common/data/cards';
import { Status } from './../common/api/http-status';
import { API_URL } from './../common/api/api-url';
import { callApi, Method } from './../common/api/call-api';
import { NSFL_TEAMS } from './../common/data/teams';

const LABELS = {
	cardRarity: 'Card Rarity',
	playerName: 'Player Name',
	playerTeam: 'Player Team',
	nsflUsername: "Card Creator's NSFL Username",
	cardImageUrl: 'Card Image URL',
	approved: 'Approved',
	currentRotation: 'Current Rotation',
};

class CardEdit extends React.Component {
	constructor() {
		super();
		this.state = {
			'nsfl-username': '',
			'player-name': '',
			'player-team': TEAM_DEFAULT,
			'card-rarity': RARITY_LEVELS.DEFAULT,
			'card-image-url': '',
			'approved': false,
			'current-rotation': false,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async componentDidMount() {
		const cardId = this.props.router.query.cardId;
		const url = `${API_URL}/card/${cardId}`;
		const method = Method.GET;

		await callApi(url, method)
			.then((response) => {
				if (response.status === Status.OK) {
					const card = response.data;

					this.setState({
						'nsfl-username': card.submission_username,
						'player-name': card.player_name,
						'player-team': card.player_team,
						'card-rarity': card.rarity,
						'card-image-url': card.image_url,
						'approved': card.approved,
						'current-rotation': card.current_rotation,
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

	async handleSubmit(event) {
		event.preventDefault();

		const cardId = this.props.router.query.cardId;
		console.log('cardId:', cardId);
		const url = `${API_URL}/card/${cardId}`;
		console.log('url: ', url);
		const method = Method.GET;

		await callApi(url, method)
			.then((response) => {
				if (response.status === Status.OK) {
					const card = response.data;
					console.log('response', response);

					this.setState({
						'nsfl-username': card.submission_username,
						'player-name': card.player_name,
						'player-team': card.player_team,
						'card-rarity': card.rarity,
						'card-image-url': card.image_url,
						'approved': card.approved,
						'current-rotation': card.current_rotation,
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
			<Layout title='Edit a Card'>
				<Row>
					<Col>
						<Form onSubmit={this.handleSubmit}>
							<FormGroup>
								<Label>{LABELS.nsflUsername}</Label>
								<Input
									type='text'
									name='nsfl-username'
									placeholder={LABELS.nsflUsername}
									onChange={this.handleChange}
								/>
							</FormGroup>
							<FormGroup>
								<Label>{LABELS.playerName}</Label>
								<Input
									type='text'
									name='player-name'
									placeholder={LABELS.playerName}
									onChange={this.handleChange}
								/>
							</FormGroup>
							<FormGroup>
								<Label>{LABELS.playerTeam}</Label>
								<Input
									type='select'
									name='player-team'
									onChange={this.handleChange}
								>
									<option>{TEAM_DEFAULT}</option>
									{NSFL_TEAMS.map((team, index) => (
										<option
											key={index}
										>{`${team.CITY_NAME} ${team.TEAM_NAME}`}</option>
									))}
								</Input>
							</FormGroup>
							<FormGroup>
								<Label>{LABELS.cardRarity}</Label>
								<Input
									type='select'
									name='card-rarity'
									onChange={this.handleChange}
								>
									<option>{RARITY_LEVELS.DEFAULT}</option>
									<option>
										{RARITY_LEVELS.HALL_OF_FAME}
									</option>
									<option>{RARITY_LEVELS.AWARD}</option>
									<option>{RARITY_LEVELS.LEGEND}</option>
									<option>{RARITY_LEVELS.ALL_PRO}</option>
									<option>{RARITY_LEVELS.STAR}</option>
									<option>{RARITY_LEVELS.STARTER}</option>
									<option>{RARITY_LEVELS.BACKUP}</option>
								</Input>
							</FormGroup>
							<FormGroup>
								<Label>{LABELS.cardImageUrl}</Label>
								<Input
									type='text'
									name='card-image-url'
									placeholder={LABELS.cardImageUrl}
									onChange={this.handleChange}
								/>
							</FormGroup>
							<FormGroup>
								<Label>{LABELS.approved}</Label>
								<CustomInput type='switch' name='approved' />
							</FormGroup>
							<FormGroup>
								<Label>{LABELS.currentRotation}</Label>
								<CustomInput
									type='switch'
									name='current-rotation'
								/>
							</FormGroup>
							<Button color='primary' type='submit'>
								Submit
							</Button>
						</Form>
					</Col>
					<Col>
						<Container>
							{this.state.displayImage && (
								<img
									style={{
										maxHeight: '504px',
									}}
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

export default withRouter(CardEdit);
