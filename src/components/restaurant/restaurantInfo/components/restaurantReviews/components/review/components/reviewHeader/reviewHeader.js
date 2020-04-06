import React from 'react';
import PropTypes from 'prop-types';

// components
import { View, Text, Image } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StarRating from 'components/starRating/StarRating';
import TimeStamp from './components/timeStamp/timeStamp';

// utils
import ModalTypes from 'components/modal/modalTypes.enum';

// images
import UserOne from 'images/user1.png';
import UserTwo from 'images/user2.png';
import UserThree from 'images/user3.png';

// styles
import style from './style';

const ReviewHeader = ({ index, review, context, deleteReview }) => {
	const setMenuRef = (ref) => {
		menuRef = ref;
	};

	// wrapper function that first deletes review from
	// the api and then upon success removes that review from redux
	const onDeleteConfirm = () => {
		const payload = {
			id: restaurantId,
			review: {
				id: review.id,
			},
		};

		return deleteReview(payload)
			.then((res) => {
				// remove review from redux
				deleteReviewFromRedux({
					id: restaurantId,
					review: {
						id: res.id,
					},
				});
			})
			.catch(() => {});
	};

	const onUpdatePress = () => {
		menuRef.hide();

		setModalTitle('Update your review');
		setModalType(ModalTypes.UPDATE_REVIEW);
		setExtraData(restaurantId);

		// set review in addReview's modal store
		updateReview(review);

		// first navigate to confirmation modal
		navigation.navigate('Modal');
	};

	const onDeletePress = () => {
		menuRef.hide();

		setModalTitle('Are you sure you want to delete a review?');
		setModalType(ModalTypes.CONFIRMATION);
		setExtraData({
			onConfirm: onDeleteConfirm,
		});

		// first navigate to confirmation modal
		navigation.navigate('Modal');
	};

	let imageSource;
	if (index % 2 === 0) imageSource = UserOne;
	else if (index % 3 === 0) imageSource = UserTwo;
	else imageSource = UserThree;

	// menu reference
	let menuRef = null;

	// context
	const {
		navigation,
		restaurantId,
		deleteReview: deleteReviewFromRedux,
		updateReview,
		modal,
	} = context;
	// functions to manipulate modal
	const { setModalTitle, setModalType, setExtraData } = modal;

	return (
		<View style={style.main}>
			<Image style={style.image} source={imageSource} />
			<View style={style.headerContent}>
				<View style={style.content}>
					<Text style={style.name}>{review.name}</Text>
					<StarRating rating={review.rating} />
				</View>
				<TimeStamp date={{ createdAt: review.createdAt, updatedAt: review.updatedAt }} />
			</View>
			<Menu
				ref={setMenuRef}
				style={style.menu}
				animationDuration={150}
				button={
					<Icon
						onPress={() => menuRef.show()}
						name="more-horiz"
						size={20}
						color="grey"
					/>
				}>
				<MenuItem onPress={onUpdatePress}>Update review</MenuItem>
				<MenuDivider />
				<MenuItem textStyle={style.menuDelete} onPress={onDeletePress}>
					Delete Review
				</MenuItem>
			</Menu>
		</View>
	);
};

ReviewHeader.propTypes = {
	index: PropTypes.number,
	review: PropTypes.object,
	context: PropTypes.object,
	deleteReview: PropTypes.func
};

export default ReviewHeader;
