import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native"
import NotaEditor from "./src/componentes/NotaEditor"
import { Nota } from './src/componentes/Nota'
import { useEffect, useState } from "react"
import { buscaNotas, criaTabela, filtraNotas } from "./src/services/Notas"
import { Picker } from "@react-native-picker/picker"

export default function App() {

  useEffect(() => {
    criaTabela()
    mostraNotas()
  }, [])

  const [filtroCategoria, setFiltroCategoria] = useState("Todas")
  const [notas, setNotas] = useState([])
  const [notaSelecionada, setNotaSelecionada] = useState({})

  async function mostraNotas() {
    const todasNotas = await buscaNotas()
    setNotas(todasNotas)
  }

  async function filtraPorCategoria(filtroCategoria) {
    setFiltroCategoria(filtroCategoria)

    if (filtroCategoria === 'Todas') {
      mostraNotas()
      return
    }

    const notasFiltradas = await filtraNotas(filtroCategoria)
    setNotas(notasFiltradas)

  }

  const title = () => {
    return (
      <>
        <Text style={estilos.title}>Notas</Text>
        <View style={estilos.modalPicker}>
          <Picker
            selectedValue={filtroCategoria}
            onValueChange={filtroCategoria => filtraPorCategoria(filtroCategoria)}>
            <Picker.Item label="Todas" value="Todas" />
            <Picker.Item label="Pessoal" value="Pessoal" />
            <Picker.Item label="Trabalho" value="Trabalho" />
            <Picker.Item label="Outros" value="Outros" />
          </Picker>
        </View>

      </>
    )
  }

  return (
    <SafeAreaView style={estilos.container}>
      <StatusBar />
      <FlatList
        data={notas}
        renderItem={nota => <Nota {...nota} setNotaSelecionada={setNotaSelecionada} />}
        keyExtractor={nota => nota.id}
        ListHeaderComponent={title}
      />
      <NotaEditor mostraNotas={mostraNotas} notaSelecionada={notaSelecionada} setNotaSelecionada={setNotaSelecionada} />
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 48,
    textAlign: 'center',
    marginVertical: 20,
    color: '#464646'
  },
  modalPicker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#999",
    marginBottom: 12,
    marginHorizontal: 16
  },
})
