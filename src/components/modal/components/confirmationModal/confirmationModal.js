import React from 'react';
import PropTypes from 'prop-types';

// components
import { View, Text, TouchableOpacity } from 'react-native';

// style
import style from './style';

const ConfirmationModal = ({ onConfirm, onCancel }) => {
	return (
		<View style={style.main}>
      <TouchableOpacity onPress={onCancel}>
			  <Text style={style.button}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onConfirm}>
			  <Text style={[style.button, style.confirm]}>Confirm</Text>
      </TouchableOpacity>
		</View>
	);
};

ConfirmationModal.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  onClose: PropTypes.func
};

export default ConfirmationModal;
