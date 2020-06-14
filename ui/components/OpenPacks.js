import React from 'react';
import Swal from 'sweetalert';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Status } from '/nsfl-trading-cards/ui/common/api/httpStatus';
import { API_URL } from '/nsfl-trading-cards/ui/common/api/apiUrl';
import { callApi, Method } from '/nsfl-trading-cards/ui/common/api/callApi';
import Slider from 'react-slick';
import Layout from './Layout';
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
				console.log(response);
				if (response.status === Status.OK) {
					this.setState({
						canOpenAPack: response.data.canPurchasePack,
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
				console.log(response);
				if (response.status === Status.OK) {
					this.setState({
						pulledCards: response.data,
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
			return <div>Loading...</div>;
		}

		if (!this.state.pulledCards.length) {
			return (
				<Layout title='Open Packs'>
					<img src='https://cdn11.bigcommerce.com/s-0kvv9/images/stencil/1280x1280/products/180740/259845/nfl13opk__21846.1516121876.jpg'></img>
					<Button
						onClick={this.handleOnClick}
						disabled={this.state.canPurchasePack}
					>
						Open Pack
					</Button>
				</Layout>
			);
		}

		if (this.state.pulledCards !== 0) {
			return (
				<Layout title='Open Packs'>
					<Slider {...slickSettings}>
						{this.state.pulledCards.map((card, index) => (
							<div key={index}>
								<img src={card.image_url} />
							</div>
						))}
					</Slider>
				</Layout>
			);
		}
	}
}
