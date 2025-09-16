import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 20,
  },

  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#D89250',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#808080',
    textAlign: 'center',
    marginTop: 5,
  },

  goalsBox: {
    backgroundColor: '#D89250',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
  },
  goalsTextTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  goalsText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  goalsNote: {
    fontSize: 14,
    color: '#fff',
    marginTop: 8,
  },

  ineSection: {
    backroutgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 15,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  routineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  routineTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#D89250',
    marginLeft: 8,
  },
  routineList: {
    gap: 15,
  },

  tipsBox: {
    backgroundColor: '#EAF4FF',
    padding: 15,
    borderRadius: 10,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3A80F8',
    marginBottom: 8,
  },
  tip: {
    fontSize: 16,
    color: '#3A80F8',
    marginBottom: 5,
  },
});
