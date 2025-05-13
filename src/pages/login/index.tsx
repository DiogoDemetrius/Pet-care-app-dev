import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { style } from './styles';
import Logo from '../../assets/logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={style.container}>
      <ScrollView contentContainerStyle={style.scrollContainer}>
        <View style={style.logoContainer}>
          <Image source={Logo} style={style.logo} resizeMode="contain" />
          {/*<Text style={style.appName}>Pet Care</Text>*/}
          <Text style={style.slogan}>Acasalamento seguro para seus pets</Text>
        </View>

        <View style={style.formContainer}>
          <Text style={style.label}>Email</Text>
          <TextInput
            style={style.input}
            placeholder="Seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={style.label}>Senha</Text>
          <TextInput
            style={style.input}
            placeholder="Sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={style.forgotPasswordContainer}
            onPress={() =>
              Alert.alert('Recuperar senha', 'Função em desenvolvimento')
            }
          >
            <Text style={style.forgotPassword}>Esqueceu sua senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.loginButton} onPress={handleLogin}>
            <Text style={style.loginButtonText}>Entrar</Text>
          </TouchableOpacity>

          <View style={style.registerContainer}>
            <Text style={style.registerText}>Não tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={style.registerLink}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}