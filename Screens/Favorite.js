import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions'; // Đảm bảo đường dẫn chính xác
import { useNavigation } from '@react-navigation/native';
import { loadFavoriteItems, removeFromFavorites } from '../redux/favoriteSlice';

const FavoriteScreen = () => {
  const navigation = useNavigation();
  const favoriteItems = useSelector(state => state.favorites.favorites) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFavoriteItems()); // Tải danh sách yêu thích khi màn hình được mount
  }, [dispatch]);

  const handleAddAllToCart = () => {
    if (favoriteItems.length === 0) {
      alert("Không có sản phẩm nào trong danh sách yêu thích!");
      return;
    }

    favoriteItems.forEach(item => {
      dispatch(addToCart({ ...item, quantity: 1 }));
    });

    alert("Đã thêm tất cả sản phẩm vào giỏ hàng!");
    navigation.navigate('Cart');
  };

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity style={styles.favoriteItem} onPress={() =>
      navigation.navigate('ProductScreen', { product: item })}>
      <Image source={{ uri: item.hinhAnh }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.ten}</Text>
        <Text style={styles.itemPrice}>{item.gia.toLocaleString()} USD</Text>
      </View> 
      {/* Nút xóa sản phẩm */}
      <TouchableOpacity style={styles.deleteButton} onPress={() => dispatch(removeFromFavorites(item._id))}>
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Favorite</Text>
        <TouchableOpacity onPress={handleAddAllToCart}>
          <Text style={styles.addAllButton}>Thêm tất cả vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách sản phẩm yêu thích */}
      <FlatList
        data={favoriteItems}
        renderItem={renderFavoriteItem}
        keyExtractor={item => item._id}
        numColumns={2}
        contentContainerStyle={styles.favoriteContainer}
        ListEmptyComponent={<Text style={styles.emptyMessage}>Chưa có sản phẩm nào trong danh sách yêu thích!</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#333',
    bottom: 30,
  },
  addAllButton: {
    color: '#1E90FF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  favoriteContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  favoriteItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F2F4FA',
    borderRadius: 10,
    padding: 16,
    margin: 8,
    maxWidth: '48%',
  },
  itemImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  itemDetails: {
    alignItems: 'center',
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  deleteText: {
    fontSize: 16,
    color: '#888',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FavoriteScreen;
