import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  main: {
    flex: 1,
    marginTop: 64,
    width: '100%'
  },
  inputWrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  inputLabel: {
    fontSize: 14,
    color: 'grey'
  },
  input: {
    padding: 10,
    marginVertical: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3
  },
  ratingWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 16
  },
  rating: {
    flexDirection: 'row',
    marginTop: 4
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0066cc',
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 20
  },
  submitButtonText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center'
  }
});