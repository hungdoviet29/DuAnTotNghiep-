// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const OrderScreen = () => {
//     const [userId, setUserId] = useState(null);
//     const [orderDetails, setOrderDetails] = useState([]);  // Thay đổi từ null thành mảng để chứa nhiều đơn hàng
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchUserId = async () => {
//             try {
//                 const id = await AsyncStorage.getItem('userId');
//                 if (id) {
//                     setUserId(id);
//                     fetchOrders(id);
//                 } else {
//                     Alert.alert('Lỗi', 'Không tìm thấy User ID. Vui lòng đăng nhập lại.');
//                 }
//             } catch (error) {
//                 console.error('Lỗi khi lấy User ID:', error);
//                 Alert.alert('Lỗi', 'Không thể truy xuất User ID.');
//             }
//         };

//         fetchUserId();
//     }, []);

//     const fetchOrders = async (userId) => {
//         try {
//             const response = await fetch(`http://192.168.3.106:3000/donhang/user/${userId}`);  // Chỉnh lại dấu {userId} thành ${userId}
            
//             // Kiểm tra mã trạng thái HTTP
//             if (!response.ok) {
//                 const errorText = await response.text(); // Lấy nội dung phản hồi dưới dạng text để kiểm tra chi tiết lỗi
//                 throw new Error(`Lỗi khi tải đơn hàng: ${errorText}`);
//             }
        
//             // Nếu phản hồi thành công, phân tích dữ liệu JSON
//             const data = await response.json();
//             setOrderDetails(data);  // Lưu tất cả đơn hàng vào state
//             setLoading(false);  // Cập nhật loading khi tải xong
//         } catch (error) {
//             console.error('Lỗi khi tải đơn hàng:', error.message);
//             Alert.alert('Lỗi', error.message);  // Hiển thị chi tiết lỗi
//             setLoading(false);  // Cập nhật loading khi có lỗi
//         }
//     };

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#F8B400" />
//                 <Text>Đang tải...</Text>
//             </View>
//         );
//     }

//     if (orderDetails.length === 0) {  // Kiểm tra nếu không có đơn hàng
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.errorText}>Không có đơn hàng nào.</Text>
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Thông tin đơn hàng</Text>
//             <ScrollView style={styles.scrollContainer}>
//                 {orderDetails.map((order) => (  // Render tất cả các đơn hàng
//                     <View key={order._id} style={styles.orderDetails}>
//                         <Text style={styles.orderText}>Mã đơn hàng: {order._id}</Text>
//                         <Text style={styles.orderText}>Trạng thái: {order.status}</Text>
//                         <Text style={styles.orderText}>Phương thức thanh toán: {order.paymentMethod}</Text>
//                         <Text style={styles.orderText}>Địa chỉ giao hàng: {order.shippingInfo.address}</Text>
//                         <Text style={styles.orderText}>Tên người nhận: {order.shippingInfo.name}</Text>
//                         <Text style={styles.orderText}>Số điện thoại: {order.shippingInfo.phone}</Text>
//                         <Text style={styles.orderText}>Tổng tiền: {order.totalAmount.toLocaleString()} VND</Text>
                        
//                         <Text style={styles.productsTitle}>Sản phẩm trong đơn hàng:</Text>
//                         {order.cartItems.map((item) => (
//                             <View key={item._id} style={styles.cartItem}>
//                                 <Image
//                                     source={{ uri: item.productId?.hinhAnh }}
//                                     style={styles.itemImage}
//                                 />
//                                 <View style={styles.itemDetails}>
//                                     <Text style={styles.itemName}>
//                                         {item.productId?.ten || 'Sản phẩm không xác định'}
//                                     </Text>
//                                     <Text style={styles.itemPrice}>
//                                         {item.productId?.gia
//                                             ? `${item.productId.gia.toLocaleString()} VND`
//                                             : 'Không có giá'}
//                                     </Text>
//                                     <Text style={styles.itemQuantity}>
//                                         Số lượng: {item.quantity}
//                                     </Text>
//                                 </View>
//                             </View>
//                         ))}
//                     </View>
//                 ))}
//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
//     loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//     scrollContainer: { marginBottom: 20 },
//     title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 },
//     orderDetails: { marginBottom: 20 },
//     orderText: { fontSize: 16, color: '#333', marginBottom: 8 },
//     productsTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: 20, marginBottom: 10 },
//     cartItem: {
//         flexDirection: 'row',
//         marginBottom: 16,
//         backgroundColor: '#fff',
//         padding: 12,
//         borderRadius: 8,
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowRadius: 6,
//         elevation: 2,
//         alignItems: 'center',
//     },
//     itemImage: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
//     itemDetails: { justifyContent: 'center', flex: 1 },
//     itemName: { fontSize: 14, fontWeight: 'bold', color: '#333' },
//     itemPrice: { fontSize: 12, color: '#666' },
//     itemQuantity: { fontSize: 12, color: '#888' },
//     errorText: { textAlign: 'center', fontSize: 18, color: '#888' },
// });

