import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent black
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  container: {
    backgroundColor: '#FFFCF0',
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: '80%',
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    fontSize: 32,
    color: '#F6A623', // orange warning color
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#D89250', 
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#D89250',
    textAlign: 'center',
    lineHeight: 24,
  },
});
