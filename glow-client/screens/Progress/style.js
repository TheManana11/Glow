import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
    paddingTop: 40,
    marginTop: 50
  },

  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#D89250",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#9E9E9E",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 30,
  },

  /* Tabs */
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: 'center',
    gap: 5
  },
  activeButton: {
    backgroundColor: "#D89250",
  },
  buttonText: {
    fontSize: 16,
    color: "#9E9E9E",
    fontWeight: "500",
  },
  activeButtonText: {
    color: "#FFFFFF",
  },


  contentContainer: {
    flex: 1,
    marginBottom: 70,
  },
});