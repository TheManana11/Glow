// VerifiedDoctorsScreen.styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 50
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D89250',
    marginBottom: 20,
    paddingTop: 30,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#f5f5f5',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 20,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 13,
    marginTop: 2,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    color: '#D89250',
    fontSize: 16,
    fontWeight: 'bold',
  },
  perSession: {
    fontSize: 10,
    color: '#888',
  },
  text: {
    fontSize: 14,
    marginVertical: 2,
    color: '#808080',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 8,
  },
  loadMoreButton: {
    marginTop: 10,
    marginBottom: 80,
    borderWidth: 1,
    borderColor: '#D89250',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  loadMoreText: {
    fontSize: 16,
    color: '#D89250',
    fontWeight: 'bold',
  },
});

export default styles;
