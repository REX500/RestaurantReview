import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
	AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import style from './style';

// utils
import axios from 'axios';
import _debounce from 'lodash/debounce';

class AddReview extends Component {
	constructor(props) {
		super(props);

		this.state = {
			reviewName: '',
			reviewRating: 0,
      reviewComment: '',
      loading: false
    };
    
    this.submitReview = _debounce(this.submitReview, 300, { trailing: true }).bind(this);
    this.editStateEntry = this.editStateEntry.bind(this);
	}

	// creates 5 clickable stars
	getRatingStars() {
		// array with 5 undefined elements
		const loopArray = [...Array(5)];

		return loopArray.map((entry, index) => {
			const isRated = this.state.reviewRating && index <= this.state.reviewRating;

			const iconName = isRated ? 'star' : 'star-border';
			const iconColor = isRated ? '#FFD64C' : '#EFEFEF';

			return (
				<TouchableOpacity key={index} onPress={() => this.editStateEntry('reviewRating', index)}>
					<Icon name={iconName} size={44} color={iconColor} />
				</TouchableOpacity>
			);
		});
  }
  
  editStateEntry(name, value) {
    const payload = {
      [name]: value
    };

    this.setState(() => (payload));
  }

	submitReview() {
    const {onClose} = this.props;

		const payload = {
			name: this.state.reviewName ?? '',
			rating: this.state.reviewRating ?? 0,
			comment: this.state.reviewComment ?? '',
		};

    this.setState(() => ({loading: true}));

		axios({
			method: 'post',
			url: 'http://localhost:3000/review',
			data: payload,
		})
			.then(() => {
				// set data in async storage
				// AsyncStorage.setItem('reviewerName', payload.name);
				// AsyncStorage.setItem('reviewerRating', payload.rating);
				// AsyncStorage.setItem('reviewerComment', payload.comment);
        this.setState(() => ({loading: false}), () => {
					onClose();
				});
			})
			.catch(() => {
        // if error occured, remove everything from storage
				AsyncStorage.removeItem('reviewerName');
				AsyncStorage.removeItem('reviewerRating');
				AsyncStorage.removeItem('reviewerComment');
        
        this.setState(() => ({loading: false}));
			});
	}

	render() {
		return (
			<View style={style.main}>
				<View style={style.inputWrapper}>
					<Text style={style.inputLabel}>Your name</Text>
					<TextInput
						style={style.input}
						placeholder="Enter your name"
            value={this.state.reviewName}
            onChangeText={text => this.editStateEntry('reviewName', text)}
            />
				</View>

				<View style={style.ratingWrapper}>
					<Text>Your rating:</Text>
					<View style={style.rating}>{this.getRatingStars()}</View>
				</View>

				<View style={style.inputWrapper}>
					<Text style={style.inputLabel}>Review</Text>
					<TextInput
						style={[style.input, { height: 150 }]}
						placeholder="Enter review text"
            value={this.state.reviewComment}
            onChangeText={text => this.editStateEntry('reviewComment', text)}
						multiline
						numberOfLines={8}
					/>
				</View>

				<TouchableOpacity
					style={style.submitButton}
					onPress={this.submitReview}>
					{this.state.loading ? (
						<ActivityIndicator size="small" color="white" />
					) : (
						<Text style={style.submitButtonText}>Submit Review</Text>
					)}
				</TouchableOpacity>
			</View>
		);
	}
}

AddReview.propTypes = {
	onClose: PropTypes.func,
};

export default AddReview;
