import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

function AddEditUser() {
	const { id } = useParams();
	const [error, setError] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [form, setForm] = useState({});
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const userrole = sessionStorage.getItem('userrole');

	useEffect(() => {
		setIsPending(true);
		const response = axios
			.get('http://localhost:4000/api/v1/users/' + id)
			.then(function (response) {
				console.log(response.data.data);
				setForm(response.data.data);
			});
		setIsPending(false);
	}, [id]);

	const setField = (field, value) => {
		setForm({
			...form,
			[field]: value,
		});

		// Check and see if errors exist, and remove them from the error object:
		if (!!errors[field])
			setErrors({
				...errors,
				[field]: null,
			});
	};

	function handleCancel() {
		if (userrole == 'admin') {
			navigate('/user-details');
		}
		if (userrole == 'user') {
			navigate('/dashboard');
		}
	}

	const findFormErrors = () => {
		const { name, email, userRole } = form;
		const newErrors = {};
		var regex = new RegExp(
			/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
		);
		//NAME ERROS
		if (!name || name.trim() == '') {
			newErrors.name = 'Name is Required';
		}

		if (email && email != '') {
			if (regex.test(email) === false) {
				newErrors.email = 'Please Enter a Valid Email Address';
			}
		}

		if (!userRole || userRole.trim() == '') {
			newErrors.userRole = 'User Role is Required';
		}

		return newErrors;
	};

	function handleSubmit() {
		
	}

	return (
		<div>
			<div className='container'>
				<div className='version-controller'>
					{error && <Alert variant='warning'>{error}</Alert>}
					{isPending && <Spinner animation='border' />}

					<div>
						<h1>My Account</h1> <hr />
					</div>

					<Form id={form.id}>
						<Form.Group className='form-group row mb-3'>
							<Form.Label className='col-3'>Name *</Form.Label>
							<div className='col-9'>
								<Form.Control
									className='col-9'
									type='text'
									onChange={(e) => setField('name', e.target.value)}
									value={form.name || ''}
									isInvalid={!!errors.name}
								/>
								<Form.Control.Feedback type='invalid'>
									{errors.name}
								</Form.Control.Feedback>
							</div>
						</Form.Group>

						<Form.Group className='form-group row mb-3'>
							<Form.Label className='col-3'>Email * </Form.Label>
							<div className='col-9'>
								<Form.Control
									type='email'
									className='col-9'
									onChange={(e) => setField('email', e.target.value)}
									value={form.email || ''}
									isInvalid={!!errors.email}
								/>
								<Form.Control.Feedback type='invalid'>
									{errors.email}
								</Form.Control.Feedback>
							</div>
						</Form.Group>

						<Form.Group className=' form-group row mb-3'>
							<Form.Label className='col-3'>User Type *</Form.Label>
							<div className='col-9'>
								<Form.Select
									defaultValue='Select Status'
									isInvalid={!!errors.userRole}
									onChange={(e) => setField('role', e.target.value)}
									value={form.role}>
									<option value='user'>General User</option>
									<option value='admin'>Admin User</option>
								</Form.Select>
							</div>
							<Form.Control.Feedback type='invalid'>
								{errors.userRole}
							</Form.Control.Feedback>
						</Form.Group>

						<div className='text-end'>
							<Button
								onClick={handleCancel}
								style={{ margin: '5px' }}
								variant='danger'>
								Cancel
							</Button>

							<Button disabled={isPending} className='btn-dark'>
								Save and Close
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
}

export default AddEditUser;
