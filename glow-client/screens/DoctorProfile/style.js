import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 50
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#D89250',
    borderRadius: 12,
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
  },
  changePhotoText: {
    marginTop: 15,
    fontSize: 16,
    color: '#D89250',
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#D89250',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 5,
    marginTop: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  placeholderText: {
    flex: 1,
    fontSize: 16,
    color: '#aaa',
    marginLeft: 10,
  },
  verificationSection: {
    paddingVertical: 10,
  },
  verificationTitle: {
    fontSize: 20,
    color: '#007AFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  verificationSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6969FF',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  uploadBox: {
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  uploadSubtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  uploadButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    fontSize: 16,
    color: '#D89250',
    marginLeft: 8,
  },
  verificationNoteBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF5E6',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    alignItems: 'flex-start',
    gap: 8,
  },
  verificationNote: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#D89250',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  noteText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#555',
    marginBottom: 70
  },
});

export default styles;
