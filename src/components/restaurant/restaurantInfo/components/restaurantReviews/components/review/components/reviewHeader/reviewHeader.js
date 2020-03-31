import React from 'react';
import PropTypes from 'prop-types';

import {View, Text, Image} from 'react-native';
import StarRating from 'components/starRating/StarRating';

import UserOne from 'images/user1.png';
import UserTwo from 'images/user2.png';
import UserThree from 'images/user3.png';


// components
import style from './style';

const ReviewHeader = ({name, rating, index}) => {
  let imageSource;
  if (index % 2 === 0) imageSource = UserOne;
  else if (index % 3 === 0) imageSource = UserTwo;
  else imageSource = UserThree;

  return (
    <View style={style.main}>
     <Image
      style={style.image}
      source={imageSource}
     />
     <View style={style.content}>
      <Text style={style.name}>{name}</Text>
      <StarRating rating={rating} />
     </View>
    </View>
  );
};

ReviewHeader.propTypes = {
  name: PropTypes.string,
  rating: PropTypes.number,
  index: PropTypes.number,
};

export default ReviewHeader;