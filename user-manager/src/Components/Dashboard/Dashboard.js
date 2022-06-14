import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
function Dashboard() {
	const userName = sessionStorage.getItem('userName');

	return (
		<div className='admin-dashboard-component mt-5'>
			<Container>
				<Box>
					<Grid container spacing={2}>
						<Grid item xs={10}>
							<p style={{ paddingLeft: '43px', paddingTop: '11px' }}>
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
		</div>
	);
}

export default Dashboard;
