import Head from 'next/head';
import { API_URL } from '/nsfl-trading-cards/ui/common/api/apiUrl';
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
					<link rel='icon' href='/favicon.ico' />
					<link
						rel='stylesheet'
						href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
						integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T'
						crossOrigin='anonymous'
					/>
				</Head>
				<main>
					<div className='container'>
						<h1>Sign In</h1>
						<img
							style={{ maxHeight: '504px' }}
							src={SigninButton}
							onClick={this.handleOnClick}
						/>
					</div>
				</main>
			</>
		);
	}
}
