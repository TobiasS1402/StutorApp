import AsyncStorage from '@react-native-community/async-storage'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { WebView, WebViewNavigation } from 'react-native-webview'
import { AuthData } from '@/types'
import { urlParamParser } from '@/utils'

type AuthContextData = {
  authData?: AuthData
  loading: boolean
  signIn(): void
  signOut(): void
}

//Create the Auth Context with the data type specified
//and a empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>()

  //the AuthContext start with loading equals true
  //and stay like this, until the data be load from Async Storage
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call de loadStorage function.
    loadStorageData()
  }, [])

  async function loadStorageData(): Promise<void> {
    try {
      //Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem('@AuthData')
      if (authDataSerialized) {
        //If there are data, it's converted to an Object and the state is updated.
        const _authData: AuthData = JSON.parse(authDataSerialized)
        setAuthData(_authData)
      }
    } catch (error) {
      console.log(error)
    } finally {
      //loading finished
      setLoading(false)
    }
  }

  const signIn = async () => (
    // todo call an async service that simply provides the authData
    <WebView
      source={{ uri: `${process.env.API_URL}/auth/login` }}
      onNavigationStateChange={onNavigationStateChange}
    />
  )

  const onNavigationStateChange = async (navigationState: WebViewNavigation) => {
    const url: string = navigationState.url
    if (!url) return

    const authToken = urlParamParser(url, 'token')

    if (authToken) {
      setAuthData({ token: authToken })
      await AsyncStorage.setItem('@AuthData', JSON.stringify(authData))
    }
  }

  const signOut = async () => {
    setAuthData(undefined)
    await AsyncStorage.removeItem('@AuthData')
  }

  return (
    <AuthContext.Provider value={{ authData, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthContext, AuthProvider, useAuth }
