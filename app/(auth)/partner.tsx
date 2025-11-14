import AppVersion from "@/components/AppVersion";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Card from "@/components/Card";
import env from "@/config.json";
import PartnerRegistration from "@/modules/auth/partner/Registration";
import { globalStyles } from "@/styles/global";
import { handleRequestError } from "@/util";
import { partnerSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { router } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import { Toast } from "toastify-react-native";
import { z } from "zod";


export type PartnerFormData = z.infer<typeof partnerSchema>;

export default function Register() {
  const methods = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
    mode: "onChange",
    defaultValues: {
      events: [
        {
          description: undefined,
          image: undefined,
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
          (event.image && event.image !== null && event.image !== "");

        return hasData;
      });
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("description", data.description);
      formData.append("routes", data.routes);
      formData.append("circuits", data.circuits);
      formData.append("attractions", data.attractions);

      if (data.instagram) formData.append("instagram", data.instagram);
      if (data.site) formData.append("site", data.site);

      (data.city ?? []).forEach((city, index) => {
        formData.append(`city[${index}]`, String(city));
      });
      if (data.logo) {
        formData.append("logo", {
          uri: data.logo,
          name: "logo.jpg",
          type: "image/jpeg",
        } as any);
      }
      cleanedEvents.forEach((event, index) => {
        formData.append(`events[${index}][description]`, event.description ?? "");
        formData.append(`events[${index}][externalLink]`, event.externalLink ?? "");

        if (event.image) {
          formData.append(`events[${index}][image]`, {
            uri: event.image,
            name: `event_${index}.jpg`,
            type: "image/jpeg",
          } as any);
        }
      });
      const response = await axios.post(
        `${env.API_URL}/register/partner`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response);
      Toast.success('Cadastro realizado com sucesso! Aguarde enquanto os dados são revisados e aprovados pela nossa equipe.');
      router.dismiss();
    } catch (e) {
      handleRequestError({
        error: e as any,
        setError: methods.setError,
        fallbackField: "name",
      });
    }
  };

  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
      <SystemBars style={{statusBar: 'light', navigationBar: 'dark'}} />
      <View style={[globalStyles.row, globalStyles.flexCenter, {marginVertical: 40}]}>
        <BackButton style={{position: 'absolute', left: 0}}/>
        <Text style={styles.title}>Cadastro de Parceiro</Text>
      </View>
      <FormProvider {...methods}>
        <Card>
          <PartnerRegistration />
          <Button
            loading={methods.formState.isSubmitting}
            onPress={methods.handleSubmit(onSubmitForm, (errors) => {
              console.log(errors);
            })}
            title="Enviar cadastro"
            variant="success"/>
        </Card>
        <AppVersion style={{marginBottom: 20}} />
      </FormProvider>
    </ScrollView>
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
})