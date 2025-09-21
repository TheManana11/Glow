import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    marginBottom: 50,
  },
  uploadText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#D89250',
    marginVertical: 20,
  },
  chooseButton: {
    backgroundColor: '#D89250',
    width: '90%',
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 20,
    alignItems: 'center'
  },
  chooseButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  fileInfo: {
    fontSize: 16,
    color: '#808080',
    textAlign: 'center',
  },
  note: {
    fontSize: 16,
    color: '#808080',
    textAlign: 'center',
    marginTop: 20,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
    color: '#D89250',
  },
  tipsSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#808080',
    marginBottom: 20,
  },
  tipCard: {
    backgroundColor: '#fff',
    padding: 35,
    borderRadius: 10,
    marginBottom: 25,
    alignItems: 'center',
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 15,
    color: '#D89250',
  },
  tipText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#808080',
  },
  icon:{
    borderColor: '#fff',
    borderWidth: 1,
    padding: 10,
    borderRadius: '50%',
  }
});
