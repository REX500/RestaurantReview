import React, { useContext } from 'react';
import MyContext from 'context';
import PropTypes from 'prop-types';

// react native stuff
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// scrolls up if on screen keyboard would cover
// the input field for ex.
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// components
import AddReviewModal from './components/addReviewModal/addReviewModal';
import ConfirmationModal from './components/confirmationModal/confirmationModal';

// utils
import _get from 'lodash/get';

// enum for modal types
import ModalType from './modalTypes.enum';

// styles
import style from './style';

const Modal = ({ navigation }) => {
	const onClose = () => {
		navigation.goBack();
	};

	// child component based on modal type
	const getChildComponent = () => {
		switch (modalType) {
			case ModalType.ADD_REVIEW:
				return <AddReviewModal onClose={onClose} extraData={extraData} />;
			case ModalType.CONFIRMATION:
				return <ConfirmationModal onConfirm={extraData.onConfirm} onClose={onClose} />;
			default:
				return (
					<Text style={style.noComponentFound}>
						No component found, did you choose the correct modal type?
					</Text>
				);
		}
	};

	const context = useContext(MyContext);
	const modalType = _get(context, 'modal.modalType', null);
	const modalTitle = _get(context, 'modal.modalTitle', null);
	const extraData = _get(context, 'modal.extraData', null);

	return (
		<KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>
			<View style={style.main}>
				<View style={style.iconWrapper}>
					<TouchableOpacity onPress={onClose}>
						<Icon name="close" style={style.icon} size={30} />
					</TouchableOpacity>
				</View>
				<Text style={style.header}>{modalTitle || 'No text added'}</Text>
				{getChildComponent()}
			</View>
		</KeyboardAwareScrollView>
	);
};

Modal.propTypes = {
	navigation: PropTypes.object
};

export default Modal;
