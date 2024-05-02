import React from 'react';
import { View } from 'react-native';
import { Appbar, Badge } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { selectAllCartProducts } from '../../redux/slice/productSlice';

const Header = ({ navigation, title, hideBack }) => {
  const productsCount = useSelector(state => selectAllCartProducts(state)?.length);

  return (
    <Appbar.Header>
      {navigation && navigation.canGoBack() && !hideBack && (
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      )}
      <Appbar.Content title={title} />
      <View>
        <Badge
          visible={productsCount > 0}
          size={18}
          style={{ position: 'absolute', top: 5, right: 5 }}
        >
          {productsCount}
        </Badge>
        <Appbar.Action icon="cart" onPress={() => navigation.navigate('CartScreen')} />
      </View>
    </Appbar.Header>
  );
};

export default Header;