// export default OrderScreen;
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderScreen = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (id) {
          setUserId(id);
          fetchOrders(id);
        } else {
          Alert.alert('Lỗi', 'Không tìm thấy User ID. Vui lòng đăng nhập lại.');
        }
      } catch (error) {
        console.error('Lỗi khi lấy User ID:', error);
        Alert.alert('Lỗi', 'Không thể truy xuất User ID.');
      }
    };

    fetchUserId();
  }, []);

  const fetchOrders = async (userId) => {
    try {
      const response = await fetch(
        `http://192.168.3.106:3000/donhang/user/${userId}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Lỗi khi tải đơn hàng: ${errorText}`);
      }

      const data = await response.json();
      setOrderDetails(data);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi tải đơn hàng:', error.message);
      Alert.alert('Lỗi', error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text>Đang tải...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../acssets/BackButton.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Đơn Hàng</Text>
        <TouchableOpacity>
          <Image source={require('../acssets/Menu2.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.ordersList}>
        {orderDetails.length > 0 ? (
          orderDetails.map((order) => (
            <View key={order._id} style={styles.orderItem}>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>
                  {`Tên người nhận: ${order.shippingInfo?.name || ''}`}
                </Text>
                <Text style={styles.productBrand}>
                  {`Số điện thoại: ${order.shippingInfo?.phone || ''}`}
                </Text>
                <Text style={styles.productBrand}>
                  {`Địa chỉ: ${order.shippingInfo?.address || ''}`}
                </Text>
                <Text style={styles.productPrice}>
                  Tổng tiền: {order.totalAmount.toLocaleString()} VND
                </Text>
                <Text style={styles.orderStatus}>
                  Trạng thái: {order.status}
                </Text>
                <Text style={styles.productsTitle}>
                  Sản phẩm trong đơn hàng:
                </Text>
                {order.cartItems.map((item) => (
                  <View key={item._id} style={styles.cartItem}>
                    <Image
                      source={{ uri: item.productId.hinhAnh }}
                      style={styles.itemImage}
                    />
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName}>
                        {item.productId?.ten || 'Sản phẩm không xác định'}
                      </Text>
                      <Text style={styles.itemPrice}>
                        {item.productId?.gia
                          ? `${item.productId.gia.toLocaleString()} VND`
                          : 'Không có giá'}
                      </Text>
                      <Text style={styles.itemQuantity}>
                        Số lượng: {item.quantity}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noOrdersText}>Không có đơn hàng nào.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#f8f8f8',
  },
  icon: { width: 24, height: 24 },
  headerText: { fontSize: 18, fontWeight: 'bold' },
  ordersList: {
    padding: 16,
  },
  orderItem: {
    flexDirection: 'column',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 20,
    padding: 16,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productBrand: {
    fontSize: 14,
    color: '#888',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  orderStatus: {
    fontSize: 12,
    color: '#aaa',
  },
  productsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  itemImage: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  itemDetails: { justifyContent: 'center', flex: 1 },
  itemName: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  itemPrice: { fontSize: 12, color: '#666' },
  itemQuantity: { fontSize: 12, color: '#888' },
  noOrdersText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
  },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default OrderScreen;
