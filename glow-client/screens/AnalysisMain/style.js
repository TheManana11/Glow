import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  /** Main Container **/
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 20,
    paddingTop: 30,
    marginTop: 50,
  },

  /** Header **/
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: '#D89250', // Accent color for brand identity
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#808080',
    marginBottom: 40,
    lineHeight: 22,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    marginVertical: 10,
    paddingHorizontal: 10,
  },

  /** Each Step Wrapper **/
  buttonWithLabel: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6, 
    flex: 1,
  },

  stepLabel: {
    fontSize: 14,
    color: '#808080',
    textAlign: 'center',
    fontWeight: '500',
  },
  activeStepLabel: {
    color: '#D89250',
    fontWeight: '600',
  },

  /** Step Buttons **/
  navButton: {
    backgroundColor: '#808080',
    padding: 15,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2, // subtle shadow for better visibility
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activeButton: {
    backgroundColor: '#D89250', 
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  subRouteContainer: {
    flex: 1,
    marginTop: 25,
  },
});
