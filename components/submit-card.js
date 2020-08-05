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
import { Status } from './../common/api/http-status';
import { API_URL } from './../common/api/api-url';
import { callApi, Method } from './../common/api/call-api';
import { NSFL_TEAMS } from './../common/data/teams';
import { RARITY_LEVELS, TEAM_DEFAULT } from './../common/data/cards';
import Layout from './layout';

const IMAGE_URL_REGEX = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/g;
const LABELS = {
	cardRarity: 'Card Rarity',
	playerName: 'Player Name',
	playerTeam: 'Player Team',
	nsflUsername: "Card Creator's NSFL Username",
	cardImageUrl: 'Card Image URL',
};

class SubmitCard extends React.Component {
	constructor() {
		super();
		this.state = {
			'nsfl-username': '',
			'player-name': '',
			'player-team': TEAM_DEFAULT,
			'card-rarity': RARITY_LEVELS.DEFAULT,
			'card-image-url': '',
			'displayImage': false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;

		if (name === 'card-image-url') {
			this.setState({
				'card-image-url': value,
				'displayImage': this.isValidImageUrl(value),
			});
		} else {
			this.setState({
				[name]: value,
			});
		}

		return;
	}

	async handleSubmit(event) {
		event.preventDefault();

		if (this.isEmptyString(this.state['nsfl-username'])) {
			Swal({
				title: 'Submission Rejected',
				text: 'Please enter your NSFL username.',
				icon: 'error',
			});

			return;
		}

		if (this.isEmptyString(this.state['player-name'])) {
			Swal({
				title: 'Submission Rejected',
				text: "Please enter the player's name.",
				icon: 'error',
			});

			return;
		}

		if (this.state['player-team'] === TEAM_DEFAULT) {
			Swal({
				title: 'Submission Rejected',
				text: "Please select the card's team.",
				icon: 'error',
			});

			return;
		}

		if (this.state['card-rarity'] === RARITY_LEVELS.DEFAULT) {
			Swal({
				title: 'Submission Rejected',
				text: "Please select the card's rarity level",
				icon: 'error',
			});

			return;
		}

		if (!this.state.displayImage) {
			Swal({
				title: 'Submission Rejected',
				text: 'Please enter a valid image URL.',
				icon: 'error',
			});

			return;
		}

		const url = `${API_URL}/card`;
		const method = Method.POST;
		const data = {
			submission_username: this.state['nsfl-username'],
			player_name: this.state['player-name'],
			player_team: this.state['player-team'],
			rarity: this.state['card-rarity'],
			image_url: this.state['card-image-url'],
			collection_ids: [],
		};

		await callApi(url, method, data)
			.then((response) => {
				if (response.status === Status.OK) {
					Swal({
						title: 'Card Submitted',
						text: 'Thank you for your submission!',
						icon: 'success',
					});
				} else if (response.status === Status.UNAUTHORIZED) {
					Swal({
						title: 'Unauthorized',
						text: 'Only admins are authorized to submit cards',
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

	isValidImageUrl(imageUrl) {
		return imageUrl.match(IMAGE_URL_REGEX) != null;
	}

	isEmptyString(string) {
		return string === '';
	}

	render() {
		return (
			<Layout title='Submit a Card'>
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
										{RARITY_LEVELS.ULTIMUS_CHAMPIONS}
									</option>
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

export default SubmitCard;
