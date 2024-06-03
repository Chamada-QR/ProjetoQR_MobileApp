import { Button, Modal, StyleSheet } from 'react-native'

import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'
import { useState } from 'react'
import { Barcodebox, Container, Maintext } from '@/constants/Styles/tabsStyles'
import { Link } from 'expo-router'
import { CameraView, useCameraPermissions } from 'expo-camera'
import React = require('react')
import * as Permissions from 'expo-permissions'

export default function TabOneScreen() {
  const [hasPermission, setHasPermission] = useState<Boolean>(false)
  const [scanned, setScanned] = useState(false)
  const [text, setText] = useState('Not yet scanned')

  const [modalVisible, setModalVisible] = useState(true)

  const requestPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    if (status === 'granted') {
      setModalVisible(false)
    }
  }
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

  return (
    <Container>
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false)
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              We need your permission to show the camera
            </Text>
            <Button onPress={requestPermission} title="Grant Permission" />
          </View>
        </Modal>
      </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
})
