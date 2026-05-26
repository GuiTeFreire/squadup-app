export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ProfileSetup: undefined;
};

export type AppRootStackParamList = {
  AppTabs: undefined;
  Filters: undefined;
  MatchDetail: { matchId: string };
};

export type AppTabParamList = {
  Home: undefined;
  Search: undefined;
  CreateMatch: undefined;
  Profile: undefined;
};
