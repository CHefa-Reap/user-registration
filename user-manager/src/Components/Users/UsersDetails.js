import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Table } from 'react-bootstrap';
import axios from '../../api/axios';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const getAllUsers = '/api/v1/users';
const deleteUser = '/api/v1/users';

function UsersDetails() {
	const userrole = sessionStorage.getItem('userrole');

	const [data, setData] = useState([]);
	useEffect(() => {
		fetchUsers();
	}, []);

	async function fetchUsers() {
		const response = await axios.get(getAllUsers).then(function (response) {
			setData(response.data.data);
		});
	}
	async function handleDelete(id) {
		if (userrole == 'admin') {
			const response = await axios.delete('/api/v1/users/' + id);
		}
		await fetchUsers();
	}

	return (
		<div>
			<Navbar />
			<Container>
				<Box>
					<hr />{' '}
					<Table bordered>
						<thead>
							<tr>
								<th>User Name</th>
								<th>User Email</th>
								<th>User Role</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{data &&
								data.map((data, index) => (
									<tr id={data.id} key={index}>
										<Link
											className='table-row'
											to={`/user/edit-user/${data._id}`}>
											<td>{data.name}</td>
										</Link>
										<td>{data.email}</td>
										<td>{data.role}</td>
										<td className='text-center'>
											<DeleteIcon
												onClick={() => handleDelete(data._id)}
												className='table-delete'
											/>
										</td>
									</tr>
								))}
						</tbody>
					</Table>
				</Box>
			</Container>
		</div>
	);
}

export default UsersDetails;
