import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, FlatList, ActivityIndicator, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/actions/productAction';
import { getProductsStatus, selectAllProducts } from '../../redux/slice/productSlice';
import ListCard from '../../components/listCard';
import Header from '../../components/header';

const ProductListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const productStatus = useSelector(getProductsStatus);
  const products = useSelector(selectAllProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const renderContent = () => {
    if (productStatus === 'loading') {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={40} />
        </View>
      );
    } else {
      return (
        <FlatList
          data={products}
          renderItem={({ item }) => <ListCard product={item} navigation={navigation} />}
          keyExtractor={item => item.id}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header navigation={navigation} title={'Products'} hideBack={true} />
      {renderContent()}
    </SafeAreaView>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
