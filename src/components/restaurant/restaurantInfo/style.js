import { StyleSheet } from 'react-native';

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
		resizeMode: 'contain'
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
		color: 'darkgrey'
	},
	detailsContent: {
		fontSize: 15,
		fontWeight: '600'
  },
  button: {
    flexShrink: 1,
		borderWidth: 1,
		borderColor: '#0066CC',
		borderRadius: 3,
		paddingHorizontal: 10,
		paddingVertical: 3,
  },
  buttonText: {
		color: '#0066CC',
    fontSize: 12,
    textAlign: 'center'
	},
});