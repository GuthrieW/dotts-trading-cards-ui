import React from 'react';
import { API_URL } from '../common/api/apiUrl';
import { callApi, Method } from '../common/api/callApi';
import Layout from './Layout';

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
			method: Method.GET,
		};

		await callApi(url, options).then((response) => {
			console.log('Promise returned');
			console.log(response);
			this.setState({
				cards: response.data,
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
			<Layout title='Cards'>
				{cards.map((card, index) => (
					<img key={index} src={card.image_url} />
				))}
			</Layout>
		);
	}
}
