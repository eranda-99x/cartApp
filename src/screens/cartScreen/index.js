import React from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import Header from '../../components/header';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Text } from 'react-native-paper';
import { selectAllCartProducts } from '../../redux/slice/productSlice';
import ListCart from '../../components/listCart';

const CartScreen = ({ navigation }) => {
  const products = useSelector(selectAllCartProducts);
  const dispatch = useDispatch();

  // Calculate total price
  const totalPrice = products.reduce((total, item) => total + parseFloat(item.price.amount), 0);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header navigation={navigation} title={'Cart'} />
      <FlatList
        data={products}
        renderItem={({ item }) => <ListCart product={item} dispatch={dispatch}/>}
        keyExtractor={item => item.id}
        ListFooterComponent={() => (
          <Card style={styles.footer}>
            <Card.Content>
              <Text variant="bodyLarge">{`Total Price : ${totalPrice.toFixed(2)} GBP`}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  footer: {
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#fcc0c5',
  },
});
