import { StyleSheet } from 'react-native'
import { Text } from '@/components/Themed'
import { useState } from 'react'
import { Barcodebox, Container, Maintext } from '@/constants/Styles/tabsStyles'
import { Link } from 'expo-router'
import { CameraView } from 'expo-camera'
import * as SecureStore from 'expo-secure-store'
import React from 'react'
import axios from 'axios'

export default function TabOneScreen() {
  const [modalVisible, setModalVisible] = useState(true)

  const handleBarCodeScanned = ({ type, data }: { type: string; data: {} }) => {
    async function confirmPresence(data: {}) {
      try {
        let result = await SecureStore.getItemAsync('user_ra')
        console.log('Before axios')

        // Log the result to confirm the user_ra value
        console.log('user_ra:', result)
        console.log('Data: ', data)

        // Uncomment the correct API call and provide the correct URL and payload
        // const response = await axios.post(`http://192.168.1.100:3758/lesson/4`, {
        //   user_id: result
        // })

        const response = await axios.post(
          `http://192.168.100.4:3758/lesson/5/${data.qr_code}`,
          {
            user_id: result
          }
        )

        console.log('After axios')
        console.log('Response:', response.data)
      } catch (error) {
        console.error('Error making request:', error)
      }
    }

    confirmPresence(data)
    setTimeout(() => {}, 6000)
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`)
  }

  return (
    <Container>
      {/* <View style={styles.container}>
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
      </View> */}

      <Barcodebox>
        <CameraView
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr']
          }}
          style={StyleSheet.absoluteFillObject}
        />
      </Barcodebox>
      <Maintext></Maintext>

      <Text>Professor: Gustavo Colombeli</Text>
      <Text>Dia: xx/xx/2024</Text>
      <Text>Presença: Confirmar</Text>
      <Link href={'/login'}>Ir para login</Link>
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
