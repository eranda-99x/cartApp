import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

const ListCard = ({ product, navigation }) => {
  const onPressCard = () => {
    navigation.navigate('ProductDetailsScreen', { product });
  };

  return (
    <Card style={styles.card} onPress={onPressCard} key={product.id}>
      <Card.Content>
        <Text variant="titleLarge">{product?.brandName}</Text>
        <Text variant="bodyMedium">{product?.name}</Text>
      </Card.Content>
      <Card.Cover
        source={{ uri: product?.mainImage }}
        style={styles.cover}
        resizeMode="contain"
      />
      <Card.Content>
        <Text variant="bodyMedium" style={styles.price}>
          {`Price : ${product?.price?.amount} ${product?.price?.currency}`}
        </Text>
        <Text variant="bodyMedium" style={styles.stockStatus}>
          {product?.stockStatus}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  cover: {
    backgroundColor: '#fff',
    margin: 10,
  },
  price: {
    color: 'blue',
  },
  stockStatus: {
    color: 'blue',
  },
});

export default ListCard;
