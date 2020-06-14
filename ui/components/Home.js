import React from 'react';
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
					<Button>Open Packs</Button>
				</Row>
				<Row
					style={{
						display: 'grid',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: '5px',
					}}
				>
					<Button>View Your Collection</Button>
				</Row>
				<Row
					style={{
						display: 'grid',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: '5px',
					}}
				>
					<Button>View Other Members' Collections</Button>
				</Row>
				<Row
					style={{
						display: 'grid',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: '5px',
					}}
				>
					<Button>Submit a Card</Button>
				</Row>
			</Layout>
		);
	}
}
