import { StyleSheet } from "react-native";

export default StyleSheet.create({
    stepCard: {
    flexDirection: 'column',
    marginBottom: 20
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#D89250',
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 10,
    lineHeight: 24,
  },
  stepInfo: {
    flex: 1,
  },
  stepTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  stepRating: {
    fontSize: 16,
    color: '#F7A53C',
    fontWeight: '600',
  },
  stepRealName: {
     fontSize: 16,
    color: '#D89250',
    marginTop: 4,
    lineHeight: 20,
  },
  stepDescription: {
    fontSize: 16,
    color: '#808080',
    marginTop: 4,
    lineHeight: 20,
  },
  stepTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  stepTime: {
    fontSize: 14,
    color: '#808080',
    marginLeft: 5,
  },

})