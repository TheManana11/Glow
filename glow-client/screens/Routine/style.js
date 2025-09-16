import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 20,
  },

  /** Header **/
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

  /** Goals Box **/
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

  /** Routine Section **/
  routineSection: {
    backgroundColor: '#fff',
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

  /** Individual Step **/
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

  /** Tips Section **/
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
