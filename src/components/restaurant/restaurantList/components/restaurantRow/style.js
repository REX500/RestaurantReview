import { StyleSheet } from 'react-native';

import { appBlue, appWhiteSmokey } from 'utils/styleVars';

export default StyleSheet.create({
  wrapper: {
		flexDirection: 'column',
	},
	row: { flexDirection: 'row', alignItems: 'center' },
	textSmall: { flex: 1 },
	nameAddress: { flexDirection: 'column', flex: 8 },
	button: {
		borderWidth: 1,
		borderColor: appBlue,
		borderRadius: 3,
		paddingHorizontal: 10,
		paddingVertical: 3,
	},
	buttonText: {
		color: appBlue,
		fontSize: 12,
	},
	imageStyle: {
		width: 200,
		height: 120,
	},
	rating: {
		flexDirection: 'row',
		flexBasis: 70,
	},
	coloredRow: {
		backgroundColor: appWhiteSmokey
	}
});