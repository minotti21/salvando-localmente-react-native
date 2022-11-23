import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export function Nota({ item, setNotaSelecionada }) {
  const categorias = { Pessoal: "#FF924F", Outros: "#00911F", Trabalho: "#2F71EB" }
  const estilos = styleFunction(categorias[item.categoria])

  return (
    <TouchableOpacity
      style={estilos.cartao}
      onPress={() => { setNotaSelecionada(item) }}
    >
      <Text style={estilos.titulo} numberOfLines={5}>{item.titulo}</Text>
      <Text style={estilos.categoria} numberOfLines={5}>{item.categoria}</Text>
      <Text style={estilos.texto} numberOfLines={5}>{item.texto}</Text>
    </TouchableOpacity>
  )
}

const styleFunction = (cor) => StyleSheet.create({
  cartao: {
    borderRadius: 8,
    backgroundColor: "#ffffff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 14,
    marginHorizontal: 16,
    marginBottom: 8,
    borderTopWidth: 5,
    borderColor: cor,
    elevation: 4,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  categoria: {
    borderRadius: 4,
    backgroundColor: cor,
    padding: 4,
    color: "#FAFAFA",
    alignSelf: "flex-start",
  },
  texto: {
    lineHeight: 28,
    fontSize: 16
  }
})
