import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import { MatchFiltersProvider, useMatchFiltersContext } from "../../contexts/MatchFiltersContext";
import FiltersScreen from "../FiltersScreen";

const mockGoBack = jest.fn();
const mockRequestLocation = jest.fn();
let mockDeviceLocation: { latitude: number; longitude: number } | null = null;
let mockPermissionDenied = false;

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ goBack: mockGoBack }),
}));

jest.mock("../../hooks/useDeviceLocation", () => ({
  useDeviceLocation: () => ({
    location: mockDeviceLocation,
    permissionDenied: mockPermissionDenied,
    isLoading: false,
    requestLocation: mockRequestLocation,
  }),
}));

function AppliedFiltersProbe() {
  const { filters } = useMatchFiltersContext();
  return (
    <>
      <Text>{`nearMe:${String(filters.nearMe)}`}</Text>
      <Text>{`lat:${String(filters.latitude)}`}</Text>
      <Text>{`radius:${filters.radiusKm}`}</Text>
    </>
  );
}

function renderScreen() {
  return render(
    <MatchFiltersProvider>
      <FiltersScreen />
      <AppliedFiltersProbe />
    </MatchFiltersProvider>
  );
}

beforeEach(() => {
  jest.clearAllMocks();
  mockDeviceLocation = null;
  mockPermissionDenied = false;
});

describe("FiltersScreen — proximidade", () => {
  it("não mostra os chips de raio antes de ativar 'Usar minha localização'", () => {
    renderScreen();
    expect(screen.queryByText("20 km")).toBeNull();
  });

  it("pede a localização do dispositivo ao ativar o toggle", () => {
    renderScreen();
    fireEvent.press(screen.getByText("Usar minha localização"));
    expect(mockRequestLocation).toHaveBeenCalledTimes(1);
  });

  it("mostra os chips de raio depois de ativar o toggle", () => {
    renderScreen();
    fireEvent.press(screen.getByText("Usar minha localização"));
    expect(screen.getByText("20 km")).toBeTruthy();
  });

  it("aplica nearMe e coordenadas quando o toggle está ativo e a localização é obtida", () => {
    mockDeviceLocation = { latitude: -22.9, longitude: -43.2 };
    renderScreen();

    fireEvent.press(screen.getByText("Usar minha localização"));
    fireEvent.press(screen.getByText("Aplicar 1 filtro"));

    expect(screen.getByText("nearMe:true")).toBeTruthy();
    expect(screen.getByText("lat:-22.9")).toBeTruthy();
  });

  it("não aplica geolocalização quando o toggle nunca foi ativado", () => {
    renderScreen();
    fireEvent.press(screen.getByText("Aplicar filtros"));

    expect(screen.getByText("nearMe:false")).toBeTruthy();
    expect(screen.getByText("lat:null")).toBeTruthy();
  });

  it("mostra aviso e aplica sem coordenadas quando a permissão é negada (fallback gracioso)", () => {
    mockPermissionDenied = true;
    renderScreen();

    fireEvent.press(screen.getByText("Usar minha localização"));
    expect(screen.getByText(/Permissão de localização negada/)).toBeTruthy();
    // O toggle continua ativo (D-Geo-3) — chips de raio seguem visíveis.
    expect(screen.getByText("20 km")).toBeTruthy();

    fireEvent.press(screen.getByText("Aplicar 1 filtro"));

    expect(screen.getByText("nearMe:true")).toBeTruthy();
    expect(screen.getByText("lat:null")).toBeTruthy();
  });

  it("permite selecionar um raio diferente do padrão", () => {
    renderScreen();
    fireEvent.press(screen.getByText("Usar minha localização"));
    fireEvent.press(screen.getByText("50 km"));
    fireEvent.press(screen.getByText("Aplicar 1 filtro"));

    expect(screen.getByText("radius:50")).toBeTruthy();
  });

  it("desativa o toggle e limpa as coordenadas ao pressionar novamente", () => {
    mockDeviceLocation = { latitude: -22.9, longitude: -43.2 };
    renderScreen();

    fireEvent.press(screen.getByText("Usar minha localização"));
    fireEvent.press(screen.getByText("Usar minha localização"));
    fireEvent.press(screen.getByText("Aplicar filtros"));

    expect(screen.getByText("nearMe:false")).toBeTruthy();
    expect(screen.getByText("lat:null")).toBeTruthy();
  });
});
