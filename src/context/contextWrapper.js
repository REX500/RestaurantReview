import React, {useState} from 'react';
import PropTypes from 'prop-types';

// context
import MyContext from './index';

// default context state
const defaultContext = {
  // modal stuff
  modal: {
    modalTitle: '',
    modalType: '',
    setModalTitle: () => {},
    setModalType: () => {}
  },
  restaurant: {
    restaurantInfo: null,
    setRestaurantInfo: () => {}
  }
};

const ContextWrapper = ({children}) => {
    // context states
    const [modalTitle, setModalTitle] = useState(defaultContext.modal.modalTitle);
    const [modalType, setModalType] = useState(defaultContext.modal.modalType);
    const [restaurantInfo, setRestaurantInfo] = useState(defaultContext.restaurant.restaurantInfo);

    // append local state to context object
    const value = {
      ...defaultContext,
      modal: {
        modalTitle,
        modalType,
        setModalTitle,
        setModalType
      },
      restaurant: {
        restaurantInfo,
        setRestaurantInfo
      }
    };

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};

ContextWrapper.propTypes = {
  children: PropTypes.element
};

export default ContextWrapper;
