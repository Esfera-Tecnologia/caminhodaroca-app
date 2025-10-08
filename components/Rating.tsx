import env from "@/config.json";
import { useAuth } from "@/context/AuthContext";
import { globalStyles } from "@/styles/global";
import { theme } from "@/theme";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Toast } from "toastify-react-native";

interface RatingProps {
  propertyId: number;
  initialUserRating?: number;
  title?: string;
  description?: string;
  onSuccess: (averageRating: number, userRating: number) => void;
}

export default function Rating({
  propertyId,
  initialUserRating = 0,
  title = "Avalie esta propriedade",
  description = "Escolha de 1 a 5 estrelas para avaliar sua experiência.",
  onSuccess,
}: RatingProps) {
  const [userRating, setUserRating] = useState(initialUserRating);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleRating = async (rating: number) => {
    if(! user) {
      Toast.warn("Para acessar essa funcionalidade, você precisa estar logado.");
      return null;
    }
    setUserRating(rating);
    setLoading(true);
    try {
      const response = await axios.post(`${env.API_URL}/properties/${propertyId}/rating`, {
        rating,
      });
      onSuccess(response.data.average_rating, response.data.user_rating);
      Toast.success("Avaliação registrada com sucesso!");
    } catch (error: any) {
      setUserRating(initialUserRating);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          Toast.error("Usuário não autenticado");
        } else if (error.response?.status === 404) {
          Toast.error("Propriedade não encontrada");
        } else if (error.response?.status === 400) {
          Toast.error("A avaliação deve ser um valor entre 1 e 5");
        } else {
          Toast.error("Erro interno ao registrar avaliação");
        }
      } else {
        Toast.error("Erro inesperado ao registrar avaliação");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ ...globalStyles.card, marginBottom: 16 }}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.container}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Pressable
            key={star}
            onPress={() => !loading && handleRating(star)}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          >
            <AntDesign
              key={star}
              name={star <= userRating ? "star" : "staro"}
              size={20}
              color={theme.colors.warning}
            />
          </Pressable>
        ))}
      </View>

      {loading && <Text style={styles.loading}>Enviando...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  loading: {
    marginTop: 8,
    fontSize: 12,
    color: "#999",
  },
});
