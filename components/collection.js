import React from 'react';
import { Card, Collapse, CardImg, CardBody, Row } from 'reactstrap';
import Slider from 'react-slick';
import Swal from 'sweetalert';
import ReactLoading from 'react-loading';
import { withRouter } from 'next/router';
import Layout from './layout';
import { Status } from './../common/api/http-status';
import { API_URL } from './../common/api/api-url';
import { callApi, Method } from './../common/api/call-api';
import { NSFL_TEAMS } from './../common/data/teams';

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

function stringEndsWith(string, endsWith) {
	return string.charAt(string.length - 1) === endsWith;
}

class Collection extends React.Component {
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
		state['username'] = '';
		state['username-isLoading'] = true;

		this.state = state;

		this.handleOnClick = this.handleOnClick.bind(this);
	}

	async componentDidMount() {
		const userId = this.props.router.query.userId;

		for (const team of NSFL_TEAMS) {
			const nsflTeamUrl = `${API_URL}/card/team/${userId}`;
			const nsflTeamMethod = Method.POST;
			const nsflTeamData = {
				teamName: `${team.CITY_NAME} ${team.TEAM_NAME}`,
			};

			await callApi(nsflTeamUrl, nsflTeamMethod, nsflTeamData)
				.then((response) => {
					console.log(response);
					this.setState({
						[`${team.CITY_NAME}-${team.TEAM_NAME}-isLoading`]: false,
					});

					if (response.status === Status.OK) {
						this.setState({
							[`${team.CITY_NAME}-${team.TEAM_NAME}-cards`]: response.data,
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

		const userUrl = `${API_URL}/user/`;
		const userMethod = Method.POST;
		const userData = {
			userId: userId,
		};
		await callApi(userUrl, userMethod, userData)
			.then((response) => {
				this.setState({
					['username']: response.data.nsfl_username,
					['username-isLoading']: false,
				});
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

	handleOnClick(collapse) {
		this.setState({
			[collapse]: !this.state[collapse],
		});
	}

	render() {
		if (this.state['username-isLoading']) {
			return <ReactLoading type={'bars'} height={'20%'} width={'20%'} />;
		}

		for (const team of NSFL_TEAMS) {
			if (this.state[`${team.CITY_NAME}-${team.TEAM_NAME}-isLoading`]) {
				return (
					<ReactLoading type={'bars'} height={'20%'} width={'20%'} />
				);
			}
		}

		for (const team of NSFL_TEAMS) {
			if (!this.state[`${team.CITY_NAME}-${team.TEAM_NAME}-cards`]) {
				return <div>API Failure...</div>;
			}
		}

		let displayUsername = '';
		if (stringEndsWith(this.state.username, 's')) {
			displayUsername = `${this.state.username}'`;
		} else {
			displayUsername = `${this.state.username}'s`;
		}

		return (
			<Layout
				style={{ width: '100%' }}
				title={`${displayUsername} Collection`}
			>
				{NSFL_TEAMS.map((team, index) => (
					<Row>
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
									<Slider
										{...{
											lazyLoad: 'ondemand',
											slidesToShow: 3,
											slidesToScroll: 1,
											nextArrow: <SampleNextArrow />,
											prevArrow: <SamplePrevArrow />,
											className: 'center',
											infinite: team.length < 3,
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
					</Row>
				))}
			</Layout>
		);
	}
}

export default withRouter(Collection);
