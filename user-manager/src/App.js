import logo from './logo.svg';
import './App.scss';
import Dashboard from './Components/Dashboard/Dashboard';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import Login from './Components/Authentication/Login';
import Register from './Components/Authentication/Register';
import { Routes, Route } from 'react-router-dom';
import UsersDetails from './Components/Users/UsersDetails';
import AddEditUser from './Components/Users/AddEditUser';

function App() {
	const userRole = sessionStorage.getItem('userrole');
	return (
		<Routes>
			<Route path='/auth/login' element={<Login />} />
			<Route path='/auth/register' element={<Register />} />

			{userRole == 'user' && (
				<Route path='/dashboard' element={<Dashboard />} />
			)}
			{userRole == 'admin' && (
				<Route path='/admin-dashboard' element={<AdminDashboard />} />
			)}

			{userRole == 'admin' && (
				<Route path='/user-details' element={<UsersDetails />} />
			)}

			<Route path='/user/edit-user/:id' element={<AddEditUser />} />
		</Routes>
	);
}

export default App;
