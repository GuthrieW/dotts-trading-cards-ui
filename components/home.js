import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import Layout from './layout';

export default class Home extends React.Component {
	constructor() {
		super();

		this.bind;
	}

	render() {
		return (
			<Layout title='Home'>
				<Container>
					<Row>
						<a href='/open-packs'>
							<img src='https://i.imgur.com/e2wFkJp.png' />
						</a>
					</Row>
					<Row>
						<Col>
							<a href='/collection/my-collection'>
								<img src='https://i.imgur.com/JRQQptU.png' />
							</a>
						</Col>
						<Col>
							<a href='/player-list'>
								<img src='https://i.imgur.com/Y7PQ3sj.png' />
							</a>
						</Col>
					</Row>
				</Container>

				{/* <Row
					style={{
						display: 'grid',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: '5px',
					}}
				>
					<a className='btn btn-primary' href='/open-packs'>
						<span style={{ color: 'white' }}>Open Packs</span>
					</a>
				</Row>
				<Row
					style={{
						display: 'grid',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: '5px',
					}}
				>
					<a
						className='btn btn-primary'
						href='/collection/my-collection'
					>
						<span style={{ color: 'white' }}>
							View Your Collection
						</span>
					</a>
				</Row>
				<Row
					style={{
						display: 'grid',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: '5px',
					}}
				>
					<a className='btn btn-primary' href='/player-list'>
						<span style={{ color: 'white' }}>
							View Other Members' Collections
						</span>
					</a>
				</Row> */}
			</Layout>
		);
	}
}
