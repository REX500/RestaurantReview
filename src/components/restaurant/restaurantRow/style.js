import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
		flexDirection: 'column',
	},
	row: { flexDirection: 'row', alignItems: 'center' },
	textSmall: { flex: 1 },
	nameAddress: { flexDirection: 'column', flex: 8 },
	button: {
		borderWidth: 1,
		borderColor: '#0066CC',
		borderRadius: 3,
		paddingHorizontal: 10,
		paddingVertical: 3,
	},
	buttonText: {
		color: '#0066CC',
		fontSize: 12,
	},
	restaurantDetails: {
		flex: 1,
		borderWidth: 1,
		padding: 8,
		marginHorizontal: 30,
		marginVertical: 10,
		borderColor: '#ddd',
		borderRadius: 2,
	},
	imageStyle: {
		width: 200,
		height: 120,
	},
	rating: {
		flexDirection: 'row',
		flexBasis: 70,
	}
});