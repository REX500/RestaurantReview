import {StyleSheet} from 'react-native';

import {appGreyDark, appBlack, appGrayText} from 'utils/styleVars';

export default StyleSheet.create({
  main: {
    marginTop: 16,
  },
  text: {
    textAlign: 'left',
    fontSize: 14
  },
  footer: {
    marginTop: 16,
    marginBottom: 8,
    borderTopColor: appBlack,
    borderWidth: 1,
    borderStyle: 'dashed',
    flexDirection: 'row'
  },
  iconWrapper: {
    marginRight: 48,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 8
  },
  likesDislikes: {
    fontSize: 12,
    color: appGrayText
  },
  clickToExpandText: {
    color: appGreyDark
  }
});