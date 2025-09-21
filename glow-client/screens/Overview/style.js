import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderRadius: 10
  },
  cardLeft: {
    flexDirection: "column",
  },
  cardTitle: {
    fontSize: 18,
    color: "#9E9E9E",
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 5,
  },
  cardRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  percentagePositive: {
    fontSize: 16,
    color: "#4CAF50",
    marginLeft: 5,
  },
  percentageNegative: {
    fontSize: 16,
    color: "#F44336",
    marginLeft: 5,
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