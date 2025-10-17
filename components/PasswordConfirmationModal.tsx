import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import DefaultModal from "./DefaultModal";
import InputGroup from "./controls/InputGroup";
import Password from "./controls/Password";

type PasswordConfirmationModalProps = {
  visible: boolean,
  route: string,
  onConfirm: (response: AxiosResponse) => void,
  onDismiss: () => void
}
export default function PasswordConfirmationModal({visible, route, onConfirm, onDismiss}: PasswordConfirmationModalProps) {
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordConfirmationLoading, setPasswordConfirmationLoading] = useState(false);
  const [passwordConfirmationError, setPasswordConfirmationError] = useState('');

  const onDeleteAccount = async () => {
    setPasswordConfirmationLoading(true);
    try {
      const response = await axios.post(route, {
        password: passwordConfirmation,
      });
      onConfirm(response);
      return true;
    } catch (e) {
      const error = e as any;
      const status = error.response.status;
      const response = error.response.data;
      if (typeof response?.errors === 'object' && response?.errors !== null) {
        Object.entries(response.errors).forEach(([field, message]) => {
          setPasswordConfirmationError(Array.isArray(message) ? message[0] : message)
        });
      } else {
        setPasswordConfirmationError(response?.message ?? 'Erro desconhecido')
      }
    } finally {
      setPasswordConfirmationLoading(false);
    }
  }
  
  return (
    <DefaultModal visible={visible}>
      <Text style={styles.title}>Atenção</Text>
      <Text style={{marginBottom: 8}}>Para prosseguir com a operação, confirme a sua senha através do campo abaixo:</Text>
      <InputGroup style={{marginBottom: 16}} error={passwordConfirmationError}>
        <Password
          placeholder="Senha atual"
          value={passwordConfirmation}
          onChangeText={(value) => setPasswordConfirmation(value)} />
      </InputGroup>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, marginEnd: 8}}>
          <Button
            variant="success"
            title="Voltar"
            onPress={onDismiss}/>
        </View>
        <View style={{flex: 1}}>
          <Button
            loading={passwordConfirmationLoading}
            variant="danger"
            title="Confirmar"
            onPress={onDeleteAccount}/>
        </View>
      </View>
    </DefaultModal>
  )
}


const styles = StyleSheet.create({
  title: {
    fontWeight: 700,
    fontSize: 16,
    marginBottom: 4
  },
})