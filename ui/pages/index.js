import Head from 'next/head';
import Header from './Header';

export default class App extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<>
				<Head>
					<title>NSFL Trading Cards</title>
					<link rel='icon' href='/favicon.ico' />
					<link
						rel='stylesheet'
						href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
						integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T'
						crossOrigin='anonymous'
					></link>
				</Head>
				<main>
					<Header />
					<div className='container'>
						<h1>NSFL Trading Cards</h1>
					</div>
				</main>
			</>
		);
	}
}
