import React from 'react';

const MyContext = React.createContext();

export default MyContext;

// default context object
export const contextObject = {
  // modal stuff
  modal: {
    modalTitle: '',
    modalType: '',
    setModalTitle: () => {},
    setModalType: () => {}
  }
};