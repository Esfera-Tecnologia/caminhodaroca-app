import Button from '@/components/Button';
import RecordLoading from '@/components/RecordLoading';
import RecordNotFound from '@/components/RecordNotFound';
import env from "@/config.json";
import { PartnerType } from '@/interfaces';
import PartnerRegistration, { preparePartnerDataForSubmission } from '@/modules/auth/partner/Registration';
import { globalStyles } from '@/styles/global';
import { cleanObject, handleRequestError, onValidationFail } from '@/util';
import { partnerSchema } from '@/validation/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import z from 'zod';

const partnerUpdateSchema = partnerSchema.omit({termsAccepted: true});

export type PartnerUpdateFormData = z.infer<typeof partnerUpdateSchema>;

export default function PropertyDetails() {
  const { partner: partnerId } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [partner, setPartner] = useState<PartnerType | null>(null);
  const methods = useForm<PartnerUpdateFormData>({
    resolver: zodResolver(partnerUpdateSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const response = await axios.get(`${env.API_URL}/partners/${partnerId}`);
        const partnerData = response.data;
        setPartner(partnerData);
        methods.reset({
          ...cleanObject(partnerData),
          events: partnerData.events.length > 0 
            ? partnerData.events
            : [{description: undefined, images: undefined, externalLink: undefined}],
          logo: undefined,
          cities: Object.keys(partnerData.cities).map(Number)
        });
      } catch (error) {
        console.log('Erro ao buscar propriedade:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartner();
  }, [partnerId, methods]);

  if (loading) {
    return <RecordLoading />;
  }
  if (!partner) {
    return <RecordNotFound />;
  }
 
  const onSubmitForm = async (data: PartnerUpdateFormData) => {
    try {
      const formData = preparePartnerDataForSubmission(data);
      formData.append('_method', 'PUT');
      await axios.post(
        `${env.API_URL}/partners/${partnerId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      Alert.alert(
        'Alterações salvas com sucesso!',
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
      <ScrollView style={styles.container}>
        <FormProvider {...methods}>
        <View style={[globalStyles.card, {marginVertical: 20}]}>
          <PartnerRegistration partner={partner}/>
          <Button
            loading={methods.formState.isSubmitting}
            onPress={methods.handleSubmit(onSubmitForm, onValidationFail)}
            title="Salvar alterações"
            style={{marginBottom: 8}}
            variant="success"/>
          <Button
            onPress={() => router.dismiss()}
            title="Cancelar"
            outline={true}
            variant="secondary"/>
        </View>
      </FormProvider>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
});
