import Button from '@/components/Button';
import PartnerRegistration from '@/modules/auth/partner/Registration';
import { globalStyles } from '@/styles/global';
import { onValidationFail } from '@/util';
import { partnerSchema } from '@/validation/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import z from 'zod';

type FormData = z.infer<typeof partnerSchema>;

export default function PropertyDetails() {
  const methods = useForm<FormData>({
    resolver: zodResolver(partnerSchema),
    mode: "onChange",
  });

  const onSubmitForm = async (data: FormData) => {
    try {
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <FormProvider {...methods}>
        <View style={[globalStyles.card, {marginVertical: 20}]}>
          <PartnerRegistration />
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
