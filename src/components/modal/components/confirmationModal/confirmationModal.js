import React, { useState } from 'react';
import PropTypes from 'prop-types';

// components
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

// style
import style from './style';

const ConfirmationModal = ({ onConfirm, onClose }) => {
	const onConfirmWrapper = () => {
		setLoading(true);

		onConfirm().then(() => {
			setLoading(false);
			onClose();
		});
	};

	const [loading, setLoading] = useState(false);

	return (
		<View style={style.main}>
			<TouchableOpacity onPress={onClose} style={style.button}>
				<Text>Cancel</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={onConfirmWrapper}
				style={[style.button, style.confirm]}>
				{loading ? (
					<ActivityIndicator size="small" color="white" />
				) : (
					<Text style={style.confirmText}>Confirm</Text>
				)}
			</TouchableOpacity>
		</View>
	);
};

ConfirmationModal.propTypes = {
	onConfirm: PropTypes.func,
	onClose: PropTypes.func,
};

export default ConfirmationModal;
