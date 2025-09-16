import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 20,
  },

  /** Header Section **/
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    color: '#808080',
    fontWeight: '500',
  },
  percentage: {
    fontSize: 18,
    color: '#D89250',
    fontWeight: '600',
  },

  /** Detected Issues Section **/
  detectedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  detectedTitle: {
    fontSize: 20,
    color: '#D89250',
    fontWeight: '600',
  },
  detectedSubtitle: {
    fontSize: 16,
    color: '#808080',
  },

  /** Button **/
  button: {
    backgroundColor: '#D89250',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
