import { View, Text } from 'react-native'
import React from 'react'
import { TextInput, Button } from 'react-native-paper'
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Formik, FormikProps } from 'formik'
import * as yup from 'yup'
import { styles } from '../constants/Styles/loginStyles'
import { Link, router } from 'expo-router'
import { useSession } from '@/context/AuthContext'

interface FormFields {
  ra: string
  password: string
}

const formValidationSchema = yup.object({
  ra: yup.number().required(),
  password: yup.string().required()
})

export default function Login() {
  const { signIn } = useSession()

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Formik
          initialValues={{ ra: '', password: '' }}
          validationSchema={formValidationSchema}
          onSubmit={(val, actions) => {
            signIn('user_ra', val.ra)
            // signIn()
            actions.resetForm()
            router.replace('/')
          }}
        >
          {(props: FormikProps<FormFields>) => (
            <View style={styles.form}>
              <TextInput
                mode="flat"
                label="RA"
                keyboardType="numeric"
                maxLength={6}
                value={props.values.ra.toString()}
                onChangeText={props.handleChange('ra')}
                style={styles.round}
              />
              <TextInput
                mode="flat"
                label="Senha"
                value={props.values.password}
                secureTextEntry
                onChangeText={props.handleChange('password')}
                style={styles.round}
              />
              <Button
                style={styles.button}
                mode="contained"
                onPress={() => props.handleSubmit()}
              >
                <Text>Fazer login</Text>
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  )
}
