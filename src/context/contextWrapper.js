import React, { useState } from 'react';
import PropTypes from 'prop-types';

// context
import MyContext from './index';

// default context state
const defaultContext = {
	// modal stuff
	modal: {
		modalTitle: '',
		modalType: '',
		extraData: {},
		setModalTitle: () => {},
		setModalType: () => {},
		setExtraData: () => {},
	},
	restaurant: {
		restaurantInfo: null,
		setRestaurantInfo: () => {},
	},
  decoratedExtraData: {}
};

const ContextWrapper = ({ children }) => {
	// context states
	const [modalTitle, setModalTitle] = useState(defaultContext.modal.modalTitle);
	const [modalType, setModalType] = useState(defaultContext.modal.modalType);
	const [extraData, setExtraData] = useState(defaultContext.modal.extraData);
	const [restaurantInfo, setRestaurantInfo] = useState(
		defaultContext.restaurant.restaurantInfo
	);
  const [decoratedExtraData, setDecoratedExtraData] = useState(defaultContext.decoratedExtraData);

	// append local state to context object
	const value = {
		modal: {
			modalTitle,
			modalType,
			extraData,
			setModalTitle,
			setModalType,
			setExtraData,
		},
		restaurant: {
			restaurantInfo,
			setRestaurantInfo,
    },
    decoratedExtraData,
    setDecoratedExtraData
	};

	return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

ContextWrapper.propTypes = {
	children: PropTypes.element,
};

export default ContextWrapper;
