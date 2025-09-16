import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
    marginTop: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 24,
  },
  headerBack: {
    fontSize: 24,
    color: '#D89250',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#D89250',
  },

  analysisBox: {
    backgroundColor: '#D89250',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  analysisHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  analysisTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  percentageBubble: {
    backgroundColor: '#c48140',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  percentageText: {
    color: '#fff',
    fontSize: 16,
  },
  analysisSubtitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  analysisDetails: {
    color: '#fff',
    fontSize: 14,
  },

  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#D89250',
  },

  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  scoreBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#808080',
    marginBottom: 4,
  },
  scoreChangePositive: {
    fontSize: 14,
    color: '#2ecc71', 
    marginBottom: 8,
  },
  scoreChangeNegative: {
    fontSize: 14,
    color: '#e74c3c', 
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },

    issuesSection: {
    marginTop: 20,
  },
  issuesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  issuesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D89250',
  },
  issuesCount: {
    fontSize: 14,
    color: '#7e7e7e',
  },
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
    marginTop: 12
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

});
