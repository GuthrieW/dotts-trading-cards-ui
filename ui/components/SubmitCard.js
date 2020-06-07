import Head from 'next/head';
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
import swal from 'sweetalert';

const IMAGE_URL_REGEX = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/g;
const CARD_WIDTH = 200;
const CARD_HEIGHT = 500;

function isValidImageUrl(imageUrl) {
	return imageUrl.match(IMAGE_URL_REGEX) != null;
}

function isSubmissionLimitReached() {
	return false;
}

function isEmptyString(string) {
	return string === '';
}

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			'nsfl-username': '',
			'player-name': '',
			'player-team': '',
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
				imageUrl: value,
				displayImage: isValidImageUrl(value),
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

		if (isEmptyString(this.state['nsfl-username'])) {
			swal({
				title: 'Submission Rejected',
				text: 'Please enter your NSFL username.',
				icon: 'error',
			});

			return;
		}

		if (isEmptyString(this.state['player-name'])) {
			swal({
				title: 'Submission Rejected',
				text: "Please enter the player's name.",
				icon: 'error',
			});

			return;
		}

		if (isEmptyString(this.state['player-team'])) {
			swal({
				title: 'Submission Rejected',
				text: "Please enter the player's team",
				icon: 'error',
			});

			return;
		}

		if (isSubmissionLimitReached()) {
			swal({
				title: 'Submission Rejected',
				text: 'Your submission limit for the day has been reached.',
				icon: 'error',
			});

			return;
		}

		if (!this.state.displayImage) {
			swal({
				title: 'Submission Rejected',
				text: 'Please enter a valid image URL.',
				icon: 'error',
			});

			return;
		}

		// TODO: add call to API that adds submission to the queue of submissions to be approved

		swal({
			title: 'Card Submitted',
			text: 'Thank you for your submission!',
			icon: 'success',
		});

		return;
	}

	render() {
		return (
			<>
				<Head>
					<title>Submit New Card</title>
					<link rel='icon' href='/favicon.ico' />
					<link
						rel='stylesheet'
						href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
						integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T'
						crossOrigin='anonymous'
					/>
				</Head>
				<main>
					<div className='container'>
						<Row>
							<Col>
								<Form onSubmit={this.handleSubmit}>
									<FormGroup>
										<Label>NSFL Username</Label>
										<Input
											type='text'
											name='nsfl-username'
											placeholder='NSFL Username'
											onChange={this.handleChange}
										/>
									</FormGroup>
									<FormGroup>
										<Label>Player Name</Label>
										<Input
											type='text'
											name='player-name'
											placeholder='Player Name'
											onChange={this.handleChange}
										/>
									</FormGroup>
									<FormGroup>
										<Label>Player Team</Label>
										<Input
											type='text'
											name='player-team'
											placeholder='Player Team'
											onChange={this.handleChange}
										/>
									</FormGroup>
									<FormGroup>
										<Label>Card Image URL</Label>
										<Input
											type='text'
											name='card-image-url'
											placeholder='Card Image URL'
											onChange={this.handleChange}
										/>
									</FormGroup>
									<Button type='submit'>Submit</Button>
								</Form>
							</Col>
							<Col>
								<Container>
									{this.state.displayImage && (
										<img
											src={this.state.imageUrl}
											width={CARD_WIDTH}
											height={CARD_HEIGHT}
										/>
									)}
								</Container>
							</Col>
						</Row>
					</div>
				</main>
			</>
		);
	}
}
