import React from 'react';
import Layout from './layout';
import { withRouter } from 'next/router';
import Swal from 'sweetalert';
import ReactLoading from 'react-loading';
import { Status } from './../common/api/http-status';
import { API_URL } from './../common/api/api-url';
import { callApi, Method } from './../common/api/call-api';

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
			return <ReactLoading type={'bars'} height={'20%'} width={'20%'} />;
		}

		if (!this.state.card) {
			return <div>API Failure...</div>;
		}

		return (
			<Layout title='Card'>
				<div
					style={{
						display: 'grid',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<img
						style={{ maxHeight: '504px' }}
						src={this.state.card.image_url}
					/>
				</div>
			</Layout>
		);
	}
}

export default withRouter(Card);
