import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import displayProduct from '../screens/admin/product/displayProduct';
import addProduct from '../screens/admin/product/addProduct';
import editProduct from '../screens/admin/product/editProduct';
import showProduct from '../screens/admin/product/showProduct';
import displayOrder from '../screens/admin/order/displayOrder';
import displayReview from '../screens/admin/review/displayReview';
import dashboard from '../screens/admin/dashboard/dashboard';

const AdminStack = createStackNavigator();

const AdminNavigator = () => {
    return (
        <AdminStack.Navigator screenOptions={{ headerShown: false }}>
            <AdminStack.Screen name="dashboard" component={dashboard} />
            <AdminStack.Screen name="displayOrder" component={displayOrder} />
            <AdminStack.Screen name="displayProduct" component={displayProduct} />
            <AdminStack.Screen name="displayReview" component={displayReview} />  
            <AdminStack.Screen name="addProduct" component={addProduct} />
            <AdminStack.Screen name="editProduct" component={editProduct} />
            <AdminStack.Screen name="showProduct" component={showProduct} />
           
        </AdminStack.Navigator>
    );
};

export default AdminNavigator;
