import AppVersion from "@/components/AppVersion";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Steps from "@/components/Steps";
import RegistrationFirstStep from "@/modules/auth/register/RegistrationFirstStep";
import RegistrationSecondStep from "@/modules/auth/register/RegistrationSecondStep";
import RegistrationThirdStep from "@/modules/auth/register/RegistrationThirdStep";
import { globalStyles } from "@/styles/global";
import { registrationSchema } from "@/validation/schemas";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { z } from "zod";

type FormData = z.infer<typeof registrationSchema>;

const steps = [
  <RegistrationFirstStep key="step-1" />,
  <RegistrationSecondStep key="step-2" />,
  <RegistrationThirdStep key="step-3" />
];

export default function Register() {
  const methods = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
  });

  const [currentStep, setCurrentStep] = useState(0);


  const nextStep = async () => {
    const fieldsByStep: Record<number, (keyof FormData)[]> = {
      0: ["name", "email", "password", "state", "ageRange", "travelWith"],
      1: ["age", "country"],
      2: ["terms"]
    };
    const currentStepFields = fieldsByStep[currentStep];
    if (!currentStepFields) return;

    const valid = await methods.trigger(currentStepFields);
    if (valid) setCurrentStep((s) => s + 1);
  };

  const prevStep = () => setCurrentStep((s) => s - 1);

  const onSubmit = (data: FormData) => {
    console.log("Form final:", data);
  };

  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
      <View style={[globalStyles.row, globalStyles.flexCenter, {marginVertical: 40}]}>
        <Pressable style={styles.back} onPress={() => router.back()}>
          <FontAwesome6 name="arrow-left-long" size={16} color="#fff" />
        </Pressable>
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
                onPress={methods.handleSubmit(onSubmit)}
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
  back: {
    position: 'absolute',
    left: 0, 
    padding: 4,
  }
})