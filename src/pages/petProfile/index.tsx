import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { usePets, Pet } from '../../contexts/PetContext';
import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  PetProfile: { petId: number };
  EditPet: { pet: Pet };
  PetHealthHistory: { petId: number };
  COICalculator: { petId: number };
  PregnancyTracker: { petId: number };
  MatchSearch: { petId: number };
  // ...outras rotas
};

type Props = StackScreenProps<RootStackParamList, 'PetProfile'>;

const PetProfile: React.FC<Props> = ({ route, navigation }) => {
  const { petId } = route.params;
  const { getPetById, deletePet } = usePets();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const petData = await getPetById(petId);
        setPet(petData ?? null);
      } catch (error) {
        console.error("Error fetching pet details:", error);
        Alert.alert("Erro", "Não foi possível carregar os detalhes do pet.");
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [petId, getPetById]);

  const calculateAge = (birthdate?: string) => {
    if (!birthdate) return 0;
    const birth = new Date(birthdate);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    const monthDiff = now.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
      years--;
    }
    return years;
  };

  const handleDelete = () => {
    if (!pet) return;
    Alert.alert(
      "Confirmar exclusão",
      `Deseja realmente excluir ${pet.name}? Esta ação não pode ser desfeita.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            setDeleteLoading(true);
            try {
              await deletePet(petId);
              navigation.goBack();
            } catch (error) {
              console.error("Error deleting pet:", error);
              Alert.alert("Erro", "Não foi possível excluir o pet.");
            } finally {
              setDeleteLoading(false);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Carregando detalhes do pet...</Text>
      </SafeAreaView>
    );
  }

  if (!pet) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Pet não encontrado</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color="#2D3748" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{pet.name}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditPet', { pet })} style={styles.headerButton}>
          <Ionicons name="create-outline" size={24} color="#2D3748" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: pet.image }} style={styles.petImage} />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Raça</Text>
              <Text style={styles.infoValue}>{pet.breed}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Gênero</Text>
              <Text style={styles.infoValue}>{pet.gender === 'male' ? 'Macho' : 'Fêmea'}</Text>
            </View>
          </View>
        </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Idade</Text>
              <Text style={styles.infoValue}>{calculateAge(pet.birthdate)} anos</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Data de Nascimento</Text>
              <Text style={styles.infoValue}>{pet.birthdate ? new Date(pet.birthdate).toLocaleDateString('pt-BR') : '-'}</Text>
            </View>
          </View>

          {(pet.displasiaCoxofemural || pet.pedigree) && (
            <View style={styles.documentsContainer}>
              <Text style={styles.sectionTitle}>Documentos</Text>
              {pet.displasiaCoxofemural && (
                <View style={styles.documentRow}>
                  <Ionicons name="medkit-outline" size={20} color="#7D8797" />
                  <Text style={styles.documentLabel}>Displasia Coxofemural:</Text>
                  <Text style={styles.documentValue}>{pet.displasiaCoxofemural}</Text>
                </View>
              )}
              {pet.pedigree && (
                <View style={styles.documentRow}>
                  <Ionicons name="document-text-outline" size={20} color="#7D8797" />
                  <Text style={styles.documentLabel}>Pedigree:</Text>
                  <Text style={styles.documentValue}>{pet.pedigree}</Text>
                </View>
              )}
            </View>
          )}

          <View style={styles.documentsContainer}>
            <Text style={styles.sectionTitle}>Ancestralidade</Text>
            <View style={styles.documentRow}>
              <Ionicons name="paw-outline" size={20} color="#7D8797" />
              <Text style={styles.documentLabel}>Possui ancestralidade cadastrada?</Text>
              <Text style={styles.documentValue}>
                {pet.temAncestralidade ? 'Sim' : 'Não'}
              </Text>
            </View>
          </View>

          {pet.description && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.sectionTitle}>Sobre</Text>
              <Text style={styles.descriptionText}>{pet.description}</Text>
            </View>
          )}

          <View style={styles.actionsContainer}>
            {/*<TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('PetHealthHistory', { petId })}
            >
              <Ionicons name="medical-outline" size={22} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Histórico de Saúde</Text>
            </TouchableOpacity>*/}

            {/*<TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('COICalculator', { petId })}
            >
              <Ionicons name="calculator-outline" size={22} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Calcular COI</Text>
            </TouchableOpacity>*/}

            {pet.gender === 'female' && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate('PregnancyTracker', { petId })}
              >
                <Ionicons name="calendar-outline" size={22} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Gestação</Text>
              </TouchableOpacity>
            )}

            {/*<TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('MatchSearch', { petId })}
            >
              <Ionicons name="search-outline" size={22} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Buscar Parceiros</Text>
            </TouchableOpacity>
          </View>*/}

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
                <Text style={styles.deleteButtonText}>Excluir Pet</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  petImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  infoContainer: {
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  infoItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 12,
    color: '#7D8797',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3748',
  },
  documentsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 10,
  },
  documentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  documentLabel: {
    fontSize: 14,
    color: '#7D8797',
    marginLeft: 8,
    marginRight: 5,
  },
  documentValue: {
    fontSize: 14,
    color: '#2D3748',
    fontWeight: '500',
  },
  descriptionContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  descriptionText: {
    fontSize: 14,
    color: '#2D3748',
    lineHeight: 22,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    padding: 12,
    width: '48%',
    marginBottom: 15,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E53E3E',
    borderRadius: 10,
    padding: 16,
    marginBottom: 30,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FB',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#7D8797',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FB',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#2D3748',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PetProfile;