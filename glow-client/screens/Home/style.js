import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 50
  },
  header:{
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderBottomColor: '#808080',
    borderBottomWidth: 0.4,
    marginBottom: 25
  },
  headerName:{
    fontSize: 20,
    color: '#000',

  },
  avatar:{
    width: 50,
    height: 50,
    borderRadius: '50%',
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  headerText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  bold: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D89250'
  },
  subText: {
    color: '#777',
    fontSize: 16,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 234,
    borderRadius: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#D89250',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  learnMoreButton: {
    backgroundColor: '#FFF6ED',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  learnMoreText: {
    color: '#D89250',
    fontWeight: 'bold',
  },
  progressSection: {
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  progressTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
    color: '#D89250'
  },
  progressLabel: {
    fontSize: 16,
    color: '#808080',
    marginBottom: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#ddd',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    width: '71%',
    height: '100%',
    backgroundColor: '#D89250',
  },
  rowScore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressStat: {
    fontSize: 16,
    textAlign: 'center',
  },
  days: {
    color: '#D89250',
    fontWeight: 'bold',
  },
  percentage: {
    color: 'green',
    fontWeight: 'bold',
  },
  analysisSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    borderColor: '#eee',
    borderWidth: 1,
  },
  titleIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#D89250',
    marginBottom: 25,
  },
  analysisItem: {
    marginBottom: 20,
  },
  analysisTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  analysisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  analysisTime: {
    fontSize: 12,
    color: '#999',
  },
  analysisStatusSuccess: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: 'bold',
  },
  analysisStatusDanger: {
    color: '#F44336',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tipSection: {
    backgroundColor: '#FFF6ED',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderColor: '#D89250',
    borderWidth: 1,
  },
  tipTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  tipHeader: {
    fontWeight: 'bold',
    color: '#D89250',
    fontSize: 18,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 16,
    color: '#808080',
  },
  analysisNowButton: {
    backgroundColor: '#D89250',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  analysisNowText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
