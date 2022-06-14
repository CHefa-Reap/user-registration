import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import AdbIcon from '@mui/icons-material/Adb';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Button } from 'react-bootstrap';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

function NavigationBar() {
	const userrole = sessionStorage.getItem('userrole');
	const navigate = useNavigate();

	async function Logout() {
		sessionStorage.clear();
		navigate('/');
	}

	return (
		<div>
			<Navbar bg='light' expand='lg'>
				<Container>
					<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
					<Typography
						variant='h6'
						noWrap
						component='a'
						href='/'
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}>
						LOGO
					</Typography>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ms-auto'>
							{userrole === 'admin' && (
								<Nav.Link className='ms-3' href='/admin-dashboard'>
									Admin Dashboard
								</Nav.Link>
							)}
							{userrole === 'user' && (
								<Nav.Link className='ms-3' href='/dashboard'>
									Dashboard
								</Nav.Link>
							)}
							{userrole === 'admin' && (
								<Nav.Link className='ms-3' href='/user-details'>
									Users
								</Nav.Link>
							)}

							<Button onClick={Logout} variant='danger' className='ms-3'>
								Logout
							</Button>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}

export default NavigationBar;
