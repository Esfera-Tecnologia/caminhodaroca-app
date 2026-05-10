import { PartnerFormData } from "@/app/(auth)/partner";
import { PartnerUpdateFormData } from "@/app/(protected)/home/partners/[partner]/edit";
import Button from "@/components/Button";
import ImageSelect from "@/components/controls/ImageSelect";
import Input from "@/components/controls/Input";
import InputGroup from "@/components/controls/InputGroup";
import Select from "@/components/controls/Select";
import HelperText from "@/components/HelperText";
import HorizontalLine from "@/components/HorizontalLine";
import { useCities } from "@/hooks/useCities";
import { PartnerType } from "@/interfaces";
import { globalStyles } from "@/styles/global";
import { theme } from "@/theme";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PartnerRegistration({partner}: {partner?: PartnerType})  {
  const {cities} = useCities('RJ');
  const {
    control,
    formState: { errors }
  } = useFormContext<PartnerFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "events",
  });

  return (
    <View>
      <Text style={styles.title}>Informações da Instituição</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <InputGroup label="Nome da instituição*" error={errors.name}>
            <Input placeholder="Nome da instituição" value={value} onChangeText={onChange} />
          </InputGroup>
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <InputGroup label="E-mail*" error={errors.email}>
            <Input
              placeholder="contato@exemplo.com"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoComplete="email"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </InputGroup>
        )}
      />
      <Controller
        control={control}
        name="logo"
        render={({ field: { onChange, value } }) => (
          <InputGroup label="Logotipo*" error={errors.logo}>
            <ImageSelect
              value={value}
              onChange={(uri) => onChange(uri)}
              preview={partner?.logo}
            />
            <HelperText>Formato PNG ou JPG. Tamanho recomendado: 512x512px.</HelperText>
          </InputGroup>
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <InputGroup label="Descrição*" error={errors.description} margin={0}  >
            <Input 
              placeholder="Conte um pouco sobre a experiência oferecida"
              multiline={true}
              style={styles.textarea}
              value={value}
              onChangeText={onChange} />
          </InputGroup>
        )}
      />
      
      <HorizontalLine />
      <Text style={styles.title}>Presença Digital</Text>
      <Controller
        control={control}
        name="instagram"
        render={({ field: { onChange, value } }) => (
          <InputGroup label="Instagram" error={errors.instagram}>
            <Input
              placeholder="@usuario"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={onChange}
              value={value} />
          </InputGroup>
        )}
      />
      <Controller
        control={control}
        name="site"
        render={({ field: { onChange, value } }) => (
          <InputGroup label="Site" error={errors.site} margin={0}>
            <Input 
              placeholder="https://www.seu-site.com.br"
              onChangeText={onChange}
              autoCapitalize="none"
              autoCorrect={false}
              value={value} />
          </InputGroup>
        )}
      />
      <HorizontalLine />
      <Text style={styles.title}>Localização</Text>
      <Controller
        control={control}
        name="cities"
        render={({ field: { onChange, value } }) => (
          <InputGroup label="Municípios*" error={Array.isArray(errors?.cities) ? errors?.cities[0] : errors?.cities}>
            <Select
              isMultiple
              options={cities}
              selectedValue={value}
              onValueChange={(values) => onChange(Array.isArray(values) ? values.map(Number) : [Number(values)])} />
          </InputGroup>  
      )} />
      <HorizontalLine />
      <Text style={styles.title}>Experiências Oferecidas</Text>
      <Controller
        control={control}
        name="routes"
        render={({ field: { onChange, value } }) => (
          <InputGroup label="Rotas*" error={errors.routes}>
            <Input 
              placeholder="Descreva as rotas sugeridas para os visitantes"
              multiline={true}
              style={styles.textarea}
              value={value}
              onChangeText={onChange} />
          </InputGroup>
        )}
      />
      <Controller
        control={control}
        name="circuits"
        render={({ field: { onChange, value } }) => (
          <InputGroup label="Circuitos*" error={errors.circuits}>
            <Input 
              placeholder="Detalhe os circuitos e caminhos disponíveis"
              multiline={true}
              style={styles.textarea}
              value={value}
              onChangeText={onChange} />
          </InputGroup>
        )}
      />
      <Controller
        control={control}
        name="attractions"
        render={({ field: { onChange, value } }) => (
          <InputGroup label="Atrativos*" error={errors.attractions}>
            <Input 
              placeholder="Liste os principais atrativos do parceiro"
              multiline={true}
              style={styles.textarea}
              value={value}
              onChangeText={onChange} />
          </InputGroup>
        )}
      />
      <Text style={styles.label}>Eventos</Text>
      <Text style={styles.description}>
        Inclua eventos, festivais ou ações especiais. Você pode adicionar quantos eventos precisar.
      </Text>
      {fields.map((event, index) => {
        return (
          <View key={event.id} style={styles.event}>
            <View style={[globalStyles.row, globalStyles.spaceBetween]}>
              <Text style={styles.eventName}>Evento {index + 1}</Text>
              <Pressable onPress={() => remove(index)}>
                <Text style={styles.removeEvent}>Remover</Text>
              </Pressable>
            </View>
            <Controller
              control={control}
              name={`events.${index}.name`}
              render={({ field: { onChange, value } }) => (
                <InputGroup label="Nome" error={errors?.events?.[index]?.name}>
                  <Input
                    placeholder="Nome do evento"
                    value={value}
                    onChangeText={onChange} />
                </InputGroup>
              )}
            />
            <Controller
              control={control}
              name={`events.${index}.description`}
              render={({ field: { onChange, value } }) => (
                <InputGroup label="Descrição" error={errors?.events?.[index]?.description}>
                  <Input
                    placeholder="Detalhe o evento, datas e público-alvo"
                    multiline={true}
                    style={styles.textarea}
                    value={value}
                    onChangeText={onChange}
                  />
                </InputGroup>
              )}
            />
            <Controller
              control={control}
              name={`events.${index}.images.0`}
              render={({ field: { onChange, value } }) => (
                <InputGroup label="Imagem do evento" helper="(opcional)" error={errors?.events?.[index]?.images?.[0]}>
                  <ImageSelect
                    value={value}
                    onChange={(uri) => onChange(uri)}
                    preview={partner?.events?.[index]?.images?.[0]}/>
                  <HelperText>Formato PNG ou JPG. Tamanho recomendado: 300x150px.</HelperText>
                </InputGroup>
              )}
            />
            <Controller
              control={control}
              name={`events.${index}.externalLink`}
              render={({ field: { onChange, value } }) => (
                <InputGroup
                  label="Link externo"
                  helper="(opcional)"
                  error={errors?.events?.[index]?.externalLink}
                  margin={0}
                >
                  <Input
                    placeholder="https://link-do-evento.com"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={onChange}
                    value={value}
                  />
                </InputGroup>
              )}
            />
          </View>
        );
      })}
      <Button
        onPress={() => append({externalLink: '', description: '', images: undefined})}
        title="Adicionar outro evento"
        variant="success"
        outline={true}
        style={{marginBottom: 24}} />
    </View>
  )
}

