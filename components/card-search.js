import React from 'react';
import Layout from './layout';
import Swal from 'sweetalert';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { API_URL } from './../common/api/api-url';
import { Status } from './../common/api/http-status';
import { callApi, Method } from './../common/api/call-api';
import Slider from 'react-slick';

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div className={className} style={{ ...style }} onClick={onClick}>
			<img
				style={{ width: 20, height: 20 }}
				src='https://image.flaticon.com/icons/svg/271/271228.svg'
			/>
		</div>
	);
}

function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div className={className} style={{ ...style }} onClick={onClick}>
			<img
				style={{ width: 20, height: 20 }}
				src='https://image.flaticon.com/icons/svg/271/271220.svg'
			/>
		</div>
	);
}

export default class CardSearch extends React.Component {
	constructor() {
		super();
		this.state = {
			'player-name': '',
			'cards': [],
			'display-images': false,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
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
		console.log('player-name: ', this.state['player-name']);

		if (this.state['player-name'] === '') {
			Swal({
				title: 'Query rejected',
				text: 'Please provide a player name',
				icon: 'error',
			});
			return;
		}

		const url = `${API_URL}/card/search/${this.state['player-name']}`;
		const method = Method.GET;

		await callApi(url, method)
			.then((response) => {
				console.log(response);
				if (response.status === Status.OK) {
					this.setState({
						cards: response.data,
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
		console.log('Cards', this.state['cards']);

		this.state['cards'].map((card, index) => {
			console.log(`${card.player_name} - ${card.image_url}`);
		});

		return (
			<Layout title='Card Search'>
				<Row>
					<Col>
						<Form onSubmit={this.handleSubmit}>
							<FormGroup>
								<Label>Player Name</Label>
								<Input
									type='text'
									name='player-name'
									placeholder='Player Name'
									onChange={this.handleChange}
								/>
							</FormGroup>
							<Button color='primary' type='submit'>
								Search
							</Button>
						</Form>
						<Slider
							{...{
								lazyLoad: 'ondemand',
								slidesToShow: 3,
								slidesToScroll: 1,
								nextArrow: <SampleNextArrow />,
								prevArrow: <SamplePrevArrow />,
								className: 'center',
								infinite: this.state['cards'].length < 3,
								speed: 500,
								responsive: [
									{
										breakpoint: 1512,
										settings: {
											slidesToShow: 2,
										},
									},
									{
										breakpoint: 1008,
										settings: {
											slidesToShow: 1,
										},
									},
								],
							}}
						>
							<div style={{ maxWidth: '33%' }}>
								<img
									style={{
										maxHeight: '504px',
										margin: '2px',
									}}
									src='https://i.imgur.com/EDch8Gc.png'
								/>
							</div>
							{/* {this.state['cards'].map((card, index) => {
								<div style={{ maxWidth: '33%' }} key={index}>
									<img
										style={{
											maxHeight: '504px',
											margin: '2px',
										}}
										src={card.image_url}
									/>
								</div>;
							})} */}
						</Slider>
					</Col>
				</Row>
			</Layout>
		);
	}
}
