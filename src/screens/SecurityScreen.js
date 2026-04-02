import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";

export default function SecurityScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (!email || !phone) {
      Alert.alert("ข้อมูลไม่ครบ", "กรุณากรอกอีเมลและเบอร์มือถือให้ครบถ้วน");
      return;
    }

    setLoading(true);
    // จำลองการเชื่อมต่อ API
    setTimeout(() => {
      setLoading(false);
      Alert.alert("สำเร็จ", "บันทึกข้อมูลความปลอดภัยเรียบร้อยแล้ว", [
        { text: "ตกลง", onPress: () => navigation.goBack() }
      ]);
    }, 1500);
  };

  return (
    <SafeAreaView style={s.safe} edges={["top"]}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
          <Text style={s.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Security Settings</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={s.scroll} contentContainerStyle={s.content}>
          <View style={s.iconContainer}>
            <Text style={s.mainIcon}>🔒</Text>
            <Text style={s.sectionDesc}>
              ตั้งค่าข้อมูลการติดต่อเพื่อความปลอดภัยของบัญชี
            </Text>
          </View>

          {/* Input Group */}
          <View style={s.inputWrapper}>
            <Text style={s.label}>อีเมล (EMAIL)</Text>
            <View style={s.inputBox}>
              <Text style={s.inputIcon}>✉️</Text>
              <TextInput
                style={s.input}
                placeholder="example@email.com"
                placeholderTextColor={colors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <View style={s.inputWrapper}>
            <Text style={s.label}>เบอร์มือถือ (PHONE NUMBER)</Text>
            <View style={s.inputBox}>
              <Text style={s.inputIcon}>📱</Text>
              <TextInput
                style={s.input}
                placeholder="08X-XXX-XXXX"
                placeholderTextColor={colors.textMuted}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>

          <TouchableOpacity 
            style={[s.saveBtn, loading && { opacity: 0.7 }]} 
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={s.saveBtnText}>
              {loading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: { color: colors.textPrimary, fontSize: 18, fontWeight: "800" },
  backBtn: { width: 40, alignItems: "center" },
  backText: { color: colors.textPrimary, fontSize: 32, fontWeight: "300" },
  
  scroll: { flex: 1 },
  content: { padding: 24 },
  
  iconContainer: { alignItems: "center", marginBottom: 32 },
  mainIcon: { fontSize: 60, marginBottom: 12 },
  sectionDesc: { color: colors.textMuted, fontSize: 14, textAlign: "center", lineHeight: 20 },

  inputWrapper: { marginBottom: 20 },
  label: { color: colors.primary, fontSize: 11, fontWeight: "800", marginBottom: 8, letterSpacing: 1 },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
  },
  inputIcon: { fontSize: 16, marginRight: 10 },
  input: { flex: 1, height: 50, color: colors.textPrimary, fontSize: 15 },
  
  saveBtn: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  saveBtnText: { color: "#000", fontSize: 16, fontWeight: "900" },
});