export const preparePartnerDataForSubmission = (data: PartnerFormData | PartnerUpdateFormData) => {
  const cleanedEvents = (data.events ?? []).filter(event => {
    const hasData =
      (event.description && event.description.trim() !== '') ||
      (event.externalLink && event.externalLink.trim() !== '') ||
      (event.images && event.images.length > 0 && !! event.images[0]);
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
    formData.append(`events[${index}][eventId]`, event.eventId ?? "");
    formData.append(`events[${index}][name]`, event.name ?? "");
    formData.append(`events[${index}][description]`, event.description ?? "");
    formData.append(`events[${index}][externalLink]`, event.externalLink ?? "");

    if (event.images?.length && event.images[0] !== undefined) {
      const image = event.images[0];
      const isLocalImage = image.startsWith("file://") || image.startsWith("content://");

      if (isLocalImage) {
        formData.append(`events[${index}][images][0]`, {
          uri: image,
          name: `event_${index}.jpg`,
          type: "image/jpeg",
        } as any);
      }
    }
  });
  return formData;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#00473c',
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    color: "#212529",
  },
  description: {
    fontSize: 13,
    color: '#6c757d',
    marginBottom: 14,
  },
  textarea: {
    height: 100,
    verticalAlign: 'top',
    paddingTop: 8
  },
  eventName: {
    color: "rgb(25,135,84)",
    fontWeight: 700,
    marginBottom: 8,
  },
  event: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 6,
    padding: 16,
    marginBottom: 12,
  },
  removeEvent: {
    color: theme.colors.danger,
    textDecorationLine: "underline"
  },
  list: {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#dee2e6',
    borderRadius: 6
  },
  listItem: {
    borderBottomWidth: 1,
    borderRadius: 6,
    borderColor: '#dee2e6',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  listItemButton: {
  },
  listItemButtonText: {
    color: theme.colors.primary,
    fontWeight: 700,
    textAlign: 'center'
  }
})