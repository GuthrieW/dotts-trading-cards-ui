import React from 'react';
import Layout from './Layout';
import { NSFL_TEAMS } from './../common/data/teams';
import { Card, Collapse, CardImg, CardBody, CardTitle } from 'reactstrap';

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
					<Card key={index}>
						<CardImg
							src={team.IMAGE_URL}
							alt={`${team.CITY_NAME} ${team.TEAM_NAME}`}
						/>
						<CardBody
							onClick={() => {
								this.handleOnClick(
									`${team.CITY_NAME}-${team.TEAM_NAME}-collapse`
								);
							}}
						>
							<CardTitle>{`${team.CITY_NAME} ${team.TEAM_NAME}`}</CardTitle>
							<Collapse
								isOpen={
									this.state[`${team.CITY_NAME}-${team.TEAM_NAME}-collapse`]
								}
								name={`${team.CITY_NAME}-${team.TEAM_NAME}-collapse`}
							>
								Hello
							</Collapse>
						</CardBody>
					</Card>
				))}
			</Layout>
		);
	}
}
