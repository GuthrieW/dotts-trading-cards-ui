import Head from 'next/head';

import React from 'react';
import SubmitCard from './../components/submit-card';

export default class App extends React.Component {
	constructor() {
		super();
	}

	render() {
		return <SubmitCard />;
	}
}
