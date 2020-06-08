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
import { API_URL } from '/nsfl-trading-cards/ui/common/api/apiUrl';
import { callApi, Method } from '/nsfl-trading-cards/ui/common/api/callApi';
import { Status } from '/nsfl-trading-cards/ui/common/api/httpStatus';
import Layout from './Layout';

const IMAGE_URL_REGEX = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/g;
const LABELS = {
	cardRarity: 'Card Rarity',
	playerName: 'Player Name',
	nsflUsername: 'NSFL Username',
	cardImageUrl: 'Card Image URL',
};
const RARITY_LEVELS = {
	DEFAULT: 'Card Rarity',
	BRONZE: 'Bronze',
	SILVER: 'Silver',
	GOLD: 'Gold',
	PLATINUM: 'Platinum',
};

class SubmitCard extends React.Component {
	constructor() {
		super();
		this.state = {
			'nsfl-username': '',
			'player-name': '',
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

		if (this.state['card-rarity'] === RARITY_LEVELS.DEFAULT) {
			Swal({
				title: 'Submission Rejected',
				text: "Please select the card's rarity level",
				icon: 'error',
			});

			return;
		}

		if (this.isSubmissionLimitReached()) {
			Swal({
				title: 'Submission Rejected',
				text: 'Your submission limit for the day has been reached.',
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

		const url = API_URL + '/card';
		const data = {
			submission_username: this.state['nsfl-username'],
			player_name: this.state['player-name'],
			rarity: this.state['card-rarity'],
			image_url: this.state['card-image-url'],
			collection_ids: [],
		};
		const options = {
			method: Method.POST,
			data,
		};

		await callApi(url, options)
			.then((response) => {
				if (response.status === Status.OK) {
					Swal({
						title: 'Card Submitted',
						text: 'Thank you for your submission!',
						icon: 'success',
					});
				} else {
					Swal({
						title: 'Submission Error',
						text:
							'There was an error in your submission.\nIf you believe this is not error with your submission please contact the administrators.',
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

		return;
	}

	isValidImageUrl(imageUrl) {
		return imageUrl.match(IMAGE_URL_REGEX) != null;
	}

	isSubmissionLimitReached() {
		return false;
	}

	async saveCard(url, options, body) {
		const response = await callApi(url, options, body);
		return response;
	}

	isEmptyString(string) {
		return string === '';
	}

	render() {
		return (
			<Layout title='Submit a Card'>
				<h1>Submit a Card</h1>
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
								<Label>{LABELS.cardRarity}</Label>
								<Input
									type='select'
									name='card-rarity'
									onChange={this.handleChange}
								>
									<option>{RARITY_LEVELS.DEFAULT}</option>
									<option>{RARITY_LEVELS.BRONZE}</option>
									<option>{RARITY_LEVELS.SILVER}</option>
									<option>{RARITY_LEVELS.GOLD}</option>
									<option>{RARITY_LEVELS.PLATINUM}</option>
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
							<Button type='submit'>Submit</Button>
						</Form>
					</Col>
					<Col>
						<Container>
							{this.state.displayImage && (
								<img src={this.state['card-image-url']} />
							)}
						</Container>
					</Col>
				</Row>
			</Layout>
		);
	}
}

export default SubmitCard;
