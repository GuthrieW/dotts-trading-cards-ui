import React from 'react';
import { NavbarBrand, Navbar, NavItem, NavLink, Nav, Button } from 'reactstrap';
import Swal from 'sweetalert';
import Router from 'next/router';
import NsflLogo from './../public/favicon.ico';
import { callApi, Method } from '/nsfl-trading-cards/ui/common/api/callApi';
import { API_URL } from '/nsfl-trading-cards/ui/common/api/apiUrl';
import { Status } from '/nsfl-trading-cards/ui/common/api/httpStatus';

export default class Header extends React.Component {
	constructor() {
		super();

		this.handleLogout = this.handleLogout.bind(this);
		this.handleEditProfile = this.handleEditProfile.bind(this);
	}

	async handleEditProfile() {
		Router.push({
			pathname: `/profile`,
		});
	}

	async handleLogout() {
		const url = `${API_URL}/auth/logout`;
		const method = Method.GET;

		await callApi(url, method).then((response) => {
			if (response.status !== Status.OK) {
				Swal({
					title: 'Server Error',
					text: 'The server encountered an error',
					icon: 'error',
				});
			} else {
				Router.push({
					pathname: `/signin`,
				});
			}
		});
	}

	render() {
		return (
			<div>
				<Navbar color='light' light expand='md'>
					<NavbarBrand href='/'>
						<img className='mr-2' src={NsflLogo} />
						NSFL Trading Cards
					</NavbarBrand>
					<Nav className='mr-auto' navbar>
						<NavItem>
							<NavLink href='/collection/my-collection'>My Collection</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href='/player-list'>Other Collections</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href='/open-packs'>Open Packs</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href='/submit-card'>Submit a Card</NavLink>
						</NavItem>
					</Nav>
					<Nav>
						<NavItem>
							<Button onClick={this.handleEditProfile}>Edit Profile</Button>
						</NavItem>
						<NavItem>
							<Button onClick={this.handleLogout}>Logout</Button>
						</NavItem>
					</Nav>
				</Navbar>
			</div>
		);
	}
}
