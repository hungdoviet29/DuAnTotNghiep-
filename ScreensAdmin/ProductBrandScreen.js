import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductBrandScreen = () => {
  const navigation = useNavigation();

  // Dữ liệu giả để hiển thị danh sách sản phẩm
  const products = [
    { id: '1', name: 'Asus vivobook', price: 120, originalPrice: 240, discount: 50, rating: 4.5 },
    { id: '2', name: 'Asus vivobook', price: 120, originalPrice: 240, discount: 50, rating: 4.5 },
    { id: '3', name: 'Asus vivobook', price: 120, originalPrice: 240, discount: 50, rating: 4.5 },
    { id: '4', name: 'Asus vivobook', price: 120, originalPrice: 240, discount: 50, rating: 4.5 },
  ];

  // Hàm render từng sản phẩm trong danh sách
  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteIcon}>×</Text>
      </TouchableOpacity>
      <Image
        source={require('../acssets/image_sp2.png')}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.discountText}>-{item.discount}%</Text>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)} USD</Text>
        <Text style={styles.originalPrice}>${item.originalPrice.toFixed(2)}</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <Text key={index} style={[styles.star, index < item.rating ? styles.starFilled : styles.starEmpty]}>
              ★
            </Text>
          ))}
          <Text style={styles.ratingText}>({item.rating})</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../acssets/BackButton.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.header}>Product Brand</Text>
      <View style={styles.content}>
        <Text style={styles.title}>Acer</Text>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.productList}
        />
        <TouchableOpacity style={styles.addButton}>
          <Image
            source={require('../acssets/them.png')}
            style={styles.addIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    paddingTop: 20,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6C4AB6',
    marginBottom: 20,
    textAlign: 'center',
  },
  productList: {
    paddingBottom: 80,
  },
  productContainer: {
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: '1.5%',
    padding: 10,
    position: 'relative',
    alignItems: 'center',
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  deleteIcon: {
    fontSize: 18,
    color: '#FF3B30',
  },
  productImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
  },
  productInfo: {
    alignItems: 'center',
    marginTop: 10,
  },
  discountText: {
    color: '#FF3B30',
    fontSize: 12,
    fontWeight: 'bold',
    position: 'absolute',
    top: -10,
    left: -5,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#FF3B30',
  },
  originalPrice: {
    fontSize: 12,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  star: {
    fontSize: 12,
    color: '#FFD700',
  },
  starFilled: {
    color: '#FFD700',
  },
  starEmpty: {
    color: '#CCC',
  },
  ratingText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    width: 50,
    height: 50,
  },
});

export default ProductBrandScreen;