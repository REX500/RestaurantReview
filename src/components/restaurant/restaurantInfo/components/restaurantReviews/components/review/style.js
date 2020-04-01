import { StyleSheet } from 'react-native';
import { appWhiteSmokey, appBlack } from 'utils/styleVars';

export default StyleSheet.create({
	main: {
		padding: 6,
		marginVertical: 8,
		backgroundColor: appWhiteSmokey,
		borderRadius: 12,
		shadowColor: appBlack,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.20,
		shadowRadius: 1.41,
    elevation: 3
	},
});
