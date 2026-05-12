import Button from '@/components/Button';
import env from "@/config.json";
import { theme } from '@/theme';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SystemBars } from 'react-native-edge-to-edge';
import { SafeAreaView } from 'react-native-safe-area-context';
import ToastManager, { Toast } from 'toastify-react-native';

export interface FavoriteList {
  id: number;
  name: string;
  is_default: boolean;
  properties_count: number;
}

interface FavoriteListsModalProps {
  visible: boolean;
  propertyId: number;
  initialSelectedListIds: number[];
  onClose: () => void;
  onUpdateListIds: (newListIds: number[]) => void;
}

export default function FavoriteListsModal({
  visible,
  propertyId,
  initialSelectedListIds,
  onClose,
  onUpdateListIds
}: FavoriteListsModalProps) {
  const [lists, setLists] = useState<FavoriteList[]>([]);
  const [selectedListIds, setSelectedListIds] = useState<number[]>(initialSelectedListIds || []);
  const [loading, setLoading] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (visible) {
      setSelectedListIds(initialSelectedListIds || []);
      fetchLists();
    }
  }, [visible]);

  const fetchLists = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${env.API_URL}/favorite-lists`);
      // Since it's a resource collection, it might be in response.data.data
      const listsData = response.data.data || response.data;
      setLists(listsData);
    } catch (error) {
      console.log('Erro ao buscar listas:', error);
      Toast.error('Não foi possível carregar as listas de favoritos.');
    } finally {
      setLoading(false);
    }
  };

  const syncPropertyFavorites = async (currentSelections: number[]) => {
    try {
      await axios.post(`${env.API_URL}/properties/${propertyId}/favorite`, {
        list_ids: currentSelections
      });
      onUpdateListIds(currentSelections);
    } catch (error) {
      console.log('Erro ao sincronizar listas:', error);
      Toast.error('Erro ao salvar favoritos.');
    }
  };

  const toggleList = async (listId: number, isSelected: boolean) => {
    let newSelections: number[];
    if (isSelected) {
      newSelections = [...selectedListIds, listId];
    } else {
      newSelections = selectedListIds.filter(id => id !== listId);
    }
    setSelectedListIds(newSelections);

    setLists(prevLists => prevLists.map(list => 
      list.id === listId 
        ? { ...list, properties_count: isSelected ? list.properties_count + 1 : list.properties_count - 1 }
        : list
    ));

    await syncPropertyFavorites(newSelections);
  };

  const createList = async () => {
    const listName = newListName.trim();
    if (!listName) return;
    
    setIsCreating(true);
    try {
      const response = await axios.post(`${env.API_URL}/favorite-lists`, {
        name: listName
      });
      const newList = response.data.data || response.data;
      setLists(prev => [...prev, { ...newList, properties_count: 1 }]);
      setNewListName('');
      
      // Auto toggle the new list
      const newSelections = [...selectedListIds, newList.id];
      setSelectedListIds(newSelections);
      await syncPropertyFavorites(newSelections);
      Toast.success('Lista criada com sucesso.');
    } catch (error: any) {
      console.log('Erro ao criar lista:', error);
      if (error.response?.status === 422) {
        Toast.warn(error.response?.data?.message || 'Nome da lista inválido ou já existente.');
      } else {
        Toast.error('Não foi possível criar a lista.');
      }
    } finally {
      setIsCreating(false);
    }
  };

  const deleteList = async (listId: number) => {
    try {
      await axios.delete(`${env.API_URL}/favorite-lists/${listId}`);
      setLists(prev => prev.filter(l => l.id !== listId));
      
      const newSelections = selectedListIds.filter(id => id !== listId);
      if (newSelections.length !== selectedListIds.length) {
        setSelectedListIds(newSelections);
        onUpdateListIds(newSelections);
      }
      Toast.success('Lista removida.');
    } catch (error: any) {
      console.log('Erro ao remover lista:', error);
      if (error.response?.status === 403) {
        Toast.warn('Você não pode remover a lista padrão.');
      } else {
        Toast.error('Não foi possível remover a lista.');
      }
    }
  };

  const confirmDeleteList = (listId: number, listName: string) => {
    Alert.alert(
      "Excluir Lista",
      `Tem certeza que deseja excluir a lista "${listName}"? Todos os favoritos salvos apenas nela serão perdidos.`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => deleteList(listId)
        }
      ]
    );
  };

  return (
    <Modal
      statusBarTranslucent
      navigationBarTranslucent
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose && onClose();
      }}
    >
      <SystemBars style="light" />
      <View style={styles.modalOverlay}>
        <SafeAreaView style={{ flex: 1, justifyContent: "center"}}>
          <View style={styles.modalContent}>
            <ScrollView>
              <View style={styles.header}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>Salvar em listas</Text>
                  <Text style={styles.subtitle}>Selecione qual lista de favoritos deseja salvar.</Text>
                </View>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <FontAwesome6 name="xmark" size={28} color="#666" />
                </TouchableOpacity>
              </View>
              <View style={styles.body}>
                {loading ? (
                  <ActivityIndicator size="large" color={theme.colors.success} style={{ marginVertical: 32 }} />
                ) : (
                  <View>
                    <View style={styles.listsContainer}>
                      {lists.map(list => {
                        const isSelected = selectedListIds.includes(list.id);
                        let currentCount = list.properties_count;
                        
                        return (
                          <View key={list.id} style={styles.listOptionCard}>
                            <TouchableOpacity
                              activeOpacity={0.7}
                              style={styles.listCheckboxArea}
                              onPress={() => toggleList(list.id, !isSelected)}>
                              {! isSelected
                                ? <MaterialCommunityIcons name="checkbox-blank-outline" size={20} color="#dee2e6" />
                                : <MaterialCommunityIcons name="checkbox-marked" size={20} color="#0d6efd" />}
                              <Text style={styles.listOptionTitle}>{list.name}</Text>
                            </TouchableOpacity>
                            <View style={styles.listOptionMeta}>
                              <View style={styles.listBadge}>
                                <Text style={styles.listBadgeText}>{currentCount}</Text>
                              </View>
                              {!list.is_default && (
                                <TouchableOpacity
                                  style={styles.removeListButton}
                                  onPress={() => confirmDeleteList(list.id, list.name)}>
                                  <FontAwesome6 name="trash" size={16} color="#c94c5b" />
                                </TouchableOpacity>
                              )}
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                )}
              </View>
              <View style={styles.createListBox}>
                <Text style={styles.createListLabel}>Criar nova lista</Text>
                <View style={styles.createListInputGroup}>
                  <TextInput
                    style={styles.createListInput}
                    placeholder="Ex: Cafés da manhã na roça"
                    placeholderTextColor="#BCBCBD"
                    value={newListName}
                    onChangeText={setNewListName}
                    onSubmitEditing={createList}
                  />
                  <Button
                    variant="success"
                    style={styles.createListBtn}
                    onPress={createList}
                    loading={isCreating}
                    disabled={isCreating}
                    title={isCreating ? '' : 'Criar'}
                  />
                </View>
                <Text style={styles.createListHelper}>
                  Ao criar sua nova lista ela será adicionada em sua lista de favoritos.
                </Text>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
      <ToastManager useModal={false} />
    </Modal>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    maxHeight: "80%",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#edf1ef',
    padding: 16,
  },
  title: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '700',
    color: '#212529',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: '#6c757d',
  },
  closeButton: {
    marginTop: 12,
    marginLeft: 12,
    opacity: 0.5,
  },
  body: {
    padding: 16,
  },
  listsContainer: {
    gap: 10,
  },
  listOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#dce6e2',
    borderRadius: 14,
    backgroundColor: '#f8faf9',
  },
  listCheckboxArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listOptionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#24312d',
    flexShrink: 1,
    marginStart: 6,
  },
  listOptionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  listBadge: {
    minWidth: 34,
    height: 28,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(0, 109, 96, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listBadgeText: {
    color: '#006d60',
    fontSize: 12,
    fontWeight: '700',
  },
  removeListButton: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: '#f1c8cf',
    borderRadius: 999,
    backgroundColor: '#fff4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createListBox: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e4ece8',
  },
  createListLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  createListInputGroup: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 6,
  },
  createListInput: {
    flex: 1,
    height: 44,
    paddingVertical: 0,
    textAlignVertical: "center",
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRightWidth: 0,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#212529',
  },
  createListBtn: {
    minWidth: 60,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  createListHelper: {
    fontSize: 14,
    color: '#6c757d',
  },
});
