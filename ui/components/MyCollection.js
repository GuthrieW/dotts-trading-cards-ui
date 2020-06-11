import React from 'react';
import Layout from './Layout';
import { NSFL_TEAMS } from './../common/data/teams';
import { Card, Collapse, CardImg, CardBody, CardTitle } from 'reactstrap';
import Slider from 'react-slick';

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

const examplesCards = [
	{
		card:
			'https://cdn.discordapp.com/attachments/572797209087836172/574472629495529472/Cal_FOTL3.jpg',
	},
	{
		card:
			'https://media.discordapp.net/attachments/537644128066994197/587399505964564502/Michael_Fox_Hockey_Card_2.png',
	},
	{
		card:
			'https://media.discordapp.net/attachments/537644128066994197/587403805931339786/Jimmy_Slothface_Hockey_Card.png',
	},
	{
		card:
			'https://cdn.discordapp.com/attachments/572878492371255478/581971581669212161/image0.jpg',
	},
];

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
		let teamStates = {};
		for (const team of NSFL_TEAMS) {
			teamStates[`${team.CITY_NAME}-${team.TEAM_NAME}-collapse`] = false;
		}
		this.state = teamStates;

		this.handleOnClick = this.handleOnClick.bind(this);
	}

	handleOnClick(collapse) {
		this.setState({
			[collapse]: !this.state[collapse],
		});
	}

	render() {
		return (
			<Layout title='My Collection'>
				{NSFL_TEAMS.map((team, index) => (
					<Card style={{ border: 0 }} key={index}>
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
						<CardBody>
							<Collapse
								isOpen={
									this.state[`${team.CITY_NAME}-${team.TEAM_NAME}-collapse`]
								}
								name={`${team.CITY_NAME}-${team.TEAM_NAME}-collapse`}
							>
								<Slider {...slickSettings}>
									{examplesCards.map((cardUrl, index) => (
										<div key={index}>
											<img src={cardUrl.card} />
										</div>
									))}
								</Slider>
							</Collapse>
						</CardBody>
					</Card>
				))}
			</Layout>
		);
	}
}
