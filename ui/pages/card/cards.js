import Head from 'next/head';
import React from 'react';
import Header from '../../components/Header';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			cards: [],
			isLoaded: false,
		};
	}

	componentDidMount() {
		console.log('Mounted');
		fetch('http://localhost:8080/card')
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					cards: data,
					isLoaded: true,
				});
			})
			.catch(console.log);
	}

	render() {
		const { cards, isLoaded } = this.state;

		if (!isLoaded) {
			return <div>Loading...</div>;
		}

		console.log(cards);

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
						{cards.map((card) => (
							<>
								<img src={card.image_url} />
							</>
						))}
					</div>
				</main>
			</>
		);
	}
}
