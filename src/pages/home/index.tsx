import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { usePets } from '../../contexts/PetContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import PetCard from '../../components/PetCard';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import Logo from '../../assets/logo.png';

const HomeScreen = ({ navigation }) => {
  const { userPets, fetchUserPets, fetchRecommendedMatches, recommendedMatches, loading } = usePets();
  const [activeTab, setActiveTab] = useState('myPets');

  useEffect(() => {
    fetchUserPets();
    fetchRecommendedMatches();
  }, []);

  const renderEmptyPets = () => (
    <View style={styles.emptyContainer}>
      <Image
        source={require('../../assets/empty-pets.jpg')} 
        style={styles.emptyImage} 
        resizeMode="contain" 
      />
      <Text style={styles.emptyTitle}>Nenhum pet cadastrado</Text>
      <Text style={styles.emptyText}>Adicione seu primeiro pet para começar a usar os recursos do Pet Care</Text>
      <TouchableOpacity 
        style={styles.addPetButton}
        onPress={() => navigation.navigate('AddPet')}
      >
        <Text style={styles.addPetButtonText}>Adicionar Pet</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyMatches = () => (
    <View style={styles.emptyContainer}>
      <Image 
        source={require('../../assets/empty-pets.jpg')} 
        style={styles.emptyImage} 
        resizeMode="contain" 
      />
      <Text style={styles.emptyTitle}>Nenhuma compatibilidade encontrada</Text>
      <Text style={styles.emptyText}>Adicione mais informações sobre seus pets para receber recomendações de acasalamento</Text>
    </View>
  );

  const renderMyPets = () => (
    <View style={styles.tabContent}>
      {userPets.length > 0 ? (
        <>
          <View style={styles.headerContainer}>
            <Text style={styles.sectionTitle}>Meus Pets</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => navigation.navigate('AddPet')}
            >
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={userPets}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PetCard 
                pet={item} 
                onPress={() => navigation.navigate('PetProfile', { petId: item.id })}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.petsList}
          />
        </>
      ) : renderEmptyPets()}
    </View>
  );

  const renderRecommendations = () => (
    <View style={styles.tabContent}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <Text style={styles.loadingText}>Buscando recomendações...</Text>
        </View>
      ) : recommendedMatches.length > 0 ? (
        <>
          <Text style={styles.sectionTitle}>Compatibilidades Recomendadas</Text>
          <FlatList
            data={recommendedMatches}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PetCard 
                pet={item} 
                isMatch={true}
                compatibility={item.compatibility}
                onPress={() => navigation.navigate('MatchDetails', { matchId: item.id })}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.petsList}
          />
        </>
      ) : renderEmptyMatches()}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'myPets' && styles.activeTab]}
          onPress={() => setActiveTab('myPets')}
        >
          <Text style={[styles.tabText, activeTab === 'myPets' && styles.activeTabText]}>Meus Pets</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'recommendations' && styles.activeTab]}
          onPress={() => setActiveTab('recommendations')}
        >
          <Text style={[styles.tabText, activeTab === 'recommendations' && styles.activeTabText]}>Recomendações</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'myPets' ? renderMyPets() : renderRecommendations()}
    </SafeAreaView>
  );
};

export default HomeScreen;