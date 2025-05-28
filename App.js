import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Modal, Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function App() {
  // useState -> HOOK que permite criar uma variável de estado
  // Este hook retorna um Array com dois valores ( valor atual e função de atualização )
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // Função para o cálculo do IMC (peso / altura²)
  function calcularIMC() {
    const IMC = peso / (altura * altura);
    return IMC;
  }

  // Função criada para atribuir uma classificação referente ao valor do IMC calculado
  function TabelaDePeso(calcularIMC) {
    if (calcularIMC() < 18.6) {
      return <Text>Baixo Peso</Text>
    } else if (calcularIMC() < 25) {
      return <Text>Peso Ideal</Text>
    } else if (calcularIMC() < 29.9) {
      return <Text>Excesso de Peso</Text>
    } else if (calcularIMC() > 30 && calcularIMC() < 35) {
      return <Text>Obesidade</Text>
    } else {
      return <Text>Obesidade Extrema</Text>
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Digite seu peso'
        valueP={peso}
        onChangeText={(valueP) => setPeso(valueP)}
        style={{ width: '80%', borderBottomWidth: 1, borderColor: '#000' }}
      />

      <TextInput
        placeholder='Digite sua altura'
        valueA={altura}
        onChangeText={(valueA) => setAltura(valueA)}
        style={{ width: '80%', borderBottomWidth: 1, borderColor: '#000' }}
      />

      <Button title='Ver IMC' onPress={() => setModalVisible(!modalVisible)} />

      <Modal transparent={true} visible={modalVisible} animationType='slide'>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>

            {/* Imprimir o IMC calculado */}
            <Text>Seu IMC é: <Text style={{ fontStyle: 'italic', color: 'cornflowerblue' }}>{calcularIMC()}</Text></Text>
            {/* Imprimir a classificação de peso */}
            <Text>Sua classificação é: <Text style={{ fontStyle: 'italic', color: 'cornflowerblue' }}>{TabelaDePeso(calcularIMC)}</Text></Text>

            <Button title='Fechar' onPress={() => setModalVisible(!modalVisible)} />
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },

  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'bisque',
    borderRadius: 20,
    alignItems: 'center'
  },
});
