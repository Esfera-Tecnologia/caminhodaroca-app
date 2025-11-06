import Button from "@/components/Button";
import SearchInput from "@/components/controls/SearchInput";
import { globalStyles } from "@/styles/global";
import { theme } from "@/theme";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

type Partner = {
  id: number;
  name: string;
  city: string;
  state: string;
  logo: string;
}

function PartnerItem({partner}: {partner: Partner})
{
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
        <Button
          onPress={() => router.push({
            pathname: '/home/partners/[partner]/edit',
            params: {partner: partner.id}
          })}
          variant="success"
          outline={true}
          title="Editar parceiro"
          startIcon={<FontAwesome name="pencil" size={14} color={theme.colors.success} />}
          textStyle={{fontSize: 13, fontWeight: 600}}
          style={styles.partnerEditButton}/>
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

function PartnerList()
{
  const partners = Array(10).fill({
    id: 1,
    logo: 'https://picsum.photos/200/300',
    name: 'Fazenda Boa Vista',
    city: 'Vargem grande',
    state: 'Rio de Janeiro'
  });
  return (
    <FlatList
      data={partners}
      keyExtractor={(item, index) => 'P_' + item.id}
      renderItem={({item}) => (<PartnerItem partner={item} />)}
    />
  )
}

export default function Index()
{
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parceiros em destaque</Text>
      <View style={{marginBottom: 16}}>
        <SearchInput
          onSearch={(search) => console.log(search)}
          placeholder="Buscar por nome ou município"/> 
      </View>
      <PartnerList />
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
  },
  partnerDetails: {
    marginHorizontal: 12,
    flex: 1,
    alignItems: 'flex-start'
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
    marginBottom: 8,
  },
  partnerEditButton: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  partnerShowButton: {
    flexShrink: 0,
    alignSelf: 'center',
    marginRight: -4
  },
  partnerLogo: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginTop: 3,
  }
});