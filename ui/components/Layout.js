import Head from 'next/head';
import React from 'react';
import Router from 'next/router';
import { API_URL } from '/nsfl-trading-cards/ui/common/api/apiUrl';
import { callApi, Method } from '/nsfl-trading-cards/ui/common/api/callApi';
import { Status } from '/nsfl-trading-cards/ui/common/api/httpStatus';
import Header from './Header';

export default class App extends React.Component {
	constructor() {
		super();

		this.state = {
			authorized: false,
		};
	}

	async componentDidMount() {
		const url = `${API_URL}/auth/check`;
		const method = Method.GET;
		await callApi(url, method).then((response) => {
			if (response.status === Status.UNAUTHORIZED) {
				Router.push({
					pathname: `/signin`,
				});
			} else {
				this.setState({
					authorized: true,
				});
			}
		});
	}

	render() {
		if (!this.state.authorized) {
			return <div>Loading...</div>;
		} else {
			return (
				<>
					<Head>
						<title>{this.props.title}</title>
						<link rel='icon' href='/favicon.ico' />
						<link
							rel='stylesheet'
							href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
							integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T'
							crossOrigin='anonymous'
						/>
						{/* TODO: Find a way to only import this for pages that use slick */}
						<link
							rel='stylesheet'
							type='text/css'
							charset='UTF-8'
							href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
						/>
						<link
							rel='stylesheet'
							type='text/css'
							href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
						/>
					</Head>
					<Header />
					<main>
						<div className='container'>
							<h1>{this.props.title}</h1>
							{this.props.children}
						</div>
					</main>
				</>
			);
		}
	}
}
