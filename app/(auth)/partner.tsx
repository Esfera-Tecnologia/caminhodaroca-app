import AppVersion from "@/components/AppVersion";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Card from "@/components/Card";
import env from "@/config.json";
import { useAuth } from "@/context/AuthContext";
import PartnerRegistration from "@/modules/auth/partner/Registration";
import { globalStyles } from "@/styles/global";
import { handleRequestError, onValidationFail } from "@/util";
import { partnerSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import { z } from "zod";


type FormData = z.infer<typeof partnerSchema>;

export default function Register() {
  const { onLogin } = useAuth();  
  const methods = useForm<FormData>({
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

  const onSubmitForm = async (data: FormData) => {
    try {
      const response = await axios.post(`${env.API_URL}/register/finish`, data);
      onLogin(response.data);
    } catch (e) {
      const error = (e as any);
      handleRequestError({
        error,
        setError: methods.setError,
        fallbackField: 'name'
      })
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
            onPress={methods.handleSubmit(onSubmitForm, onValidationFail)}
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