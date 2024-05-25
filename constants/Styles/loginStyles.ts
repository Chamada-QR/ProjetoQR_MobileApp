import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: 750,
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    display: 'flex',
    width: 250,
    gap: 8
  },
  round: {
    borderRadius: 6
  },
  button: {
    marginTop: 8
  }
})
