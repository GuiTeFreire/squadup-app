import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import CreateMatchScreen from "../screens/CreateMatchScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import FiltersScreen from "../screens/FiltersScreen";
import HomeScreen from "../screens/HomeScreen";
import MatchChatScreen from "../screens/MatchChatScreen";
import MatchDetailScreen from "../screens/MatchDetailScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import PostMatchRatingScreen from "../screens/PostMatchRatingScreen";
import PublicProfileScreen from "../screens/PublicProfileScreen";
import RateUserScreen from "../screens/RateUserScreen";
import ReportDetailScreen from "../screens/ReportDetailScreen";
import ReportUserScreen from "../screens/ReportUserScreen";
import SearchScreen from "../screens/SearchScreen";
import type { AppRootStackParamList, AppTabParamList } from "./types";

const Tab = createBottomTabNavigator<AppTabParamList>();
const RootStack = createNativeStackNavigator<AppRootStackParamList>();

type IconProps = { color: string };
const HomeIcon = ({ color }: IconProps) => (
  <MaterialCommunityIcons name="home-variant" size={24} color={color} />
);
const SearchIcon = ({ color }: IconProps) => (
  <MaterialCommunityIcons name="magnify" size={24} color={color} />
);
const CreateIcon = ({ color }: IconProps) => (
  <MaterialCommunityIcons name="plus-circle-outline" size={24} color={color} />
);
const ProfileIcon = ({ color }: IconProps) => (
  <MaterialCommunityIcons name="account-outline" size={24} color={color} />
);

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#64748B",
        tabBarStyle: {
          backgroundColor: "#0F172A",
          borderTopColor: "#1E293B",
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: "Início", tabBarIcon: HomeIcon }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ tabBarLabel: "Busca", tabBarIcon: SearchIcon }}
      />
      <Tab.Screen
        name="CreateMatch"
        component={CreateMatchScreen}
        options={{ tabBarLabel: "Criar", tabBarIcon: CreateIcon }}
      />
      <Tab.Screen
        name="Profile"
        component={MyProfileScreen}
        options={{ tabBarLabel: "Perfil", tabBarIcon: ProfileIcon }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }} />
      <RootStack.Screen
        name="Filters"
        component={FiltersScreen}
        options={{
          presentation: "modal",
          headerShown: false,
          contentStyle: { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
        }}
      />
      <RootStack.Screen
        name="MatchDetail"
        component={MatchDetailScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="MatchChat"
        component={MatchChatScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="PublicProfile"
        component={PublicProfileScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="ReportUser"
        component={ReportUserScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="PostMatchRating"
        component={PostMatchRatingScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="RateUser"
        component={RateUserScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="ReportDetail"
        component={ReportDetailScreen}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
}
