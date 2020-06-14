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

		this.state = {
			isAdmin = false,
			isLoading = true
		}

		this.handleResetCanPurchasePacks = this.handleResetCanPurchasePacks.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.handleEditProfile = this.handleEditProfile.bind(this);
	}

	async componentDidMount() {
		const url = `${API_URL}/user/isAdmin`;
		const method = Method.GET;

		await callApi(url, method).then((response) => {
			if (response.status !== Status.OK) {
				Swal({
					title: 'Server Error',
					text: 'The server encountered an error',
					icon: 'error',
				});
			} else {
				this.setState({
					isAdmin: response.data,
					isLoading: false
				})
			}
		})			.catch((error) => {
			console.error(error);
			Swal({
				title: 'Server Error',
				text: 'The server encountered an error',
				icon: 'error',
			});
		});;
	}

	async handleEditProfile() {
		Router.push({
			pathname: `/profile`,
		});
	}

	async handleResetCanPurchasePacks() {
		const url = `${API_URL}/user/resetCanPurchasePack`;
		const method = Method.PATCH;

		await callApi(url, method).then((response) => {
			if (response.status === Status.OK) {
				Swal({
					title: 'Success',
					text: 'Users may now purchaes packs again',
					icon: 'success',
				});
			} else {
				Swal({
					title: 'Server Error',
					text: 'The server encountered an error',
					icon: 'error',
				});
			}
		})			.catch((error) => {
			console.error(error);
			Swal({
				title: 'Server Error',
				text: 'The server encountered an error',
				icon: 'error',
			});
		});;
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
		})			.catch((error) => {
			console.error(error);
			Swal({
				title: 'Server Error',
				text: 'The server encountered an error',
				icon: 'error',
			});
		});;
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
						{this.state.isAdmin && (
							<NavItem>
								<Button onClick={this.handleResetCanPurchasePacks}>Reset Pack Purchasing</Button>
							</NavItem>
						)}
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
