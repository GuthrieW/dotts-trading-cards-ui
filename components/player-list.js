import React from 'react';
import Router from 'next/router';
import Swal from 'sweetalert';
import { Status } from './../common/api/http-status';
import { API_URL } from './../common/api/api-url';
import { callApi, Method } from './../common/api/call-api';
import { Table } from 'reactstrap';
import Layout from './layout';
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
				<Table>
					<thead>
						<tr>
							<th>Username</th>
						</tr>
					</thead>
					<tbody>
						{this.state.userList.map((user, index) => (
							<tr>
								<td>
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
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Layout>
		);
	}
}
