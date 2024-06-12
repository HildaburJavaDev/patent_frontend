import React, { useContext, useState } from 'react';
import Profile from '../components/Profile';
import ChangePasswordForm from '../components/ChangePasswordForm';
import PersonalDataForm from '../components/PersonalDataForm';
import AssignModeratorForm from '../components/AssignModeratorForm';
import LeftMenu from '../components/LeftMenu';
import { Context } from '../index';

const Cabinet = () => {
	const { user } = useContext(Context);
	const [selectedMenuItem, setSelectedMenuItem] = useState('profile');

	const handleMenuItemSelect = (itemId) => {
		setSelectedMenuItem(itemId);
	};

	return (
		<div style={{ display: 'flex' }}>
			<div style={{ width: '25%', marginRight: '20px' }}>
				<LeftMenu onSelect={handleMenuItemSelect} userRole={user._user.role_name} />
			</div>
			<div style={{ width: '75%' }}>
				{selectedMenuItem === 'profile' && <Profile user={user} />}
				{selectedMenuItem === 'changePassword' && <ChangePasswordForm />}
				{selectedMenuItem === 'personalData' && <PersonalDataForm />}
				{selectedMenuItem === 'assignModerator' && <AssignModeratorForm />}
			</div>
		</div>
	);
};

export default Cabinet;
