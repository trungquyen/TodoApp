import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: '100%',
    backgroundColor: 'rgba(231, 244, 245, 0.1)',
    position: 'relative'
  },
  input: {
    width: '90%',
    height: 60,
    borderRadius: 100,
    paddingHorizontal: 30,
    fontSize: 20,
    backgroundColor: 'white',
    marginBottom: 25
  },
  button: isValid => ({
    width: '90%',
    height: 50,
    marginTop: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isValid ? 'rgba(112, 188, 189, 1.0)' : 'black',
  }),
  button: {
    width: '90%',
    height: 50,
    marginTop: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(112, 188, 189, 1.0)',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  }
});

export default styles;