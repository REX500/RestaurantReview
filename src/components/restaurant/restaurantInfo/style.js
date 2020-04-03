import { StyleSheet } from 'react-native';
import { appBlue, appGreyDark } from 'utils/styleVars';

export default StyleSheet.create({
	main: {
		flex: 1,
		padding: 16
	},
	header: {
		flexDirection: 'column',
	},
	headerText: {
		fontSize: 20,
		marginRight: 10,
		fontWeight: 'bold'
	},
	ratingContainer: {
		marginTop: 4,
		flexDirection: 'row',
		alignItems: 'center'
	},
	ratingText: {
		marginRight: 4
	},
	content: {
		marginTop: 8,
		flexDirection: 'row'
	},
	image: {
		height: 150,
		width: 250,
		resizeMode: 'contain',
		borderRadius: 12
	},
	detailsWrapper: {
		paddingTop: 4,
		paddingHorizontal: 16,
		flexDirection: 'column'
	},
	detailsContainer: {
		paddingBottom: 4,
	},
	detailsTitle: {
		fontWeight: '500',
		color: appGreyDark
	},
	detailsContent: {
		fontSize: 15,
		fontWeight: '600'
  },
  button: {
		marginTop: 16,
    flexShrink: 1,
		borderWidth: 1,
		borderColor: appBlue,
		borderRadius: 3,
		paddingHorizontal: 10,
		paddingVertical: 3,
  },
  buttonText: {
		color: appBlue,
    fontSize: 12,
    textAlign: 'center'
	},
	noReviewWrapper: {
		marginTop: 150,
		alignItems: 'center'
	},
	noReviewText: {
		fontSize: 18,
		color: appGreyDark
	}
});