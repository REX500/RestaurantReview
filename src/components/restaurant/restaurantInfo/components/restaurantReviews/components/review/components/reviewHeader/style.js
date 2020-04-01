import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 4
  },
  headerContent: {
    flex: 1,
    marginLeft: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeStamp: {
    marginTop: 4,
    flexDirection: 'row'
  },
  timeStampTitle: {
    fontSize: 12,
    color: '#A9A9A9',
    fontWeight: '600'
  },
  timeStampDate: {
    fontSize: 12,
    marginLeft: 4
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'capitalize',
    marginRight: 8
  },
  menu: {
    paddingRight: 8
  },
  menuDelete: {
    color: 'red'
  }
});