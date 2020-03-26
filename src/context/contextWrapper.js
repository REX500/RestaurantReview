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
  }
};

const ContextWrapper = ({children}) => {
    // context states
    const [modalTitle, setModalTitle] = useState('');
    const [modalType, setModalType] = useState('');

    // append local state to context object
    const value = {
      ...defaultContext,
      modal: {
        modalTitle,
        modalType,
        setModalTitle,
        setModalType
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
