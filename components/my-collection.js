import React from 'react';
import { Card, Collapse, CardImg, CardBody, Row } from 'reactstrap';
import Slider from 'react-slick';
import Swal from 'sweetalert';
import Layout from './layout';
import { Status } from './../common/api/http-status';
import { API_URL } from './../common/api/api-url';
import { callApi, Method } from './../common/api/call-api';
import { NSFL_TEAMS } from '../common/data/teams';

let slickSettings = {
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

export default class MyCollection extends React.Component {
	constructor() {
		super();
		let state = {};
		for (const team of NSFL_TEAMS) {
			state[`${team.CITY_NAME}-${team.TEAM_NAME}-collapse`] = false;
		}

		for (const team of NSFL_TEAMS) {
			state[`${team.CITY_NAME}-${team.TEAM_NAME}-cards`] = [];
			state[`${team.CITY_NAME}-${team.TEAM_NAME}-isLoading`] = true;
		}

		this.state = state;

		this.handleOnClick = this.handleOnClick.bind(this);
	}

	async componentDidMount() {
		for (const team of NSFL_TEAMS) {
			const url = `${API_URL}/card/team`;
			const method = Method.POST;
			const data = {
				teamName: `${team.CITY_NAME} ${team.TEAM_NAME}`,
			};

			await callApi(url, method, data)
				.then((response) => {
					if (response.status === Status.OK) {
						this.setState({
							[`${team.CITY_NAME}-${team.TEAM_NAME}-cards`]: response.data,
							[`${team.CITY_NAME}-${team.TEAM_NAME}-isLoading`]: false,
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
	}

	handleOnClick(collapse) {
		this.setState({
			[collapse]: !this.state[collapse],
		});
	}

	render() {
		for (const team of NSFL_TEAMS) {
			if (!this.state[`${team.CITY_NAME}-${team.TEAM_NAME}-cards`]) {
				return <div>API Failure...</div>;
			}
		}

		if (
			this.state[`${team.CITY_NAME}-${team.TEAM_NAME}-cards`].length < 3
		) {
			slickSettings.slidesToShow = this.state[
				`${team.CITY_NAME}-${team.TEAM_NAME}-cards`
			].length;
		}

		return (
			<Layout style={{ width: '100%' }} title='My Collection'>
				<Row>
					{NSFL_TEAMS.map((team, index) => (
						<Card style={{ width: '100%', border: 0 }} key={index}>
							<CardImg
								style={{ maxWidth: 500 }}
								onClick={() => {
									this.handleOnClick(
										`${team.CITY_NAME}-${team.TEAM_NAME}-collapse`
									);
								}}
								src={team.IMAGE_URL}
								alt={`${team.CITY_NAME} ${team.TEAM_NAME}`}
							/>
							<CardBody style={{ width: '100%' }}>
								<Collapse
									isOpen={
										this.state[
											`${team.CITY_NAME}-${team.TEAM_NAME}-collapse`
										]
									}
									name={`${team.CITY_NAME}-${team.TEAM_NAME}-collapse`}
								>
									<Slider {...slickSettings}>
										{this.state[
											`${team.CITY_NAME}-${team.TEAM_NAME}-cards`
										].map((card, index) => (
											<div
												style={{ maxWidth: '33%' }}
												key={index}
											>
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
								</Collapse>
							</CardBody>
						</Card>
					))}
				</Row>
			</Layout>
		);
	}
}
