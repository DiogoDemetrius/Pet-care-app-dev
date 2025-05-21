import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../addPet/style';

const emptyAncestor = { name: '', breed: '', pedigree: '' };

export default function AddAncestry({ navigation, route }) {
  const [ancestors, setAncestors] = useState([
    { ...emptyAncestor }, // Pai
    { ...emptyAncestor }, // Mãe
    { ...emptyAncestor }, // Avô paterno
    { ...emptyAncestor }, // Avó paterna
    { ...emptyAncestor }, // Avô materno
    { ...emptyAncestor }, // Avó materna
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...ancestors];
    updated[index][field] = value;
    setAncestors(updated);
  };

  const handleSave = () => {
    // Aqui você pode salvar os dados ou passar para a tela anterior
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#2D3748" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ancestralidade</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.label, { marginBottom: 16 }]}>
          Adicione até 3 gerações da árvore genealógica do pet.
        </Text>
        <Text style={styles.label}>Pais</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Pai</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do pai"
              value={ancestors[0].name}
              onChangeText={v => handleChange(0, 'name', v)}
            />
            <TextInput
              style={styles.input}
              placeholder="Raça"
              value={ancestors[0].breed}
              onChangeText={v => handleChange(0, 'breed', v)}
            />
            <TextInput
              style={styles.input}
              placeholder="Pedigree"
              value={ancestors[0].pedigree}
              onChangeText={v => handleChange(0, 'pedigree', v)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Mãe</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome da mãe"
              value={ancestors[1].name}
              onChangeText={v => handleChange(1, 'name', v)}
            />
            <TextInput
              style={styles.input}
              placeholder="Raça"
              value={ancestors[1].breed}
              onChangeText={v => handleChange(1, 'breed', v)}
            />
            <TextInput
              style={styles.input}
              placeholder="Pedigree"
              value={ancestors[1].pedigree}
              onChangeText={v => handleChange(1, 'pedigree', v)}
            />
          </View>
        </View>
        <Text style={[styles.label, { marginTop: 24 }]}>Avós</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Avô paterno</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={ancestors[2].name}
              onChangeText={v => handleChange(2, 'name', v)}
            />
            <TextInput
              style={styles.input}
              placeholder="Raça"
              value={ancestors[2].breed}
              onChangeText={v => handleChange(2, 'breed', v)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Avó paterna</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={ancestors[3].name}
              onChangeText={v => handleChange(3, 'name', v)}
            />
            <TextInput
              style={styles.input}
              placeholder="Raça"
              value={ancestors[3].breed}
              onChangeText={v => handleChange(3, 'breed', v)}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Avô materno</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={ancestors[4].name}
              onChangeText={v => handleChange(4, 'name', v)}
            />
            <TextInput
              style={styles.input}
              placeholder="Raça"
              value={ancestors[4].breed}
              onChangeText={v => handleChange(4, 'breed', v)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Avó materna</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={ancestors[5].name}
              onChangeText={v => handleChange(5, 'name', v)}
            />
            <TextInput
              style={styles.input}
              placeholder="Raça"
              value={ancestors[5].breed}
              onChangeText={v => handleChange(5, 'breed', v)}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.submitButton, { marginTop: 30 }]}
          onPress={handleSave}
        >
          <Ionicons name="save-outline" size={20} color="#FFF" />
          <Text style={styles.submitButtonText}>Salvar Ancestralidade</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}