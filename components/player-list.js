import React from 'react';
import Router from 'next/router';
import Swal from 'sweetalert';
import { Status } from '/dotts-trading-cards-ui/common/api/http-status';
import { API_URL } from '/dotts-trading-cards-ui/common/api/api-url';
import { callApi, Method } from '/dotts-trading-cards-ui/common/api/call-api';
import Layout from './Layout';
import _filter from 'lodash/filter';

export default class PlayerList extends React.Component {
	constructor() {
		super();

		this.state = {
			userList: [],
		};

		this.handleOnClicK = this.handleOnClicK.bind(this);
	}

	handleOnClicK(userId) {
		Router.push({
			pathname: `/collection/collection`,
			query: { userId: userId },
		});
	}

	async componentDidMount() {
		const url = `${API_URL}/user`;
		const method = Method.GET;

		await callApi(url, method)
			.then((response) => {
				if (response.status === Status.OK) {
					const filteredUsers = _filter(response.data, (user) => {
						return user.nsfl_username !== '';
					});

					this.setState({
						userList: filteredUsers,
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
		return (
			<Layout title='Player List'>
				{this.state.userList.map((user, index) => (
					<a
						className='btn btn-primary'
						key={index}
						onClick={() => {
							this.handleOnClicK(user._id);
						}}
					>
						<span style={{ color: 'white' }}>
							{user.nsfl_username}
						</span>
					</a>
				))}
			</Layout>
		);
	}
}
