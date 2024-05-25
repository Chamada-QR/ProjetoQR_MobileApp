import { StyleSheet } from 'react-native'

import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'
import { useEffect } from 'react'
import { useSession } from '@/context/AuthContext'
import { Redirect } from 'expo-router'

export default function TabTwoScreen() {
  const { signOut } = useSession()

  useEffect(() => {
    signOut()
  }, [])
  return <Redirect href="/login" />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
})
