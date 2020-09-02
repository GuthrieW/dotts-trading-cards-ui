import React from 'react';
import { NavbarBrand, Navbar, NavItem, NavLink, Nav, Button } from 'reactstrap';
import Swal from 'sweetalert';
import Router from 'next/router';
import { Status } from './../common/api/http-status';
import { API_URL } from './../common/api/api-url';
import { callApi, Method } from './../common/api/call-api';

export default class Header extends React.Component {
	constructor() {
		super();

		this.state = {
			isAdmin: false,
			isProcessor: false,
			isSubmitter: false,
			isLoading: true,
		};

		this.handleLogout = this.handleLogout.bind(this);
		this.handleEditProfile = this.handleEditProfile.bind(this);
		this.handleSubmitCard = this.handleSubmitCard.bind(this);
		this.handleProcessCards = this.handleProcessCards.bind(this);
		this.handleSearchUsers = this.handleSearchUsers.bind(this);
	}

	async componentDidMount() {
		const url = `${API_URL}/user/permissions`;
		const method = Method.GET;

		await callApi(url, method)
			.then((response) => {
				console.log(response);
				if (response.status !== Status.OK) {
					Swal({
						title: 'Server Error',
						text: 'The server encountered an error',
						icon: 'error',
					});
				} else {
					this.setState({
						isAdmin: response.data.is_admin,
						isProcessor: response.data.is_processor,
						isSubmitter: response.data.is_submitter,
						isLoading: false,
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

	async handleEditProfile() {
		Router.push({
			pathname: `/profile`,
		});
	}

	async handleSubmitCard() {
		Router.push({
			pathname: `/submit-card`,
		});
	}

	async handleProcessCards() {
		Router.push({
			pathname: `/process-cards`,
		});
	}

	async handleSearchCards() {
		Router.push({
			pathname: '/card-search',
		});
	}

	async handleSearchUsers() {
		Router.push({
			pathname: '/user-search',
		});
	}

	async handleLogout() {
		const url = `${API_URL}/auth/logout`;
		const method = Method.GET;

		await callApi(url, method)
			.then((response) => {
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

	render() {
		return (
			<div>
				<Navbar color='light' light expand='md'>
					<NavbarBrand href='/'>
						<img
							style={{
								maxHeight: '55px',
							}}
							className='mr-2'
							src={
								'https://cdn.discordapp.com/attachments/719409500292907029/720056809951461416/Dotts-Logo-red-black.png'
							}
						/>
						Trading Cards
					</NavbarBrand>
					<Nav className='mr-auto' navbar>
						<NavItem>
							<NavLink href='/open-packs'>Open Packs</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href='/collection/my-collection'>
								My Collection
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href='/player-list'>
								Other Collections
							</NavLink>
						</NavItem>
					</Nav>
					<Nav>
						{(this.state.isAdmin ||
							this.state.isProcessor ||
							this.state.isSubmitter) && (
							<>
								<NavItem>
									<Button
										className='ml-2'
										onClick={this.handleProcessCards}
									>
										Process Cards
									</Button>
								</NavItem>
								<NavItem>
									<Button
										className='ml-2'
										onClick={this.handleSubmitCard}
									>
										Submit a Card
									</Button>
								</NavItem>
								<NavItem>
									<Button
										className='ml-2'
										onClick={this.handleSearchCards}
									>
										Edit a Card
									</Button>
								</NavItem>
								<NavItem>
									<Button
										className='ml-2'
										onClick={this.handleSearchUsers}
									>
										Edit a User
									</Button>
								</NavItem>
							</>
						)}

						<NavItem>
							<Button
								className='ml-2'
								onClick={this.handleEditProfile}
							>
								Edit Profile
							</Button>
						</NavItem>
						<NavItem>
							<Button
								className='ml-2'
								onClick={this.handleLogout}
							>
								Logout
							</Button>
						</NavItem>
					</Nav>
				</Navbar>
			</div>
		);
	}
}
