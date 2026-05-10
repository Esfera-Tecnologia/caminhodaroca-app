import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 14,
    minHeight: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonPrimary: {
    backgroundColor: "#287a6d",
  },
  buttonPrimaryText: {
    color: '#fff',
  },
  buttonAlt: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: '#cfe1db'
  },
  buttonAltText: {
    color: '#287a6d'
  },
  buttonLink: {
    minHeight: 0,
    paddingTop: 6,
    paddingHorizontal: 6,
    paddingBottom: 0, 
  },
  buttonLinkText: {
    color: '#1f645a'
  },
  pressedPrimary: {
    backgroundColor: '#62B55A',
  },
  pressedAlt: {
    backgroundColor: '#e9f5f2',
  },
  pressedLink: {
    
  },
  cardActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 600,
    color: "rgb(33, 64, 58)",
    textAlign: 'left',
    marginBottom: 10,
    letterSpacing: -1,
  },
  cardDescription: {
    fontSize: 15,
    fontWeight: 400,
    color: "#6a817b",
    textAlign: 'left',
    marginBottom: 20,
  },
  cardLoginMethod: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 12,
    borderWidth: 1,
    borderColor: '#dce8e3',
    borderRadius: 16,
    paddingVertical: 17,
    paddingHorizontal: 16,
    textAlign: 'left',
    backgroundColor: '#ffffff',
    marginBottom: 14,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 4,
        blurRadius: 12,
        spreadDistance: 0,
        color: 'rgba(23, 63, 56, 0.05)',
      },
    ],
  },
  cardLoginBody: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 13,
    flex: 1,
  },
  cardLoginFooter: {
    alignItems: 'flex-end',
  },
  cardLoginContent: {
    flex: 1,
    minWidth: 0,
  },
  cardLoginTitle: {
    fontSize: 15,
    color: '#21403a',
    fontWeight: 700,
    flexShrink: 1,
  },
  cardLoginDescription: {
    fontSize: 14,
    color: '#6a817b',
    fontWeight: 400,
    flexShrink: 1,
  },
  cardLoginIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
})