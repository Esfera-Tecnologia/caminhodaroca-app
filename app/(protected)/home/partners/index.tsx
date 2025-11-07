import Button from "@/components/Button";
import FilterButton from "@/components/buttons/FilterButton";
import SearchInput from "@/components/controls/SearchInput";
import { EmptyList } from "@/components/EmptyList";
import { LoadingList } from "@/components/LoadingList";
import { PartnerItemType, usePartners } from "@/hooks/usePartners";
import PartnerAdvancedFilters, { PartnerFilters } from "@/modules/protected/PartnerFilters";
import { globalStyles } from "@/styles/global";
import { theme } from "@/theme";
import { Feather, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

function PartnerItem({partner}: {partner: PartnerItemType}) {
  return (
    <View style={[globalStyles.row, globalStyles.itemsStart, styles.partner]}>
      <Image
        source={{uri: partner.logo}}
        contentFit="cover"
        style={styles.partnerLogo}
        transition={1000} />
      <View style={styles.partnerDetails}>
        <Text style={styles.partnerName}>{partner.name}</Text>
        <Text style={styles.partnerLocation}>{partner.city} - {partner.state}</Text>
        <View style={[globalStyles.row, globalStyles.itemsCenter]}>
          {partner.editable && (
            <Button
              onPress={() => router.push({
                pathname: '/home/partners/[partner]/edit',
                params: {partner: partner.id}
              })}
              variant="success"
              outline={true}
              size="sm"
              title="Editar parceiro"
              startIcon={<FontAwesome name="pencil" size={14} color={theme.colors.success} />}
              textStyle={{fontWeight: 600}}
              style={[{marginTop: 8, marginEnd: 8}]}/>
          )}
          {partner.pendingApproval && (
            <Button
              onPress={() => router.push({
                pathname: '/home/partners/[partner]/edit',
                params: {partner: partner.id}
              })}
              variant="warning"
              outline={true}
              size="sm"
              startIcon={
                <MaterialCommunityIcons
                  name="clock-edit-outline"
                  color={theme.colors.warning}
                  size={21} />
              }
              style={[{marginTop: 8, paddingVertical: 3}]}/>
          )}
        </View>
      </View>
      <Pressable
        style={styles.partnerShowButton}
        onPress={() => router.push({
          pathname: '/home/partners/[partner]/show',
          params: {partner: partner.id
        }})}>
        <Feather name="chevron-right" size={24} color="#bbb" />
      </Pressable>
    </View>
  )
}

const PartnerList = ({filters}: {filters?: PartnerFilters}) => {
  const { data, loading: loading } = usePartners(filters);
  
  return (
    <View style={{flex: 1}}>
      {! loading ? (
        <FlatList
          style={{ flex: 1 }}
          data={data}
          ListEmptyComponent={
            <EmptyList text="
              Infelizmente, não pudemos encontrar nenhum
              parceiro com base nos filtros aplicados" />
          }
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => ( <PartnerItem partner={item} /> )}
        />
      ) : (
        <LoadingList text="Carregando a lista de parceiros..." />
      )}
    </View>
  )
}

export default function Index() {
  const [filters, setFilters] =  useState<PartnerFilters>();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parceiros em destaque</Text>
      <View style={[globalStyles.row, globalStyles.itemsCenter, {marginBottom: 16, width: '100%'}]}>
        <SearchInput
          onSearch={(search) => setFilters((old) => ({...old, search: search}))}
          placeholder="Buscar por nome ou município"/> 
        <FilterButton onPress={() => setIsFiltersOpen(true)}/>
      </View>
      <PartnerAdvancedFilters
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        onApply={setFilters}
        title="Filtros"
        direction="right" />
      <PartnerList filters={filters}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    paddingBottom: 0
  },
  title: {
    color: theme.colors.success,
    fontWeight: 600,
    fontSize: 20,
    marginBottom: 16,
  },
  partner: {
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  partnerDetails: {
    marginHorizontal: 12,
    flex: 1,
    alignItems: 'flex-start',
  },
  partnerName: {
    fontSize: 16,
    fontWeight: 700,
    color: theme.colors.success,
    marginBottom: 2,
  },
  partnerLocation: {
    fontSize: 14,
    color: '#666',
  },
  partnerShowButton: {
    flexShrink: 0,
    marginRight: -4
  },
  warning: {
    color: theme.colors.warning,
    fontSize: 12,
    fontWeight: 700,
    marginTop: 4
  },
  partnerLogo: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginTop: 3,
    alignSelf: 'flex-start'
  }
});