import React from 'react';
import PropTypes from 'prop-types';

import _get from 'lodash/get';

import { View, Text, TouchableOpacity } from 'react-native';
import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view';


import Icon from 'react-native-vector-icons/MaterialIcons';

import style from './style';

const Modal = ({ navigation, route }) => {
  const onClose = () => {
    navigation.goBack();
  };

	const view = _get(route, 'params.children', null);
	const modalText = _get(route, 'params.modalText', null);

	return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <View style={style.main}>
        <View style={style.iconWrapper}>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" style={style.icon} size={30}/>
          </TouchableOpacity>
        </View>
        <Text style={style.header}>{modalText || 'No text added'}</Text>

        {/* child component */}
        <view.type closeModal={onClose} />
      </View>
    </KeyboardAwareScrollView>
	);
};

Modal.propTypes = {
	navigation: PropTypes.object,
	route: PropTypes.object,
};

export default Modal;
