import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    backgroundColor: '#F9FAFB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  logo: {
    width: 120,
    height: 50
  },
  title: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '600',
    color: '#D89250',
  },
  subtitle: {
    color: '#808080',
    fontSize: 14,
    marginBottom: 24,
    marginTop: 8,
  },
  form: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  formSubtitle: {
    color: '#808080',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  inputHalf: {
    width: '48%',
  },
  textInput: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    height: 50,
    paddingHorizontal: 12,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#D89250',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  footerText: {
    textAlign: 'center',
    color: '#999',
  },
  loginLink: {
    color: '#D89250',
    fontWeight: 'bold',
  },
  inputWithIcon: {
  flexDirection: 'row',
  alignItems: 'center',
  borderColor: '#ddd',
  borderWidth: 1,
  borderRadius: 10,
  paddingHorizontal: 12,
  marginBottom: 16,
  height: 50,
},

icon: {
  marginRight: 8,
},

textInput: {
  flex: 1,
  fontSize: 16,
},

});
