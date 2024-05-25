import { StyleSheet, Text, View } from 'react-native'
import styled from 'styled-components'
export const Maintext = styled(View)`
  font-size: 16px;
  margin: 20px;
`
export const Barcodebox = styled(View)`
  align-items: center;
  height: 300px;
  width: 300px;
  overflow: hidden;
  border-radius: 30px;
  background-color: ${props => props.theme.backgroundColor};
`
export const TextStyled = styled(Text)``
export const Container = styled(View)`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 750px;
  align-items: center;
  justify-content: center;
`
