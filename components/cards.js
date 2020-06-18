import React from 'react';
import Router from 'next/router';
import Swal from 'sweetalert';
import ReactLoading from 'react-loading';
import { Status } from './../common/api/http-status';
import { API_URL } from './../common/api/api-url';
import { callApi, Method } from './../common/api/call-api';
import Layout from './layout';

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

		if (this.state.isLoading) {
			return <ReactLoading type={'bars'} height={'20%'} width={'20%'} />;
		}

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
