import React from 'react';
import { API_URL } from '../common/api/apiUrl';
import { callApi, Method } from '../common/api/callApi';
import Layout from './Layout';
import { withRouter } from 'next/router';
import { Status } from '/nsfl-trading-cards/ui/common/api/httpStatus';
import Swal from 'sweetalert';

class Card extends React.Component {
	constructor() {
		super();
		this.state = {
			card: null,
			isLoaded: false,
		};
	}

	async componentDidMount() {
		const cardId = this.props.router.query.cardId;
		const url = `${API_URL}/card/card`;
		const method = Method.POST;
		const data = {
			cardId: cardId,
		};

		await callApi(url, method, data).then((response) => {
			if (response.status === Status.OK) {
				this.setState({
					card: response.data,
					isLoaded: true,
				});
			} else {
				Swal({
					title: 'Server Error',
					text: 'The server encountered an error',
					icon: 'error',
				});
			}
		});
	}

	render() {
		const { card, isLoaded } = this.state;

		if (!isLoaded) {
			return <div>Loading...</div>;
		}

		if (!card) {
			return <div>API Failure...</div>;
		}

		return (
			<Layout title='Card'>
				<img src={card.image_url} />
			</Layout>
		);
	}
}

export default withRouter(Card);
