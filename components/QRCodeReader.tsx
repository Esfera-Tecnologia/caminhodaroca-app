import { theme } from "@/theme";
import { BarcodeScanningResult, CameraView } from "expo-camera";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Modal, Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import CancelButton from "./buttons/CancelButton";

const { height, width } = Dimensions.get('window');

export type QRCodeScannerBanner = {
  message: string;
  variant: "error" | "success";
} | null;

type QRCodeScannerProps = {
  visible: boolean,
  storing: boolean,
  toggleModalVisibility: (visible: boolean) => void,
  onSuccess: (text: string) => void,
  banner?: QRCodeScannerBanner,
}

function bannerTopPadding(): number {
  const base =
    Platform.OS === "ios"
      ? Constants.statusBarHeight ?? 0
      : StatusBar.currentHeight ?? 0;
  return base + 12;
}

export function QRCodeScanner({visible, storing, toggleModalVisibility, onSuccess, banner}: QRCodeScannerProps) {
  const [scannableArea, setScannableArea] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [qrCodeReaded, setQRCodeReaded] = useState(false);

  const onScannableAreaLayout = (event: any) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setScannableArea({ x, y, width, height });
  };
  const isWithinScannableArea = (
    cornerPoints: { x: number; y: number }[],
    scannableArea: { x: number; y: number; width: number; height: number }
  ) => {
    const xMax = scannableArea.x + scannableArea.width;
    const yMax = scannableArea.y + scannableArea.height;

    return cornerPoints.every(({ x, y }) => x >= scannableArea.x && x <= xMax && y >= scannableArea.y && y <= yMax);
  };

  function handleScan({data, bounds, cornerPoints}: BarcodeScanningResult) {
    if (!bounds || !bounds.origin || ! scannableArea) return;
    
    if(data && ! qrCodeReaded && ! storing && isWithinScannableArea(cornerPoints, scannableArea)) {
      setQRCodeReaded(true);
      setTimeout(function(){
        onSuccess(data);
      }, 500)
    }
  }
  useEffect(() => {
    if(qrCodeReaded) {
      setTimeout(() => {
        setQRCodeReaded(false);
      }, 3000);
    }
  }, [qrCodeReaded])
  return (
    <Modal
      visible={visible} 
      onRequestClose={() => toggleModalVisibility(false)}
      onShow={() => setQRCodeReaded(false)}
      style={StyleSheet.absoluteFillObject}>
      <CameraView style={{flex: 1}} onBarcodeScanned={handleScan} facing="back" />
      {banner ? (
        <View
          style={[
            styles.bannerWrap,
            { top: bannerTopPadding() },
            banner.variant === "success" ? styles.bannerSuccess : styles.bannerError,
          ]}
          pointerEvents="box-none"
        >
          <Text style={styles.bannerText}>{banner.message}</Text>
        </View>
      ) : null}
      <View style={styles.scanAreaContainer} onLayout={onScannableAreaLayout}>
        <View style={[styles.scanAreaBoundary, qrCodeReaded && styles.readed, {top: -2.5, left: -2.5}]}></View>
        <View style={[styles.scanAreaBoundary, qrCodeReaded && styles.readed, {top: -2.5, right: -2.5, transform: [{ rotate: '90deg' }]}]}></View>
        <View style={styles.scanAreaLine}></View>
        <View style={[styles.scanAreaBoundary, qrCodeReaded && styles.readed, {bottom: -2.5, left: -2.5, transform: [{ rotate: '270deg' }]}]}></View>
        <View style={[styles.scanAreaBoundary, qrCodeReaded && styles.readed, {bottom: -2.5, right: -2.5, transform: [{ rotate: '180deg' }]}]}></View>
      </View>
      {storing && (
        <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loading} />
      )}
      <CancelButton
        style={styles.cancelButton}
        label="Voltar"
        onPress={() => toggleModalVisibility(false)} />
    </Modal>
  )
}

const styles = StyleSheet.create({
    scanAreaContainer: {
      position: 'absolute',
      top: height / 2 - 150,
      left: width / 2 - 150,
      borderColor: "#f2f2f2",
      borderWidth: 1,
      width: 300,
      height: 300,
      justifyContent: "center",
    },
    scanAreaLine: {
      height: 1,
      width: '100%',
      backgroundColor: "#FF0000"
    },
    scanAreaBoundary: {
      position: "absolute",
      width: 15,
      height: 15,
      borderTopWidth: 5,
      borderLeftWidth: 5,
      borderColor: "#FF0000",
    },
    readed: {
      borderColor: "#21FF37",
    },
    cancelButton: {
      position: 'absolute',
      bottom: 20,
      left: width / 2 - 50,
      width: 100,
      backgroundColor: '#ffff',
      zIndex: 1,
      borderRadius: 5,
      paddingVertical: 8
    },
    loading: {
      position: 'absolute',
      top: height / 2 + 175,
      left: width / 2 - 18,
    },
    bannerWrap: {
      position: "absolute",
      left: 16,
      right: 16,
      top: 0,
      zIndex: 10,
      elevation: 10,
      borderRadius: 8,
      paddingHorizontal: 14,
      paddingVertical: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    bannerError: {
      backgroundColor: theme.colors.danger,
    },
    bannerSuccess: {
      backgroundColor: theme.colors.success,
    },
    bannerText: {
      color: "#fff",
      fontFamily: "Roboto_500Medium",
      fontSize: 14,
      textAlign: "center",
    },
});