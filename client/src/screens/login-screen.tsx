import { Button, Divider, PlainText, Title } from '@components/general'
import { ScreenContainer, ScreenWrapper, Section } from '@components/layout'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { WebView, WebViewNavigation } from 'react-native-webview'
import styled from 'styled-components/native'
import { useAuth } from '@/contexts/auth'
import { color, spaces, typography } from '@/theme'
import { urlParamParser, useToggle } from '@/utils'

/**
 * Login function
 */
export const LoginScreen = () => {
  const auth = useAuth()
  const [showWebview, toggleWebView] = useToggle()

  /**
   * Gets authorisation of the user and sending to new page
   * @param navigationState
   */
  const onNavigationStateChange = async (navigationState: WebViewNavigation) => {
    const url: string = navigationState.url
    if (!url) return

    const authToken = urlParamParser(url, 'token')

    if (authToken) {
      await auth.signIn(authToken)
    }
  }

  /**
   * Styling code
   */
  const Wrapper = styled(ScreenWrapper)`
    justify-content: space-between;
    align-items: center;
    padding-bottom: ${spaces.xl4}px;
  `

  const Image = styled.Image`
    flex: 1;
    aspect-ratio: 1;
  `

  /**
   * Showing components like a picture, text and the login button on the login page
   */
  return (
    <ScreenContainer>
      <SafeAreaView />
      {showWebview ? (
        <WebView
          source={{ uri: `https://stutor.seijsener.space/v1/auth/login` }}
          onNavigationStateChange={onNavigationStateChange}
        />
      ) : (
        <Wrapper>
          <Image source={require('@assets/images/login.png')} />+
          <Section>
            <Title
              value="Inloggen"
              fontSize={typography.xl5.fontSize}
              fontFamily="Lato-Bold"
              color={color.black}
            />
            <Divider />
            <PlainText>
              Om gebruik te maken van Stutor dien je in te loggen met je school account
            </PlainText>
            <Divider />
            <Button onPress={toggleWebView}>
              <Title
                value="Inloggen met school account"
                fontSize={typography.md.fontSize}
                fontFamily="Lato-Bold"
                color={color.white}
              />
            </Button>
          </Section>
        </Wrapper>
      )}
    </ScreenContainer>
  )
}
