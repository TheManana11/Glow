import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 16,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  dateText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333333",
    marginLeft: 6,
  },

  scoreBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  warningBadge:{
    backgroundColor: "#FEFCE8",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },

  scoreText: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "600",
  },
  warning: {
    fontSize: 16,
    color: "#F4A300",
    fontWeight: "600",
  },

  section: {
    marginTop: 10,
  },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  improvementTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4CAF50",
    marginLeft: 6,
  },

  focusTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#F4A300",
    marginLeft: 6,
  },

  bulletRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    marginLeft: 10,
  },

  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CAF50",
    marginRight: 8,
  },

  yellowDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#F4A300",
    marginRight: 8,
  },

  bulletText: {
    fontSize: 16,
    color: "#555555",
    flexShrink: 1,
  },
  emptyStateContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 30,
  marginTop: 20,
  padding: 20,
  backgroundColor: '#FFF8F0',
  borderRadius: 10,
},
  emptyTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#D89250',
  marginBottom: 8,
},

emptySubtitle: {
  fontSize: 16,
  color: '#808080',
  textAlign: 'center',
  marginBottom: 20,
  lineHeight: 22,
},

emptyButton: {
  backgroundColor: '#D89250',
  paddingVertical: 12,
  paddingHorizontal: 30,
  borderRadius: 8,
},

emptyButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},
});