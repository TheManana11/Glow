import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    marginTop: 50
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  email: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  changePhoto: {
    fontSize: 14,
    color: '#D89250',
  },
  editIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    elevation: 2,
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#D89250',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'start',
    marginBottom: 8,
    gap: 10,
  },
  column: {
    flexDirection: 'row'
  },
  label: {
    fontSize: 13,
    color: '#888',
    textAlign: 'left'
  },
  value: {
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
    marginLeft: 22,
    textAlign: 'left'
  },
  signOutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 8,
  },
  signOutText: {
    color: '#EB4D4D',
    fontWeight: 'bold',
  },
  input: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  padding: 12,
  marginBottom: 20, // Adds space between inputs
  fontSize: 16,
  color: '#333',
  backgroundColor: '#fff',
},

row: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 12,
},

btn: {
  backgroundColor: '#D89250',
  paddingVertical: 12,
  paddingHorizontal: 30,
  borderRadius: 8,
  marginTop: 10
},

btnText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
  textAlign: 'center'
},

});
