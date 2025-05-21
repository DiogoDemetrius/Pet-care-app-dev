import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { usePets } from '../../contexts/PetContext';
import { styles } from './style';

const AddPet = ({ navigation }) => {
  const { addPet } = usePets();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('male');
  const [birthdate, setBirthdate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [chipNumber, setChipNumber] = useState('');
  const [pedigree, setPedigree] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar sua galeria.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthdate;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthdate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'Por favor, informe o nome do pet.');
      return false;
    }
    if (!breed.trim()) {
      Alert.alert('Erro', 'Por favor, informe a raça do pet.');
      return false;
    }
    if (!image) {
      Alert.alert('Erro', 'Por favor, adicione uma foto do pet.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const newPet = {
        name,
        breed,
        gender,
        birthdate: birthdate.toISOString(),
        chipNumber: chipNumber.trim() || null,
        pedigree: pedigree.trim() || null,
        description: description.trim() || null,
        image
      };

      await addPet(newPet);
      setLoading(false);
      Alert.alert(
        'Sucesso!', 
        'Pet cadastrado com sucesso!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', 'Não foi possível cadastrar o pet. Tente novamente.');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#2D3748" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adicionar Pet</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.petImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="camera" size={40} color="#B2BDCD" />
              <Text style={styles.imagePlaceholderText}>Adicionar foto</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome*</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nome do pet"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Raça*</Text>
          <TextInput
            style={styles.input}
            value={breed}
            onChangeText={setBreed}
            placeholder="Raça do pet"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Gênero*</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Macho" value="male" />
              <Picker.Item label="Fêmea" value="female" />
            </Picker>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Data de Nascimento*</Text>
          <TouchableOpacity style={styles.dateInput} onPress={showDatepicker}>
            <Text style={styles.dateText}>
              {birthdate.toLocaleDateString("pt-BR")}
            </Text>
            <Ionicons name="calendar" size={20} color="#7D8797" />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={birthdate}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Displasia Coxofemural</Text>
          <TextInput
            style={styles.input}
            value={chipNumber}
            onChangeText={setChipNumber}
            placeholder="Tipo Displasia Coxofemural"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Número do Pedigree</Text>
          <TextInput
            style={styles.input}
            value={pedigree}
            onChangeText={setPedigree}
            placeholder="Número do pedigree (opcional)"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Informações adicionais sobre o pet (opcional)"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.formGroup}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() =>
              navigation.navigate("AddAncestry", {
                petData: { name, breed, gender, birthdate, image },
              })
            }
          >
            <Ionicons name="git-branch-outline" size={20} color="#FFF" />
            <Text style={styles.submitButtonText}>
              Ancestralidade
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.submitButtonText}>Cadastrar Pet</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPet;