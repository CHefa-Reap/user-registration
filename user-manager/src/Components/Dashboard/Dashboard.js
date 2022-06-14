import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../Navbar/Navbar';

import { Link, useParams } from 'react-router-dom';
import { FaUserCircle, FaUsers } from 'react-icons/fa';

import { FiUser } from 'react-icons/fi';

function Dashboard() {
	const userName = sessionStorage.getItem('userName');
	const userID = sessionStorage.getItem('userID');
	const userrole = sessionStorage.getItem('userrole');

	return (
		<div className='admin-dashboard-component '>
			<Navbar />
			<Container className='mt-5'>
				<div className='d-flex align-items-center justify-content-between'>
					<div className='d-flex align-items-center'>
						<FaUserCircle className='fa-icon' />
						<h3 className='my-0 ms-3'>
							<b>{userName}</b>
						</h3>
					</div>
				</div>
				<hr />
			</Container>

			<Container>
				<div style={{ width: '50%', margin: '0 auto' }} className='mt-5 row'>
					<div className='col'>
						{userrole === 'admin' && (
							<Link className='underline-link' to='/user-details'>
								<Button
									className='btn-class'
									variant='contained'
									color='warning'>
									<b>
										<FaUsers
											style={{ paddingRight: '5px', fontSize: '20px' }}
										/>{' '}
									</b>
									User Detail
								</Button>
							</Link>
						)}
					</div>
					<div className='col'>
						<Link className='underline-link' to={`/user/edit-user/${userID}`}>
							<Button variant='contained' color='success'>
								<FiUser style={{ paddingRight: '5px', fontSize: '20px' }} />{' '}
								Edit Account
							</Button>
						</Link>
					</div>
				</div>
			</Container>
		</div>
	);
}

export default Dashboard;
