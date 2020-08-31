import React from 'react';
import {
	Row,
	Container,
	CardDeck,
	Card,
	CardImg,
	CardBody,
	CardTitle,
} from 'reactstrap';
import Router from 'next/router';
import Layout from './layout';
import Slider from 'react-slick';

export default class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			'cards-to-display': [],
		};

		this.handleOnClick = this.handleOnClick.bind(this);
	}

	async componentDidMount() {
		const url = `${API_URL}/cards`;
		const method = Method.GET;

		await callApi(url, method)
			.then((response) => {
				console.log(response);
				if (response.status === Status.OK) {
					this.setState({
						'cards-to-display': response.data,
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

	handleOnClick(route) {
		Router.push({
			pathname: route,
		});
	}

	render() {
		return (
			<Layout title='Home'>
				<Container>
					<Row>
						<CardDeck>
							<Card className='ml-1 mr-1'>
								<CardImg
									onClick={() => {
										this.handleOnClick(`/open-packs`);
									}}
									src='https://i.imgur.com/rCe0RYr.png'
								/>
								<CardBody>
									<CardTitle>Open Packs</CardTitle>
								</CardBody>
							</Card>
							<Card className='ml-1 mr-1'>
								<CardImg
									onClick={() => {
										this.handleOnClick(
											`/collection/my-collection`
										);
									}}
									src='https://i.imgur.com/SNBNA1c.png'
								/>
								<CardBody>
									<CardTitle>My Collection</CardTitle>
								</CardBody>
							</Card>
							<Card className='ml-1 mr-1'>
								<CardImg
									onClick={() => {
										this.handleOnClick(`/player-list`);
									}}
									src='https://i.imgur.com/rNE5Sgv.png'
								/>
								<CardBody>
									<CardTitle>Other Collections</CardTitle>
								</CardBody>
							</Card>
						</CardDeck>
					</Row>
					<Row>
						<Slider
							{...{
								lazyLoad: 'ondemand',
								slidesToShow: 3,
								slidesToScroll: 1,
								nextArrow: <SampleNextArrow />,
								prevArrow: <SamplePrevArrow />,
								className: 'center',
								infinite: false,
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
							{this.state['cards'].map((card, index) => (
								<div style={{ maxWidth: '33%' }} key={index}>
									<img
										style={{
											maxHeight: '504px',
											margin: '2px',
										}}
										src={card.image_url}
									/>
									<Button
										onClick={() => {
											this.redirectToEditCard(card._id);
										}}
									>
										Edit Card
									</Button>
								</div>
							))}
						</Slider>
					</Row>
				</Container>
			</Layout>
		);
	}
}
