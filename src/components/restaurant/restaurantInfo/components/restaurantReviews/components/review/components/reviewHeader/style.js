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
  content: {
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  name: {
    fontSize: 16,
    fontWeight: '300',
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