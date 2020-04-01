import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  main: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 45,
    marginTop: 300
  },
  button: {
    borderWidth: 1,
		borderColor: '#0066CC',
		borderRadius: 3,
		paddingHorizontal: 40,
    paddingVertical: 15,
  },
  confirm: {
    backgroundColor: 'red',
    borderColor: 'red',
    borderRadius: 3,
    marginLeft: 16,
    width: 140
  },
  confirmText: {
    color: 'white',
    fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});