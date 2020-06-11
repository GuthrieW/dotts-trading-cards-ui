import React from 'react';
import { NavbarBrand, Navbar, NavItem, NavLink, Nav } from 'reactstrap';

const Header = () => {
	return (
		<div>
			<Navbar color='light' light expand='md'>
				<NavbarBrand href='/'>NSFL Trading Cards</NavbarBrand>
				<Nav className='mr-auto' navbar>
					<NavItem>
						<NavLink href='/collection/my-collection'>My Collection</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href='/packs/get-packs'>Get Packs</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href='/submit-card'>Submit Cards</NavLink>
					</NavItem>
				</Nav>
			</Navbar>
		</div>
	);
};

export default Header;
