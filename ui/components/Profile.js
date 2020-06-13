import React from 'react';
import Layout from './Layout';

export default class Home extends React.Component {
	constructor() {
		super();

		this.state = {
			username: '',
			isLoaded: false,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async componentDidMount() {
		const url = `${API_URL}/user/currentUser`;
		const method = Method.GET;

		await callApi(url, method).then((response) => {
			console.log(response);
			if (response.status === Status.OK) {
				console.log(response);
				this.setState({
					user: response.data,
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

	async handleSubmit() {}

	render() {
		if (!this.state.isLoaded) {
			return <div>Loading...</div>;
		}

		if (!this.state.username) {
			return <div>API Failure...</div>;
		}

		return (
			<Layout title='Home'>
				<Form onSubmit={this.handleSubmit}>
					<FormGroup>
						<Label>NSFL Username</Label>
						<Input
							type='text'
							name='nsfl-username'
							placeholder={LABELS.nsflUsername}
						>
							{this.state.username}
						</Input>
					</FormGroup>

					<Button type='submit'>Update Profile</Button>
				</Form>
			</Layout>
		);
	}
}
