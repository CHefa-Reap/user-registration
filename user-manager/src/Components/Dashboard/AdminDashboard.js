import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import { Link, useParams } from 'react-router-dom';

function AdminDashboard() {
	const userName = sessionStorage.getItem('userName');
	const userID = sessionStorage.getItem('userID');

	return (
		<div className='admin-dashboard-component mt-5'>
			<Container>
				<Box>
					<Grid container spacing={2}>
						<Grid item xs={10}>
							<p style={{ paddingLeft: '43px', paddingTop: '11px' }}>
								<Avatar alt='Remy Sharp' />
								{userName}
							</p>
						</Grid>
						<Grid item xs={2}>
							<Button
								className='logout-btn'
								variant='contained'
								startIcon={<DeleteIcon />}>
								Logout
							</Button>
						</Grid>
					</Grid>
				</Box>
				<hr />
			</Container>

			<Container>
				<div style={{ width: '50%', margin: '0 auto' }} className='mt-5 row'>
					<div className='col'>
						<Link to='/user-details'>
							<Button variant='contained'>User Detail</Button>
						</Link>
					</div>
					<div className='col'>
						<Link to={`/user/edit-user/${userID}`}>
							<Button variant='contained'>Edit Account</Button>
						</Link>
					</div>
				</div>
			</Container>
		</div>
	);
}

export default AdminDashboard;
