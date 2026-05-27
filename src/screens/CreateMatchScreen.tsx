import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

import Button from "../components/Button";
import Input from "../components/Input";
import { useMatchesContext } from "../contexts/MatchesContext";
import { CURRENT_USER } from "../mocks/users";
import type { AppTabParamList } from "../navigation/types";
import type { ExperienceLevel, Match, Sport } from "../types";

type Nav = BottomTabNavigationProp<AppTabParamList>;

const SPORTS: { readonly value: Sport; readonly label: string; readonly icon: string }[] = [
  { value: "football", label: "Futebol", icon: "⚽" },
  { value: "futsal", label: "Futsal", icon: "🥅" },
  { value: "volleyball", label: "Vôlei", icon: "🏐" },
  { value: "basketball", label: "Basquete", icon: "🏀" },
  { value: "tennis", label: "Tênis", icon: "🎾" },
  { value: "other", label: "Outro", icon: "🏃" },
];

const LEVELS: { readonly value: ExperienceLevel; readonly label: string }[] = [
  { value: "beginner", label: "Iniciante" },
  { value: "intermediate", label: "Intermediário" },
  { value: "advanced", label: "Avançado" },
];

const SPORT_LABELS: Record<Sport, string> = {
  football: "Futebol",
  volleyball: "Vôlei",
  basketball: "Basquete",
  futsal: "Futsal",
  tennis: "Tênis",
  other: "Outro",
};

const DATE_RE = /^(\d{2})\/(\d{2})\/(\d{4})$/;
const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;

function SectionLabel({ children }: { readonly children: string }) {
  return <Text className="text-sm font-semibold text-secondary-900 mb-3">{children}</Text>;
}

function ToggleRow({
  label,
  value,
  onToggle,
  accessibilityLabel,
}: {
  readonly label: string;
  readonly value: boolean;
  readonly onToggle: () => void;
  readonly accessibilityLabel: string;
}) {
  return (
    <Pressable
      className={`flex-row items-center justify-between p-4 rounded-xl border ${
        value ? "bg-primary-50 border-primary-300" : "bg-white border-neutral-200"
      }`}
      onPress={onToggle}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={accessibilityLabel}
    >
      <Text className={`text-sm font-medium ${value ? "text-primary-700" : "text-neutral-700"}`}>
        {label}
      </Text>
      <View
        className={`w-5 h-5 rounded border-2 items-center justify-center ${
          value ? "bg-primary-500 border-primary-500" : "border-neutral-300"
        }`}
      >
        {value && <MaterialCommunityIcons name="check" size={13} color="white" />}
      </View>
    </Pressable>
  );
}

