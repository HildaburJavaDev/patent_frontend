import React, { useState } from 'react';
import './styles/LeftMenu.css';

const LeftMenu = ({ onSelect, userRole }) => {
	const getMenuItems = () => {
		const items = [
			{ id: 'profile', label: 'Профиль' },
			{ id: 'personalData', label: 'Персональные данные' },
			{ id: 'changePassword', label: 'Сменить пароль' },
		];

		// Only add the 'assignModerator' item if the user role is 'admin'
		if (userRole === 'admin') {
			items.push({ id: 'assignModerator', label: 'Назначить модератором' });
		}

		return items;
	};

	const menuItems = getMenuItems();
	const [selectedItem, setSelectedItem] = useState(menuItems[0].id);

	const handleItemClick = (itemId) => {
		setSelectedItem(itemId);
		onSelect(itemId);
	};

	return (
		<div className="left-menu">
			{menuItems.map((item) => (
				<div
					key={item.id}
					className={`menu-item ${selectedItem === item.id ? 'selected' : ''}`}
					onClick={() => handleItemClick(item.id)}
				>
					{item.label}
				</div>
			))}
		</div>
	);
};

export default LeftMenu;
