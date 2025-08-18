import Button from "@/components/Button";
import Input from "@/components/controls/Input";
import InputGroup from "@/components/controls/InputGroup";
import Select from "@/components/controls/Select";
import Offcanvas, { OffcanvasProps } from "@/components/Offcanvas";
import { View } from "react-native";

export default function HomeFilters(props: OffcanvasProps)
{
  return (
    <Offcanvas {...props}>
      <View>
        <InputGroup label="Localização Atual">
          <Select 
            options={[]}
            onValueChange={() => console.log('teste')}
            selectedValue={undefined} />
        </InputGroup>
        <InputGroup label="Localização da Propriedade">
          <Select 
            options={[]}
            onValueChange={() => console.log('teste')}
            selectedValue={undefined} />
        </InputGroup>
        <InputGroup label="Palavra-chave">
          <Input placeholder="Ex: queijos, passeios..." />
        </InputGroup>
        <InputGroup label="Categoria">
          <Select 
            options={[]}
            onValueChange={() => console.log('teste')}
            selectedValue={undefined} />
        </InputGroup>
        <InputGroup label="Subcategoria">
          <Select 
            options={[]}
            onValueChange={() => console.log('teste')}
            selectedValue={undefined} />
        </InputGroup>
        <InputGroup label="Favoritos">
          <Select 
            options={[]}
            onValueChange={() => console.log('teste')}
            selectedValue={undefined} />
        </InputGroup>
        <Button variant="primary" title="Aplicar filtros" onPress={() => console.log('teste')}/>
      </View>
    </Offcanvas> 
  )
}