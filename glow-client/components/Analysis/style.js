import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 13,
    color: '#7e7e7e',
    marginLeft: 4,
  },
  statusBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },

  goodStatus: {
    backgroundColor: '#D4F7D4',
    borderColor: '#5CB85C',
  },
  moderateStatus: {
    backgroundColor: '#FFF5CC',
    borderColor: '#FFB84D',
  },
  poorStatus: {
    backgroundColor: '#FFD6D6',
    borderColor: '#FF4D4D',
  },
});
