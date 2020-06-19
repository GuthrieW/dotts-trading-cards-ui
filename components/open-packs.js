import React from 'react';
import Swal from 'sweetalert';
import { Button, Row, Col } from 'reactstrap';
import ReactLoading from 'react-loading';
import { Status } from './../common/api/http-status';
import { API_URL } from './../common/api/api-url';
import { callApi, Method } from './../common/api/call-api';
import Slider from 'react-slick';
import Layout from './layout';
import _filter from 'lodash/filter';

const slickSettings = {
	lazyLoad: 'ondemand',
	slidesToShow: 3,
	slidesToScroll: 1,
	nextArrow: <SampleNextArrow />,
	prevArrow: <SamplePrevArrow />,
	className: 'center',
	centerPadding: '20px',
	infinite: true,
	speed: 500,
};

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div className={className} style={{ ...style }} onClick={onClick}>
			<img
				style={{ width: 20, height: 20 }}
				src='https://image.flaticon.com/icons/svg/126/126490.svg'
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
				src='https://image.flaticon.com/icons/svg/126/126492.svg'
			/>
		</div>
	);
}

export default class OpenPacks extends React.Component {
	constructor() {
		super();

		this.state = {
			isLoading: true,
			canPurchasePack: false,
			pulledCards: [],
		};

		this.handleOnClick = this.handleOnClick.bind(this);
	}

	async componentDidMount() {
		const url = `${API_URL}/user/canPurchasePack`;
		const method = Method.GET;

		await callApi(url, method)
			.then((response) => {
				if (response.status === Status.OK) {
					this.setState({
						canPurchasePack: response.data,
						isLoading: false,
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

	async handleOnClick() {
		const url = `${API_URL}/card/purchasePack`;
		const method = Method.GET;

		await callApi(url, method)
			.then((response) => {
				if (response.status === Status.OK) {
					this.setState({
						pulledCards: response.data,
						canPurchasePack: false,
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
		if (this.state.isLoading) {
			return <ReactLoading type={'bars'} height={'20%'} width={'20%'} />;
		}

		if (!this.state.pulledCards.length) {
			return (
				<Layout title='Open Packs'>
					<div
						style={{
							display: 'grid',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Row>
							<Col>
								<img
									style={{ maxHeight: '504px' }}
									src='https://cdn.discordapp.com/attachments/719408889141133352/723585746107236402/Pack_w_swap.png'
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<div
									style={{
										display: 'grid',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<Button
										color='primary'
										className='btn'
										onClick={this.handleOnClick}
										disabled={!this.state.canPurchasePack}
									>
										Open Pack
									</Button>
								</div>
							</Col>
						</Row>
					</div>
				</Layout>
			);
		}

		if (this.state.pulledCards !== 0) {
			return (
				<Layout title='Open Packs'>
					<Slider {...slickSettings}>
						{this.state.pulledCards.map((card, index) => (
							<div key={index}>
								<img
									style={{ maxHeight: '504px' }}
									src={card.image_url}
								/>
							</div>
						))}
					</Slider>
				</Layout>
			);
		}
	}
}
