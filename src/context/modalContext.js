import React from 'react';

export const ModalContext = React.createContext({
  modalText: '',
  modalType: '',
  changeValue: () => {}
});