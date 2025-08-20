import AppVersion from "@/components/AppVersion";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Steps from "@/components/Steps";
import env from "@/config.json";
import { useAuth } from "@/context/AuthContext";
import RegistrationFirstStep from "@/modules/auth/register/RegistrationFirstStep";
import RegistrationSecondStep from "@/modules/auth/register/RegistrationSecondStep";
import RegistrationThirdStep from "@/modules/auth/register/RegistrationThirdStep";
import { globalStyles } from "@/styles/global";
import { handleRequestError } from "@/util";
import { registrationSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { z } from "zod";

type FormData = z.infer<typeof registrationSchema>;

const steps = [
  <RegistrationFirstStep key="step-1" />,
  <RegistrationSecondStep key="step-2" />,
  <RegistrationThirdStep key="step-3" />
];

export default function Register() {
  const { onLogin } = useAuth();
  const methods = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
  });
  const [currentStep, setCurrentStep] = useState(0);
  const nextStep = async () => {
    const fieldsByStep: Record<number, (keyof FormData)[]> = {
      0: ["name", "email", "password", "state", "ageRange", "travelWith"],
      1: ["category", "subcategories"],
      2: ["terms"]
    };
    const currentStepFields = fieldsByStep[currentStep];
    if (!currentStepFields) return;

    const valid = await methods.trigger(currentStepFields);
    if (! valid) return;

    const data = methods.getValues();
    const submitted = await onSubmitStep(currentStep, data);
    if (submitted) setCurrentStep((s) => s + 1);
  };
  const prevStep = () => setCurrentStep((s) => s - 1);
  
  const onSubmitStep = async (step: number, data: FormData) => {
    try {
      await axios.post(`${env.API_URL}/register/step${step + 1}`, prepareDataToSubmission(data));
      return true;
    } catch (e) {
      const error = (e as any);
      handleRequestError({
        error,
        setError: methods.setError,
        fallbackField: 'name'
      })
      return false;
    }
  }

  const onSubmitForm = async (data: FormData) => {
    try {
      const response = await axios.post(`${env.API_URL}/register/finish`, prepareDataToSubmission(data));
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

  const prepareDataToSubmission = (data: FormData) => {
    return {
      ...data,
      subcategories: data.subcategories?.map(sub => sub.value)
    }
  }
  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
      <View style={[globalStyles.row, globalStyles.flexCenter, {marginVertical: 40}]}>
        <BackButton style={{position: 'absolute', left: 0}}/>
        <Text style={styles.title}>Criar Conta</Text>
      </View>
      <FormProvider {...methods}>
        <Card>
          <Steps current={currentStep} />
          {steps[currentStep]}
          <View style={[globalStyles.row, globalStyles.itemsCenter, {justifyContent: currentStep === 0 ? 'center' : 'space-between'}]}>
            {currentStep > 0 && (
              <Button
                onPress={prevStep}
                variant="secondary"
                title="Voltar" />
            )}
            {currentStep < steps.length - 1 ? (
              <Button
                onPress={nextStep}
                variant="primary"
                title="Próximo" />
            ) : (
              <Button
                onPress={methods.handleSubmit(onSubmitForm)}
                variant="primary"
                title="Finalizar Cadastro" />
            )}
          </View>
          <AppVersion theme="light" style={{marginBottom: 20}} />
        </Card>
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