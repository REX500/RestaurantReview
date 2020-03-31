import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    color: 'white',
    fontWeight: 'bold',
    borderColor: 'red',
    borderRadius: 3,
    overflow: 'hidden'
  }
});