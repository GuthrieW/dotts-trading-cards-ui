import React from 'react';
import Layout from './Layout';
import { withRouter } from 'next/router';
import Swal from 'sweetalert';
import { Status } from '/nsfl-trading-cards/ui/common/api/httpStatus';
import { API_URL } from '/nsfl-trading-cards/ui/common/api/apiUrl';
import { callApi, Method } from '/nsfl-trading-cards/ui/common/api/callApi';

class Card extends React.Component {
	constructor() {
		super();
		this.state = {
			card: null,
			isLoading: true,
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
					isLoading: false,
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
		if (this.state.isLoading) {
			return <div>Loading...</div>;
		}

		if (!this.state.card) {
			return <div>API Failure...</div>;
		}

		return (
			<Layout title='Card'>
				<img src={this.state.card.image_url} />
			</Layout>
		);
	}
}

export default withRouter(Card);