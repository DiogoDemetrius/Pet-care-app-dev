import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface PetCardProps {
  pet: {
    id: number;
    name: string;
    breed: string;
    age: number;
    compatibility?: number; // Opcional, usado para recomendações
  };
  isMatch?: boolean; // Indica se é uma recomendação
  compatibility?: number; // Compatibilidade (opcional)
  onPress: () => void; // Função chamada ao clicar no card
}

const PetCard: React.FC<PetCardProps> = ({ pet, isMatch = false, compatibility, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={require('../assets/empty-pets.jpg')} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{pet.name}</Text>
        <Text style={styles.details}>{`${pet.breed}, ${pet.age} anos`}</Text>
        {isMatch && compatibility !== undefined && (
          <Text style={styles.compatibility}>{`Compatibilidade: ${compatibility}%`}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  details: {
    fontSize: 14,
    color: '#7D8797',
    marginTop: 2,
  },
  compatibility: {
    fontSize: 14,
    color: '#FF6B6B',
    marginTop: 5,
  },
});

export default PetCard;