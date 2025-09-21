import { StyleSheet } from 'react-native';

export default StyleSheet.create({
problemCard: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
  },
  problemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  severityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  severityText: {
    fontSize: 14,
    fontWeight: '500',
  },
  confidenceText: {
    fontSize: 14,
    fontWeight: '500',
  },
  problemTitle: {
    fontSize: 18,
    color: '#D89250',
    fontWeight: '600',
    marginBottom: 5,
  },
  problemDescription: {
    fontSize: 16,
    color: '#808080',
  },

  mildBackground: {
    backgroundColor: '#FEF8E7', 
  },
  moderateBackground: {
    backgroundColor: '#FCEEE9', 
  },
  severeBackground: {
    backgroundColor: '#FDECEC', 
  },
  defaultBackground: {
    backgroundColor: '#F0F0F0', 
  },

  mildText: {
    color: '#E5A029',
  },
  moderateText: {
    color: '#E55D2E',
  },
  severeText: {
    color: '#D92D20',
  },
  defaultText: {
    color: '#808080',
  }
})
