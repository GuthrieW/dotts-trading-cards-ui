import Head from 'next/head';
import Header from './Header';
import React from 'react';

export default class App extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<>
				<Head>
					<title>{this.props.title}</title>
					<link rel='icon' href='/favicon.ico' />
					<link
						rel='stylesheet'
						href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
						integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T'
						crossOrigin='anonymous'
					/>
				</Head>
				<Header />
				<main>
					<div className='container'>{this.props.children}</div>
				</main>
			</>
		);
	}
}
