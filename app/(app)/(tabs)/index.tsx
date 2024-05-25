import { Button, StyleSheet } from 'react-native'

import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'
import { useState } from 'react'
import { Barcodebox, Container, Maintext } from '@/constants/Styles/tabsStyles'
import { CameraView } from 'expo-camera'
import { Link } from 'expo-router'

export default function TabOneScreen() {
  const [hasPermission, setHasPermission] = useState<Boolean>(false)
  const [scanned, setScanned] = useState(false)
  const [text, setText] = useState('Not yet scanned')

  const handleBarCodeScanned = ({
    type,
    data
  }: {
    type: string
    data: string
  }) => {
    setText(data)
    setScanned(true)

    alert(`Bar code with type ${type} and data ${data} has been scanned!`)
  }
  console.log('Index')
  console.log('Index')
  console.log('Index')

  return (
    <Container>
      <Barcodebox>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr']
          }}
          style={StyleSheet.absoluteFillObject}
        />
      </Barcodebox>
      <Maintext>
        <Text>{text}</Text>
      </Maintext>

      <Text>Professor: Gustavo Colombeli</Text>
      <Text>Dia: 15/04/2023</Text>
      <Text>Presença: A confirmar</Text>
      <Link href={'/login'}>Ir para login</Link>
      {scanned && (
        <Button
          title={'Scan again?'}
          onPress={() => setScanned(false)}
          color="tomato"
        />
      )}
    </Container>
  )
}
