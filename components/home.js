import React from 'react';
import {
	Row,
	Col,
	Container,
	Card,
	CardImg,
	CardBody,
	CardTitle,
} from 'reactstrap';
import Router from 'next/router';
import Layout from './layout';

export default class Home extends React.Component {
	constructor() {
		super();

		this.handleOnClick = this.handleOnClick.bind(this);
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
						<Col>
							<Card className='ml-1 mr-1'>
								<CardImg
									onClick={() => {
										this.handleOnClick(`/open-pack`);
									}}
									src='https://i.imgur.com/e2wFkJp.png'
								/>
								<CardBody>
									<CardTitle>Open Packs</CardTitle>
								</CardBody>
							</Card>
						</Col>
						<Col>
							<Card className='ml-1 mr-1'>
								<CardImg
									onClick={() => {
										this.handleOnClick(
											`/collection/my-collection`
										);
									}}
									src='https://i.imgur.com/JRQQptU.png'
								/>
								<CardBody>
									<CardTitle>My Collection</CardTitle>
								</CardBody>
							</Card>
						</Col>
						<Col>
							<Card className='ml-1 mr-1'>
								<CardImg
									onClick={() => {
										this.handleOnClick(`/player-list`);
									}}
									src='https://i.imgur.com/Y7PQ3sj.png'
								/>
								<CardBody>
									<CardTitle>Other Collections</CardTitle>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</Layout>
		);
	}
}
