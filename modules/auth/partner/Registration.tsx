import Button from "@/components/Button";
import ImageSelect from "@/components/controls/ImageSelect";
import Input from "@/components/controls/Input";
import InputGroup from "@/components/controls/InputGroup";
import Select from "@/components/controls/Select";
import HelperText from "@/components/HelperText";
import HorizontalLine from "@/components/HorizontalLine";
import { useStates } from "@/hooks/useStates";
import { globalStyles } from "@/styles/global";
import { theme } from "@/theme";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PartnerRegistration()  {
  const {states} = useStates();
  const {
    control,
    formState: { errors }
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "events",
  });

  return (
    <View>
      <Text style={styles.title}>Informações do Parceiro</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <InputGroup label="Nome do parceiro*" error={errors.name}>
            <Input placeholder="Nome do parceiro ou marca" value={value} onChangeText={onChange} />
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
          <InputGroup label="Logotipo" error={errors.logo}>
            <ImageSelect
              value={value}
              onChange={(uri) => onChange(uri)}
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
            <Input placeholder="https://www.instagram.com/seu-perfil" value={value} onChangeText={onChange} />
          </InputGroup>
        )}
      />
      <Controller
        control={control}
        name="site"
        render={({ field: { onChange, value } }) => (
          <InputGroup label="Site" error={errors.site} margin={0}>
            <Input placeholder="https://www.seu-site.com.br" value={value} onChangeText={onChange} />
          </InputGroup>
        )}
      />
      <HorizontalLine />
      <Text style={styles.title}>Localização e Segmentação</Text>
      <Controller
        control={control}
        name="state"
        render={({ field: { onChange, value } }) => (
          <InputGroup label="Estado" error={errors.state}>
            <Select 
              options={states}
              selectedValue={value}
              onValueChange={onChange} />
          </InputGroup>
        )}
      />
      <Controller
        control={control}
        name="city"
        render={({ field: { onChange, value } }) => (
          <InputGroup label="Município" error={errors.city}>
            <Select 
              options={[]}
              selectedValue={value}
              onValueChange={onChange} />
          </InputGroup>
        )}
      />
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <InputGroup label="Categoria" helper="(opcional)" error={errors.category}>
            <Select 
              options={[]}
              selectedValue={value}
              onValueChange={onChange} />
          </InputGroup>
        )}
      />
      <Controller
        control={control}
        name="subcategory"
        render={({ field: { onChange, value } }) => (
          <InputGroup label="Subcategoria" helper="(opcional)" error={errors.subcategory} margin={0}>
            <Select 
              options={[]}
              selectedValue={value}
              onValueChange={onChange} />
          </InputGroup>
        )}
      />
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
              name="description"
              render={({ field: { onChange, value } }) => (
                <InputGroup label="Descrição" error={errors.circuits}>
                  <Input 
                    placeholder="Detalhe o evento, datas e público-alvo"
                    multiline={true}
                    style={styles.textarea}
                    value={value}
                    onChangeText={onChange} />
                </InputGroup>
              )}
            />
            <Controller
              control={control}
              name="image"
              render={({ field: { onChange, value } }) => (
                <InputGroup label="Imagem do evento" helper="(opcional)" error={errors.circuits}>
                  <ImageSelect
                    value={value}
                    onChange={(uri) => onChange(uri)}
                  />
                </InputGroup>
              )}
            />
            <Controller
              control={control}
              name="externalLink"
              render={({ field: { onChange, value } }) => (
                <InputGroup label="Link externo" helper="(opcional)" error={errors.subcategory} margin={0}>
                  <Input
                    placeholder="https://link-do-evento.com"
                    onChangeText={onChange}
                    value={value} />
                </InputGroup>
              )}
            />
          </View>
        );
      })}
      <Button
        onPress={() => append({})}
        title="Adicionar outro evento"
        variant="success"
        outline={true}
        style={{marginBottom: 24}} />
    </View>
  )
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
  }
})