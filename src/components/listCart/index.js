import React, { useState } from 'react';
import { Button, Card, Text } from 'react-native-paper';
import { removeFromCart } from '../../redux/slice/productSlice';
import Toast from 'react-native-toast-message';
import { StyleSheet } from 'react-native';

const ListCart = ({ product, dispatch}) => {
  const [remove, setRemove] = useState(false);

  const handleRemoveFromCart = () => {
    if (!remove) {
      setRemove(true);
      dispatch(removeFromCart(product));
      Toast.show({
        type: 'success',
        text1: 'Product removed from cart!',
      });
      setRemove(false);
    }
  };

  return (
    <Card style={styles.card} key={product.id}>
      <Card.Content>
        <Text variant="bodyMedium">{product?.brandName}</Text>
        <Text variant="bodyMedium">{product?.name}</Text>
        <Text variant="bodyMedium">{`Size : ${product.selectedSize}`}</Text>
        <Text variant="bodyLarge" style={styles.price}>{`${product?.price?.amount} ${product?.price?.currency}`}</Text>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button disabled={remove} onPress={handleRemoveFromCart}>Remove from cart</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  price: {
    alignSelf: 'flex-end',
  },
  actions: {
    alignSelf: 'center',
  },
});

export default ListCart;
