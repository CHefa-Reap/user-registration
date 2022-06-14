import React from 'react';
import { Form, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import axios from '../../api/axios';
const LOGIN_URL = `/api/v1/auth/login`;

function Login() {
	const userRef = useRef();
	const errRef = useRef();
	const navigate = useNavigate();
	const [user, setUser] = useState('');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [loading, setLoading] = useState(false);

	const [errors, setErrors] = useState({});

	const findFormErrors = () => {
		// const { email, password } = user;
		const newErrors = {};
		var regex = new RegExp(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);

		// name errors
		if (user) {
			if (regex.test(user) === false) {
				newErrors.user = 'Please enter a valid email address';
			}
		}
		if (!user || user.trim() === '') {
			newErrors.user = 'Email is Required';
		}
		if (!pwd) {
			newErrors.pwd = 'Password is Required';
		}

		if (pwd) {
			if (pwd.length < 8) {
				newErrors.pwd = 'Password Length Should be at least  8 Characters';
			}
		}

		return newErrors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const newErrors = findFormErrors();
		if (Object.keys(newErrors).length > 0) {
			//We got errors!
			setErrors(newErrors);
		} else {
			try {
				if (
					sessionStorage.getItem('userrole') === null &&
					sessionStorage.getItem('userName') === null
				) {
					const response = await axios.post(
						LOGIN_URL,
						JSON.stringify({ email: user, password: pwd }),
						{
							headers: { 'Content-Type': 'application/json' },
							withCredentials: true,
						}
					);

					//console.log(JSON.stringify(response));
					const userRole = response.data.user.role;
					const userName = response.data.user.name;
					const userID = response.data.user._id;

					if (userRole == 'user') {
						navigate('/dashboard');
					}

					if (userRole == 'admin') {
						navigate('/admin-dashboard');
					}

					sessionStorage.setItem('userrole', userRole);
					sessionStorage.setItem('userName', userName);
					sessionStorage.setItem('userID', userID);

					setUser('');
					setPwd('');
					setLoading(true);
				} else {
					sessionStorage.clear();
				}
				// navigate(from, { replace: true });
			} catch (err) {
				if (!err?.response) {
					setErrMsg('No Server Response');
				} else if (err.response?.status === 400) {
					setErrMsg('Missing Username or Password');
				} else if (err.response?.status === 401) {
					setErrMsg('Invalid credentials');
				} else {
					setErrMsg('Login Failed');
				}
			}
		}
	};

	return (
		<div className='login-component'>
			<div className='container'>
				<Card>
					{errMsg && <Alert severity='error'>{errMsg}</Alert>}
					<div className='login-form'>
						<div className='text-center'>
							<h2>Login</h2>
						</div>
						<Form onSubmit={handleSubmit}>
							<Form.Group className='mb-3'>
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type='text'
									id='username'
									ref={userRef}
									autoComplete='off'
									onChange={(e) => setUser(e.target.value)}
									value={user}
									isInvalid={!!errors.user}
								/>
								<Form.Control.Feedback type='invalid'>
									{errors.user}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className='mb-3'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type='password'
									id='password'
									onChange={(e) => setPwd(e.target.value)}
									value={pwd}
									isInvalid={!!errors.pwd}
								/>
								<Form.Control.Feedback type='invalid'>
									{errors.pwd}
								</Form.Control.Feedback>
							</Form.Group>

							<div className='rounded-0 d-grid gap-2 mx-auto'>
								<Button type='submit'>
									Login
									{loading && <CircularProgress />}
								</Button>
							</div>
							<div className='mt-4 text-center  text-dark'>
								<p className='mt-4 text-center  font-weight-normal'>
									Don't have an account ?<br></br>
									<strong>Register Now </strong>
								</p>

								<span></span>
							</div>
						</Form>
					</div>
				</Card>
			</div>
		</div>
	);
}

export default Login;
