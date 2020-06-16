import React from 'react';
import { Row } from 'reactstrap';
import Layout from './layout';

export default class Home extends React.Component {
	constructor() {
		super();

		this.bind;
	}

	render() {
		return (
			<Layout title='Home'>
				<Row
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
				</Row>
				<Row
					style={{
						display: 'grid',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: '5px',
					}}
				>
					<a className='btn btn-primary' href='/submit-card'>
						<span style={{ color: 'white' }}>Submit a Card</span>
					</a>
				</Row>
			</Layout>
		);
	}
}
