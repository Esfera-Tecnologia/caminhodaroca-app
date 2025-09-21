import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  itemsCenter: {
    alignItems: 'center'
  },
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 16,
    boxShadow: [{
      offsetX: 0,
      offsetY: 4,
      blurRadius: 12,
      spreadDistance: 0,
      color: 'rgba(0,0,0,0.15)'
    }]
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 36,
    lineHeight: 20,
  },
  paragraph: {
    fontSize: 14,
    color: "#333",
    marginBottom: 16
  },
  textBase: {
    color: "#333",
    fontSize: 14,
    lineHeight: 21,
  },
  bold: {
    fontWeight: 700,
  },
  extraBold: {
    fontWeight: 900,
  },
  shadowSm: {
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 2,
        blurRadius: 4,
        spreadDistance: 0,
        color: "rgba(0,0,0,0.075)"
      },
    ],
  }
});