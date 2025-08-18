import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { StyleSheet, View, ViewStyle } from "react-native";
import Dropdown from "react-native-input-select";
import { DropdownProps } from "react-native-input-select/lib/typescript/src/types/index.types";

export interface SelectProps extends DropdownProps {
  containerStyle?: ViewStyle;
  IconComponent?: React.ElementType | undefined;
  IconName?: string;
  IconStyle?: ViewStyle;
}
export default function Select({
  IconComponent,
  IconName,
  IconStyle,
  ...props
}: SelectProps) {
  const groupedStyles = { ...styles.dropdownStyle, ...props.containerStyle };
  if (IconName) groupedStyles["paddingStart"] = 34;
  return (
    <View>
      {IconComponent && (
        <IconComponent
          name={IconName}
          size={14}
          color="#ADB5BD"
          style={styles.icon}
        />
      )}
      <Dropdown
        isSearchable={true}
        placeholder="Selecione"
        primaryColor={"green"}
        multipleSelectedItemStyle={{
          backgroundColor: '#f6f6f6',
          color: '#636C79',
          paddingVertical: 3,
        }}
        placeholderStyle={styles.placeholderStyle}
        dropdownIcon={<FontAwesome name="chevron-down" color="#000" />}
        dropdownIconStyle={IconStyle || styles.dropdownIconStyle}
        dropdownContainerStyle={styles.dropdownContainerStyle}
        dropdownStyle={groupedStyles}
        searchControls={{
          textInputStyle: {
            paddingVertical: 6,
            minHeight: 42
          },
          textInputProps: {
            placeholder: 'Pesquisar...'
          }
        }}
        listControls={{
          selectAllText: 'Selecionar todos',
          unselectAllText: 'Remover todos',
          emptyListMessage: 'Nenhum registro encontrado...',
        }}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 14,
    color: "#BCBCBD",
  },
  dropdownContainerStyle: {
    marginBottom: 0,
  },
  dropdownStyle: {
    backgroundColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 0,
    minHeight: 40,
    borderColor: "#dee2e6",
    borderRadius: 6,
  },
  dropdownIconStyle: {
    right: 16,
    top: 12,
  },
  icon: {
    position: "absolute",
    top: 13,
    left: 12,
    zIndex: 1,
  },
});
