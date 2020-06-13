import React from 'react';
import Router from 'next/router';
import Swal from 'sweetalert';
import { Status } from '/nsfl-trading-cards/ui/common/api/httpStatus';
import { API_URL } from '/nsfl-trading-cards/ui/common/api/apiUrl';
import { callApi, Method } from '/nsfl-trading-cards/ui/common/api/callApi';
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
						key={index}
						onClick={() => {
							this.handleOnClicK(user._id);
						}}
					>
						{user.nsfl_username}
					</a>
				))}
			</Layout>
		);
	}
}
