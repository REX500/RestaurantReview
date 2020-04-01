import React from 'react';
import PropTypes from 'prop-types';

import { View, Text } from 'react-native';

import moment from 'moment';

import style from './style';

const TimeStamp = ({date}) => {
  // get values and determine if review was edited
  const { createdAt, updatedAt } = date;

  const datesAreSame = moment
    .utc(createdAt, 'YYYY-MM-DDTHH:mm:ss')
    .isSame(moment.utc(updatedAt, 'YYYY-MM-DDTHH:mm:ss'), 'millisecond');

  const titleText = datesAreSame ? 'Published on:' : 'Updated on:';

  return (
    <View style={style.timeStamp}>
      <Text style={style.timeStampTitle}>{titleText}</Text>
      <Text style={style.timeStampDate}>
        {moment.utc(updatedAt, 'YYYY-MM-DDTHH:mm:ss').format('MMM Do, YYYY')}
      </Text>
    </View>
  );
};

TimeStamp.propTypes = {
  date: PropTypes.object
};

export default TimeStamp;