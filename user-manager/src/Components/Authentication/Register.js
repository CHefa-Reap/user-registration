import { Form, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Spinner from 'react-bootstrap/Spinner';
import axios from '../../api/axios';
const SIGNUP_URL = `/api/v1/auth/register`;

function Register() {
	const [user, setUser] = useState('');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const userRef = useRef();
	const [userEmail, setUserEmail] = useState('');

	const findFormErrors = () => {
		// const { bank_name } = form;
		const newErrors = {};
		//NAME ERROS
		if (!user || user.trim() == '') {
			newErrors.user = 'User Name is required';
		}

		if (!pwd || pwd.trim() == '') {
			newErrors.pwd = 'Password is required';
		}
		if (!userEmail || userEmail.trim() == '') {
			newErrors.userEmail = 'Email is required';
		}

		if (pwd) {
			if (pwd.length < 8) {
				newErrors.pwd = 'Password Length Should be at least  8 Characters';
			}
		}

		return newErrors;
	};

	async function handleSubmit(e) {
		e.preventDefault();
		const newErrors = findFormErrors();
		if (Object.keys(newErrors).length > 0) {
			//We got errors!
			setErrors(newErrors);
		} else {
			try {
				setLoading(true);
				const response = await axios.post(
					SIGNUP_URL,
					JSON.stringify({ name: user, password: pwd, email: userEmail }),
					{
						headers: { 'Content-Type': 'application/json' },
						withCredentials: true,
					}
				);
				const userRole = response.data.user.role;
				const userName = response.data.user.name;
				const userID = response.data.user._id;
				sessionStorage.setItem('userrole', userRole);
				sessionStorage.setItem('userName', userName);
				sessionStorage.setItem('userID', userID);

				setUser('');
				setPwd('');

				setUserEmail('');
				navigate('/dashboard');
				setLoading(false);
			} catch (err) {
				if (!err?.response) {
					setErrMsg('No Server Response');
				} else if (err.response?.status === 409) {
					setErrMsg('Username Taken');
				} else if (err.response?.status === 400) {
					setErrMsg(err.response.data.message);
				} else {
					setErrMsg('Registration Failed');
				}
			}
		}
	}

	return (
		<div className='signup-component'>
			<div className='container'>
				<Card>
					{errMsg && <Alert severity='error'>{errMsg}</Alert>}
					<div className='login-form'>
						<div className='text-center'>
							<h2>Register</h2>
						</div>
						<Form onSubmit={handleSubmit}>
							<Form.Group className='mb-3' controlId='formBasicName'>
								<Form.Label>Name</Form.Label>
								<Form.Control
									type='text'
									// ref={userRef}
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
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type='text'
									ref={userRef}
									autoComplete='off'
									onChange={(e) => setUserEmail(e.target.value)}
									value={userEmail}
									isInvalid={!!errors.userEmail}
								/>
								<Form.Control.Feedback type='invalid'>
									{errors.userEmail}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className='mb-3'>
								<Form.Label>Password</Form.Label>

								<Form.Control
									type='password'
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
									Signup
									{loading && (
										<>
											{' '}
											<Spinner
												as='span'
												animation='border'
												size='sm'
												role='status'
												aria-hidden='true'
											/>
										</>
									)}
								</Button>
							</div>
							<div className='mt-4 text-center  text-dark'>
								<p className='mt-4 text-center  font-weight-normal'>
									Got an Account ?{' '}
									<Link to={'/'}>
										<br></br>
										<strong>Register Now </strong>
									</Link>
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

export default Register;
