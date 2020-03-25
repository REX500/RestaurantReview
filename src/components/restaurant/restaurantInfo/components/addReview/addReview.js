import React, {useState} from 'react';

import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import style from './style';

const AddReview = () => {
  const [reviewName, setReviewName] = useState(null);
	const [reviewRating, setReviewRating] = useState(null);
  const [reviewText, setReviewText] = useState(null);
  
  // creates 5 clickable stars
  const getRatingStars = () => {
    // array with 5 undefined elements
    const loopArray = [...Array(5)];

    return loopArray.map((entry, index) => {
      const isRated = reviewRating && index <= reviewRating;

      const iconName = isRated
        ? 'star'
        : 'star-border';
      const iconColor = isRated
        ? '#FFD64C'
        : '#EFEFEF';

      return (
        <TouchableOpacity
          key={index}
          onPress={() => setReviewRating(index)}
        >
          <Icon name={iconName} size={44} color={iconColor} />
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={style.main}>
      <View style={style.inputWrapper}>
        <Text style={style.inputLabel}>Your name</Text>
        <TextInput
          style={style.input}
          placeholder="Enter your name"
          value={reviewName}
          onChangeText={text => setReviewName(text)}
        />
      </View>

      <View style={style.ratingWrapper}>
        <Text>Your rating:</Text>
        <View style={style.rating}>
          {
            getRatingStars()
          }
        </View>
      </View>

      <View style={style.inputWrapper}>
        <Text style={style.inputLabel}>Review</Text>
        <TextInput
          style={[style.input, {height: 150}]}
          placeholder="Enter review text"
          value={reviewText}
          onChangeText={text => setReviewText(text)}
          multiline
          numberOfLines={8}
        />
      </View>

      <TouchableOpacity style={style.submitButton}>
        <Text style={style.submitButtonText}>Submit Review</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddReview;