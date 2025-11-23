import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../components/pages/login';
import Cadastro from '../components/pages/cadastro';

const Tab = createBottomTabNavigator();

export default function BottomRoutes() {
  return (
    <Tab.Navigator>
   
      <Tab.Screen name="Profile" component={User} />
    </Tab.Navigator>
  );
}