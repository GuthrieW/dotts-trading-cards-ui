import React from 'react';
import Router from 'next/router';
import Swal from 'sweetalert';
import { Status } from '/nsfl-trading-cards/ui/common/api/httpStatus';
import Layout from './Layout';
import { API_URL } from '../common/api/apiUrl';
import { callApi, Method } from '../common/api/callApi';

export default class Cards extends React.Component {
	constructor() {
		super();
		this.state = {
			cards: [],
			isLoaded: false,
		};

		this.handleOnClick = this.handleOnClick.bind(this);
	}

	handleOnClick(cardId) {
		Router.push({
			pathname: `/card/card`,
			query: { cardId: cardId },
		});
	}

	async componentDidMount() {
		const url = `${API_URL}/card/cards`;
		const method = Method.GET;
		await callApi(url, method)
			.then((response) => {
				if (response.status === Status.OK) {
					this.setState({
						cards: response.data,
						isLoaded: true,
					});
				} else {
					Swal({
						title: 'Server Error',
						text: 'The server encountered an error',
						icon: 'error',
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
		const { cards, isLoaded } = this.state;

		if (!isLoaded) {
			return <div>Loading...</div>;
		}

		if (!cards) {
			return <div>API Failure...</div>;
		}

		return (
			<Layout title='Cards'>
				{cards.map((card, index) => (
					<img
						key={index}
						src={card.image_url}
						onClick={() => {
							this.handleOnClick(card._id);
						}}
					/>
				))}
			</Layout>
		);
	}
}

// export default Cards;
