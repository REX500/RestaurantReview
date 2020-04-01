import { StyleSheet } from 'react-native';

import {appBlue, appGreyLight, appWhite} from 'utils/styleVars';

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
  nameText: {
    padding: 10,
    marginVertical: 4,
    fontSize: 16
  },
  input: {
    padding: 10,
    marginVertical: 4,
    borderColor: appGreyLight,
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
    backgroundColor: appBlue,
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 20
  },
  submitButtonText: {
    fontSize: 18,
    color: appWhite,
    textAlign: 'center'
  }
});