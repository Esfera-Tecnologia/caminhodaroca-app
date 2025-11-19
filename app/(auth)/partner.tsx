import AppVersion from "@/components/AppVersion";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ErrorMessage from "@/components/controls/ErrorMessage";
import StyledCheckbox from "@/components/controls/StyledCheckbox";
import Terms from "@/components/Terms";
import env from "@/config.json";
import PartnerRegistration from "@/modules/auth/partner/Registration";
import { globalStyles } from "@/styles/global";
import { handleRequestError, onValidationFail } from "@/util";
import { partnerSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { z } from "zod";


export type PartnerFormData = z.infer<typeof partnerSchema>;

export default function Register() {
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const methods = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
    mode: "onChange",
    defaultValues: {
      events: [
        {
          description: undefined,
          images: undefined,
          externalLink: undefined,
        }
      ]
    }
  });

  const onSubmitForm = async (data: PartnerFormData) => {
    try {
      const cleanedEvents = (data.events ?? []).filter(event => {
        const hasData =
          (event.description && event.description.trim() !== '') ||
          (event.externalLink && event.externalLink.trim() !== '') ||
          (event.images && event.images[0] !== null && event.images[0] !== '');

        return hasData;
      });
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("description", data.description);
      formData.append("routes", data.routes);
      formData.append("circuits", data.circuits);
      formData.append("attractions", data.attractions);

      if (data.instagram) 
        formData.append("instagram", data.instagram);
      if (data.site)
        formData.append("site", data.site);
      (data.cities ?? []).forEach((city, index) => {
        formData.append(`cities[${index}]`, String(city));
      });
      if (data.logo) {
        formData.append("logo", {
          uri: data.logo,
          name: "logo.jpg",
          type: "image/jpeg",
        } as any);
      }
      cleanedEvents.forEach((event, index) => {
        formData.append(`events[${index}][name]`, event.name ?? "");
        formData.append(`events[${index}][description]`, event.description ?? "");
        formData.append(`events[${index}][externalLink]`, event.externalLink ?? "");

        if (event.images?.length && event.images[0] !== undefined) {
          formData.append(`events[${index}][images][0]`, {
            uri: event.images[0],
            name: `event_${index}.jpg`,
            type: "image/jpeg",
          } as any);
        }
      });
      await axios.post(
        `${env.API_URL}/register/partner`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      Alert.alert(
        'Cadastro realizado com sucesso!',
        'Aguarde enquanto os dados são revisados e aprovados pela nossa equipe.',
        [{ text: 'OK', onPress: () => router.dismiss()}]
      );
    } catch (e) {
      handleRequestError({
        error: e as any,
        setError: methods.setError,
        fallbackField: "name",
      });
    }
  };

  return (
    <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
        <SystemBars style={{statusBar: 'light', navigationBar: 'dark'}} />
        <View style={[globalStyles.row, globalStyles.flexCenter, {marginVertical: 40}]}>
          <BackButton style={{position: 'absolute', left: 0}}/>
          <Text style={styles.title}>Cadastro de Parceiro</Text>
        </View>
        <FormProvider {...methods}>
          <Card>
            <PartnerRegistration />
            <Controller
              control={methods.control}
              name="termsAccepted"
              render={({ field: { onChange, value } }) => (
                <View style={{marginBottom: 22}}>
                  <View style={[globalStyles.row, globalStyles.itemsCenter]}>
                    <StyledCheckbox 
                      size={'md'}
                      value={value}
                      style={{ marginEnd: 8 }}
                      onValueChange={(checked: boolean) => onChange(checked)} />
                    <View style={globalStyles.row}>
                      <Text style={[globalStyles.textBase, {flexShrink: 1}]}>Eu concordo com os {" "}</Text>
                      <Pressable style={{padding: 0}} onPress={() => setTermsModalVisible(true)}>
                        <Text style={globalStyles.link}>termos de uso</Text>
                      </Pressable>
                    </View>
                  </View>
                  {methods.formState.errors.termsAccepted && 
                    <ErrorMessage>{methods.formState.errors.termsAccepted.message}</ErrorMessage>
                  }
                </View>
              )} />
            <Button
              loading={methods.formState.isSubmitting}
              onPress={methods.handleSubmit(onSubmitForm, onValidationFail)}
              title="Enviar cadastro"
              variant="success"/>
          </Card>
          <AppVersion style={{marginBottom: 20}} />
        </FormProvider>
      </ScrollView>
      <Modal
        animationType="slide"
        visible={termsModalVisible}
        onRequestClose={() => {
          setTermsModalVisible(!termsModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Terms style={{flex: 1, padding: 20}}/>
            <Pressable style={styles.modalClose} onPress={() => setTermsModalVisible(false)}>
              <Text>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#006b5f',
    flexGrow: 1,
    padding: 12,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 500,
  },
  centeredView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  modalView: {
    backgroundColor: "#fff"
  },
  modalClose: {
    backgroundColor: "lightgray",
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  }
})