import React from 'react'
import { useStorageState } from './useStorageState'
import * as SecureStore from 'expo-secure-store'

const AuthContext = React.createContext<{
  signIn: (key, value) => void
  signOut: () => void
  session?: string | null
  isLoading: boolean
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false
})

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext)
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />')
    }
  }

  return value
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session')

  return (
    <AuthContext.Provider
      value={{
        signIn: async (key, value) => {
          await SecureStore.setItemAsync(key, value)
          // Perform sign-in logic here
          console.log('Inside sign-in')
          setSession('xxx')
        },
        signOut: () => {
          setSession(null)
        },
        session,
        isLoading
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
