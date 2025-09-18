import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Steps from "@/components/Steps";
import env from "@/config.json";
import { useAuth, User } from "@/context/AuthContext";
import RegistrationFirstStep from "@/modules/auth/register/RegistrationFirstStep";
import RegistrationSecondStep from "@/modules/auth/register/RegistrationSecondStep";
import { globalStyles } from "@/styles/global";
import { handleRequestError } from "@/util";
import { profileUpdateSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { Toast } from "toastify-react-native";
import z from "zod";

type FormData = z.infer<typeof profileUpdateSchema>;

const steps = [
  <RegistrationFirstStep key="step-1" />,
  <RegistrationSecondStep key="step-2" />,
];

export default function Profile() {
  const { user, setUser } = useAuth();
  const methods = useForm<FormData>({
    resolver: zodResolver(profileUpdateSchema),
    mode: "onChange",
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      state: user?.state || '',
      ageRange: user?.ageRange || '',
      travelWith: user?.travelWith || '',
      category: user?.category,
      subcategories: user?.subcategories?.map(sub => ({ value: sub })) || []
    }
  });
  const [currentStep, setCurrentStep] = useState(0);

  const prevStep = () => setCurrentStep((s) => s - 1);
  const nextStep = () => setCurrentStep((s) => s + 1);
  const saveStep = async () => {
    const fieldsByStep: Record<number, (keyof FormData)[]> = {
      0: ["name", "email", "password", "state", "ageRange", "travelWith"],
      1: ["category", "subcategories"],
    };
    const currentStepFields = fieldsByStep[currentStep];
    if (!currentStepFields) return;

    const valid = await methods.trigger(currentStepFields);
    if (! valid) return;

    const data = methods.getValues();
    const submitted = await onSubmitStep(currentStep, data);
    if (submitted && currentStep + 1 < steps.length)
        setCurrentStep((s) => s + 1);
  };
  
  const onSubmitStep = async (step: number, data: FormData) => {
    if(step + 1 > steps.length) return;

    let route;
    let updatedUserData: Partial<User> = {};
    
    switch(step) {
      case 1:
        route = 'categories';
        updatedUserData = {
          category: data.category,
          subcategories: data.subcategories?.map(sub => Number(sub.value)) || [],
        };
        break;
      default:
        route = 'personal-data';
        updatedUserData = {
          name: data.name,
          email: data.email,
          state: data.state,
          ageRange: data.ageRange,
          travelWith: data.travelWith
        };
        break;
    }
    try {
      const response = await axios.put(`${env.API_URL}/profile/${route}`, updatedUserData);
      Toast.success(response.data.message);
      if (user) {
        setUser({...user,...updatedUserData});
      }
      return true;
    } catch (e) {
      const error = e as any;
      handleRequestError({
        error,
        setError: methods.setError,
      });
      return false;
    }
  };

  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
      <FormProvider {...methods}>
        <Avatar style={{marginBottom: 12}} />
        <View style={styles.card}>
          <Steps current={currentStep} length={steps.length} />
          {steps[currentStep]}
          <View style={[globalStyles.row, globalStyles.itemsCenter, {gap: 8, justifyContent: currentStep === 0 ? 'center' : 'space-between'}]}>
            {currentStep > 0 && (
              <Button
                onPress={prevStep}
                variant="secondary"
                title="Voltar" />
            )}
            {currentStep < steps.length - 1 && (
              <Button
                onPress={nextStep}
                variant="primary"
                outline={true}
                title="Próximo" />
            )}
            <Button
              onPress={saveStep}
              variant="primary"
              title="Salvar" />
          </View>
        </View>
      </FormProvider>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f4f4f4'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    boxShadow: [{
      offsetX: 0,
      offsetY: 4,
      blurRadius: 12,
      spreadDistance: 0,
      color: 'rgba(0,0,0,0.15)'
    }]
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