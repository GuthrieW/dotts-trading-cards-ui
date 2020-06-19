import Head from 'next/head';
import { Navbar, NavbarBrand, Container, Row, Col } from 'reactstrap';
import { API_URL } from './../common/api/api-url';
import SigninButton from './../public/google-signin-buttons/signin.png';

export default class Signin extends React.Component {
	constructor() {
		super();

		this.handleOnClick = this.handleOnClick.bind(this);
	}

	async handleOnClick() {
		const authenticationUrl = `${API_URL}/auth/google`;
		window.location.href = authenticationUrl;
	}

	render() {
		return (
			<>
				<Head>
					<title>Sign In</title>
					<link rel='icon' href='./..public/favicon.ico' />
					<link
						rel='stylesheet'
						href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
						integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T'
						crossOrigin='anonymous'
					/>
				</Head>
				<Navbar color='light' light expand='md'>
					<NavbarBrand>
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
				</Navbar>
				<main>
					<img width='100%' src='https://i.imgur.com/SyAWYRe.png' />
					<div className='container'>
						<div className='center'>
							<img
								src={SigninButton}
								onClick={this.handleOnClick}
							/>
						</div>
					</div>
				</main>
			</>
		);
	}
}
