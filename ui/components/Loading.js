import React from 'react';
// import { NavbarBrand, Navbar, NavItem, NavLink, Nav, Button } from 'reactstrap';
// import Swal from 'sweetalert';
// import Router from 'next/router';
// import NsflLogo from './../public/favicon.ico';
// import { callApi, Method } from '/nsfl-trading-cards/ui/common/api/callApi';
// import { API_URL } from '/nsfl-trading-cards/ui/common/api/apiUrl';
// import { Status } from '/nsfl-trading-cards/ui/common/api/httpStatus';

export default class Loading extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div>
				<img
					img
					src='https://cdn.discordapp.com/attachments/719409500292907029/720056809951461416/Dotts-Logo-red-black.png'
					alt='cur'
					className='center'
				/>
			</div>
		);
	}
}
