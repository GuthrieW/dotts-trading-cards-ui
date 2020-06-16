import React from 'react';
import Router from 'next/router';
import Swal from 'sweetalert';
import { Status } from '/dotts-trading-cards-ui/common/api/http-status';
import { API_URL } from '/dotts-trading-cards-ui/common/api/api-url';
import { callApi, Method } from '/dotts-trading-cards-ui/common/api/call-api';
import Layout from './Layout';
import Loading from './Loading';

export default class Cards extends React.Component {
	constructor() {
		super();
		this.state = {
			cards: [],
			isLoading: true,
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
						isLoading: false,
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
		const { cards, isLoading } = this.state;

		// if (isLoading) {
		// 	return <Loading />;
		// }

		if (!cards) {
			return <div>API Failure...</div>;
		}

		return (
			<Layout title='Cards'>
				{cards.map((card, index) => (
					<img
						style={{ maxHeight: '504px' }}
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
