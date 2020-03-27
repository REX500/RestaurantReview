import React from 'react';
import PropTypes from 'prop-types';

import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// components
import style from './style';

const ReviewBody = ({text}) => {
  const iconClicked = '#c2c2c2';

  return (
    <View style={style.main}>
      <Text style={style.text}>{text}</Text>
      <View style={style.footer}>
        <View style={style.iconWrapper}>
          <Icon style={style.icon} name="thumb-up" size={20} color={iconClicked} />
          <Text>5</Text>
        </View>
        <View style={style.iconWrapper}>
          <Icon style={style.icon} name="thumb-down" size={20} color={iconClicked} />
          <Text>1</Text>
        </View>
      </View>
    </View>
  );
};

ReviewBody.propTypes = {
  text: PropTypes.string
};

export default ReviewBody;