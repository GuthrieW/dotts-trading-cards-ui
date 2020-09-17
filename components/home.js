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
import { API_URL } from './../common/api/api-url';
import { callApi, Method } from './../common/api/call-api';
import Swal from 'sweetalert';
import { Status } from './../common/api/http-status';

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

export default class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			'cards-to-display': [],
		};

		this.handleOnClick = this.handleOnClick.bind(this);
	}

	async componentDidMount() {
		const url = `${API_URL}/card/cards`;
		const method = Method.GET;

		await callApi(url, method)
			.then((response) => {
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
									src='https://cdn.discordapp.com/attachments/719410556578299954/754141278429511780/PIC_1v2.png'
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
									src='https://cdn.discordapp.com/attachments/719410556578299954/754141278735695983/PIC_4v2.png'
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
									src='https://cdn.discordapp.com/attachments/719410556578299954/754141279042142249/PIC_3v2.png'
								/>
								<CardBody>
									<CardTitle>Other Collections</CardTitle>
								</CardBody>
							</Card>
						</CardDeck>
					</Row>
					<Slider
						className='mt-5'
						{...{
							slidesToShow: 3,
							slidesToScroll: 1,
							nextArrow: <SampleNextArrow />,
							prevArrow: <SamplePrevArrow />,
							className: 'center',
							infinite: true,
							speed: 500,
							pauseOnHover: true,
							autoplay: true,
							autoplaySpeed: 2000,
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
						{this.state['cards-to-display'].map((card, index) => (
							<div style={{ maxWidth: '33%' }} key={index}>
								<img
									style={{
										maxHeight: '504px',
										margin: '2px',
									}}
									src={card.image_url}
								/>
							</div>
						))}
					</Slider>
				</Container>
			</Layout>
		);
	}
}
