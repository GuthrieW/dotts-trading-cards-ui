import Head from 'next/head';
import React from 'react';
import Header from '../../components/Header';
import { API_URL } from '../../common/api/apiUrl';
import { callApi, METHOD } from '/nsfl-trading-cards/ui/common/api/callApi';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			cards: [],
			isLoaded: false,
		};
	}

	async componentDidMount() {
		const url = API_URL + '/card';
		const options = {
			method: METHOD.GET,
		};

		await callApi(url, options).then((data) => {
			this.setState({
				cards: data,
				isLoaded: true,
			});
		});
	}

	render() {
		const { cards, isLoaded } = this.state;

		if (!isLoaded) {
			return <div>Loading...</div>;
		}

		return (
			<>
				<Head>
					<title>My Collection</title>
					<link rel='icon' href='/favicon.ico' />
					<link
						rel='stylesheet'
						href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
						integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T'
						crossOrigin='anonymous'
					/>
				</Head>
				<Header />
				<main>
					<div className='container'>
						{cards.map((card, index) => (
							<img key={index} src={card.image_url} />
						))}
					</div>
				</main>
			</>
		);
	}
}
