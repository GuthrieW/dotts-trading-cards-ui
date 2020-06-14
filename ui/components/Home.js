import React from 'react';
import Router from 'next/router';
import {
	NavbarBrand,
	Navbar,
	NavItem,
	NavLink,
	Nav,
	Button,
	Row,
	Col,
} from 'reactstrap';
import Layout from './Layout';

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
						Open Packs
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
					<a className='btn btn-primary' href='/collection/my-collection'>
						View Your Collection
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
						View Other Members' Collections
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
						Submit a Card
					</a>
				</Row>
			</Layout>
		);
	}
}
