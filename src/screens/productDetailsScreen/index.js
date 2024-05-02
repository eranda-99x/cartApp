import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Button, Card, Text, SegmentedButtons, Divider } from 'react-native-paper';
import Header from '../../components/header';
import { useSelector, useDispatch } from 'react-redux';
import { addtoCart, selectAllCartProducts } from '../../redux/slice/productSlice';
import Toast from 'react-native-toast-message';

const ProductDetailsScreen = ({ navigation, route }) => {
  const selectedProduct = route?.params.product;
  const [value, setValue] = useState(selectedProduct?.sizes[0]);
  const [adding, setAdding] = useState(false);
  const cartItems = useSelector(selectAllCartProducts);
  const dispatch = useDispatch();

  const addToCartProduct = () => {
    setAdding(true);
    const index = cartItems.findIndex(cartItem => cartItem.id === selectedProduct.id);
    if (index === -1) {
      const productData = {
        ...selectedProduct,
        selectedSize: value,
      };
      dispatch(addtoCart(productData));
      Toast.show({
        type: 'success',
        text1: 'Product added to cart!',
      });
      navigation.goBack();
    } else {
      Toast.show({
        type: 'error',
        text1: 'Product is already added to the cart.',
      });
    }
    setAdding(false);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header navigation={navigation} title={'Product Details'} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">{selectedProduct?.brandName}</Text>
            <Text variant="bodyMedium">{selectedProduct?.name}</Text>
          </Card.Content>
          <Card.Cover
            source={{ uri: selectedProduct?.mainImage }}
            style={styles.cover}
            resizeMode="contain"
          />
          <Card.Content>
            <Text variant="bodyMedium">{`SKU : ${selectedProduct?.SKU} `}</Text>
            <Text variant="bodyMedium">{selectedProduct?.description}</Text>
            <Divider style={styles.divider} />
            <Text variant="bodyMedium">{`Color : ${selectedProduct?.colour?.toUpperCase()} `}</Text>
            <Divider style={styles.divider} />
            <Text variant="bodyMedium">{`Price : ${selectedProduct?.price?.amount} ${selectedProduct?.price?.currency}`}</Text>
            <Divider style={styles.divider} />
            <Text variant="bodyMedium">{selectedProduct?.stockStatus}</Text>
            <Divider style={styles.divider} />
            <Text variant="bodyMedium">{`Available sizes : `}</Text>
            {selectedProduct?.sizes && selectedProduct?.sizes.length > 0 && (
              <SegmentedButtons
                style={styles.segmentedButtons}
                value={value}
                onValueChange={setValue}
                buttons={selectedProduct?.sizes?.map(item => ({ value: item, label: item }))}
              />
            )}
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button onPress={addToCartProduct} disabled={adding}>Add To Cart</Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  card: {
    margin: 10,
  },
  cover: {
    backgroundColor: '#fff',
    margin: 10,
  },
  divider: {
    marginVertical: 10,
    backgroundColor: 'black',
  },
  segmentedButtons: {
    marginVertical: 10,
  },
  cardActions: {
    alignSelf: 'center',
  },
});
