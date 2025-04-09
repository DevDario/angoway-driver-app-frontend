import { Tabs } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faRoad, faWrench, faList } from "@fortawesome/free-solid-svg-icons";
import QueryProvider from "../providers/QueryProvider";

export default function TabsLayout() {
  return (
    <QueryProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#fcfcfb",
            height: 80,
            paddingTop: 18,
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#0C6DFF",
          tabBarInactiveTintColor: "#505050",
          animation: "shift",
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faList} color={color} size={20} />
            ),
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faRoad} color={color} size={20} />
            ),
          }}
        />
        <Tabs.Screen
          name="manage"
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faWrench} color={color} size={20} />
            ),
          }}
        />
      </Tabs>
    </QueryProvider>
  );
}