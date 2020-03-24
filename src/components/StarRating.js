'use strict';

import React from 'react';

import {View, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const StarRating = ({entry}) => {
  const {rating} = entry;

  // round to 0.5
  const roundedEntry = Math.round(rating * 2) / 2;
  const array = [...Array(Math.ceil(rating))];

  return (
    <View style={style.starWrapper}>
      {array.map((value, index) => {
        const iconName =
          index === array.length - 1 && !Number.isInteger(roundedEntry)
            ? 'star-half'
            : 'star';

        return <Icon key={index} name={iconName} color="#FFD64C" />;
      })}
    </View>
  );
};

const style = StyleSheet.create({
  starWrapper: {
    flexDirection: 'row',
  },
});

export default StarRating;