export default function CreateMatchScreen() {
  const navigation = useNavigation<Nav>();
  const { addMatch } = useMatchesContext();

  const [sport, setSport] = useState<Sport | null>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [level, setLevel] = useState<ExperienceLevel>("intermediate");
  const [description, setDescription] = useState("");
  const [allowBeginners, setAllowBeginners] = useState(false);
  const [requiresApproval, setRequiresApproval] = useState(false);

  const [sportError, setSportError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [maxParticipantsError, setMaxParticipantsError] = useState("");

  function validate(): boolean {
    let valid = true;

    if (sport) {
      setSportError("");
    } else {
      setSportError("Selecione uma modalidade esportiva");
      valid = false;
    }

    if (title.trim().length >= 3) {
      setTitleError("");
    } else {
      setTitleError("Título deve ter ao menos 3 caracteres");
      valid = false;
    }

    if (location.trim().length >= 3) {
      setLocationError("");
    } else {
      setLocationError("Informe o local da partida");
      valid = false;
    }

    if (DATE_RE.test(date)) {
      setDateError("");
    } else {
      setDateError("Use o formato DD/MM/AAAA");
      valid = false;
    }

    if (TIME_RE.test(time)) {
      setTimeError("");
    } else {
      setTimeError("Use o formato HH:MM");
      valid = false;
    }

    const participants = Number.parseInt(maxParticipants, 10);
    if (!Number.isNaN(participants) && participants >= 2) {
      setMaxParticipantsError("");
    } else {
      setMaxParticipantsError("Mínimo de 2 participantes");
      valid = false;
    }

    return valid;
  }

  function handleSubmit() {
    if (!validate()) return;

    const [day, month, year] = date.split("/");
    const isoDate = `${year}-${month}-${day}`;

    const newMatch: Match = {
      id: `match-${Date.now()}`,
      sport: sport!,
      title: title.trim(),
      location: location.trim(),
      date: isoDate,
      time: time.trim(),
      maxParticipants: Number.parseInt(maxParticipants, 10),
      level,
      description: description.trim() || undefined,
      organizer: CURRENT_USER,
      participants: [{ user: CURRENT_USER, status: "confirmed" }],
      status: "open",
      allowBeginners,
      requiresApproval,
    };

    addMatch(newMatch);

    Alert.alert(
      "Partida criada!",
      `"${newMatch.title}" foi criada com sucesso.\n${SPORT_LABELS[sport!]} · ${date} às ${time}`,
      [{ text: "Ver partidas", onPress: () => navigation.navigate("Home") }]
    );
  }

  return (
    <View className="flex-1 bg-neutral-50">
      {/* Header */}
      <View className="bg-secondary-900 pt-14 pb-4 px-4">
        <Text className="text-white text-2xl font-bold">Criar Partida</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="gap-5">
          {/* Sport */}
          <View>
            <SectionLabel>Modalidade *</SectionLabel>
            <View className="flex-row flex-wrap">
              {SPORTS.map((s) => {
                const selected = sport === s.value;
                return (
                  <Pressable
                    key={s.value}
                    onPress={() => {
                      setSport(s.value);
                      setSportError("");
                    }}
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    accessibilityLabel={s.label}
                    className={`mr-2 mb-2 px-4 py-2 rounded-full border ${
                      selected ? "bg-primary-500 border-primary-500" : "bg-white border-neutral-300"
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium ${selected ? "text-white" : "text-neutral-700"}`}
                    >
                      {s.icon} {s.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            {sportError ? <Text className="text-sm text-error mt-1">{sportError}</Text> : null}
          </View>

          {/* Title */}
          <Input
            label="Título da partida *"
            value={title}
            onChangeText={setTitle}
            error={titleError}
            placeholder="Ex: Pelada de domingo na arena"
            autoCapitalize="sentences"
          />

          {/* Location */}
          <Input
            label="Local *"
            value={location}
            onChangeText={setLocation}
            error={locationError}
            placeholder="Ex: Arena Botafogo — Rua Gen. Polidoro"
            autoCapitalize="words"
          />

          {/* Date + Time */}
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Input
                label="Data *"
                value={date}
                onChangeText={setDate}
                error={dateError}
                placeholder="DD/MM/AAAA"
                keyboardType="number-pad"
                maxLength={10}
              />
            </View>
            <View className="flex-1">
              <Input
                label="Horário *"
                value={time}
                onChangeText={setTime}
                error={timeError}
                placeholder="HH:MM"
                keyboardType="number-pad"
                maxLength={5}
              />
            </View>
          </View>

          {/* Max participants */}
          <Input
            label="Máximo de participantes *"
            value={maxParticipants}
            onChangeText={setMaxParticipants}
            error={maxParticipantsError}
            placeholder="Ex: 10"
            keyboardType="number-pad"
            maxLength={3}
          />

          {/* Level */}
          <View>
            <SectionLabel>Nível da partida</SectionLabel>
            <View className="flex-row gap-2">
              {LEVELS.map((l) => {
                const selected = level === l.value;
                return (
                  <Pressable
                    key={l.value}
                    onPress={() => setLevel(l.value)}
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    accessibilityLabel={l.label}
                    className={`flex-1 py-3 rounded-lg border items-center ${
                      selected ? "bg-primary-500 border-primary-500" : "bg-white border-neutral-300"
                    }`}
                  >
                    <Text
                      className={`text-sm font-semibold ${selected ? "text-white" : "text-neutral-700"}`}
                    >
                      {l.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Description */}
          <Input
            label="Descrição (opcional)"
            value={description}
            onChangeText={setDescription}
            placeholder="Informações extras: equipamento necessário, regras, etc."
            autoCapitalize="sentences"
            multiline
            numberOfLines={3}
            style={{ minHeight: 80, textAlignVertical: "top" }}
          />

          {/* Toggles */}
          <View className="gap-3">
            <SectionLabel>Opções</SectionLabel>
            <ToggleRow
              label="Permitir iniciantes"
              value={allowBeginners}
              onToggle={() => setAllowBeginners((v) => !v)}
              accessibilityLabel="Permitir iniciantes"
            />
            <ToggleRow
              label="Exigir aprovação do organizador"
              value={requiresApproval}
              onToggle={() => setRequiresApproval((v) => !v)}
              accessibilityLabel="Exigir aprovação do organizador"
            />
          </View>

          <Button label="Criar partida" onPress={handleSubmit} variant="primary" fullWidth />
        </View>
      </ScrollView>
    </View>
  );
}
