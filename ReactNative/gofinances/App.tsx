import React from 'react';
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import {StatusBar} from 'react-native'
import {ThemeProvider} from 'styled-components'
import AppLoading from 'expo-app-loading'
import theme from './src/global/styles/theme'
import {Routes} from './src/routes'
import {AppRoutes} from './src/routes/app.routes'
import {AuthProvider} from './src/hooks/auth'
import {SignIn} from './src/screens/SignIn'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  }) 

  if(!fontsLoaded){
    return <AppLoading/>
  }
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle='light-content' backgroundColor='#5636d3'/>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </ThemeProvider>
  )
}
