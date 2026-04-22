import React from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Button, useTheme } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../store';
import { removeFromBag, incrementQuantity, decrementQuantity, clearBag } from '../../store/cartSlice';
import { toPKR } from '../../utils/currency';

const Bag = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const bag = useSelector((state: IRootState) => state.cart.bag);

    const subtotal = bag.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const shipping = bag.length > 0 ? 4.99 : 0;
    const total = subtotal + shipping;

    if (bag.length === 0) {
        return (
            <View style={styles.empty}>
                <Text h3>Your bag is empty</Text>
                <Text h4 style={{ marginTop: 8, color: '#999' }}>Add items to get started</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={bag}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ padding: 16, paddingBottom: 8 }}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
                        <View style={styles.info}>
                            <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
                            <Text style={styles.category}>{item.category}</Text>
                            <Text style={[styles.price, { color: theme.colors.primary }]}>
                                {toPKR(item.price * item.quantity)}
                            </Text>
                            {/* Quantity controls */}
                            <View style={styles.qtyRow}>
                                <TouchableOpacity
                                    style={[styles.qtyBtn, { borderColor: theme.colors.grey3 }]}
                                    onPress={() => dispatch(decrementQuantity(item.id))}
                                >
                                    <Text style={styles.qtyText}>−</Text>
                                </TouchableOpacity>
                                <Text style={styles.qtyValue}>{item.quantity}</Text>
                                <TouchableOpacity
                                    style={[styles.qtyBtn, { borderColor: theme.colors.grey3 }]}
                                    onPress={() => dispatch(incrementQuantity(item.id))}
                                >
                                    <Text style={styles.qtyText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => dispatch(removeFromBag(item.id))}>
                            <Text style={{ color: theme.colors.error, fontSize: 20 }}>×</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: theme.colors.grey5 }]} />}
            />

            {/* Order summary */}
            <View style={[styles.summary, { borderTopColor: theme.colors.grey5 }]}>
                <View style={styles.summaryRow}>
                    <Text h4>Subtotal ({bag.reduce((s, p) => s + p.quantity, 0)} items)</Text>
                    <Text h4>{toPKR(subtotal)}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text h4>Shipping</Text>
                    <Text h4>{toPKR(shipping)}</Text>
                </View>
                <View style={[styles.summaryRow, styles.totalRow]}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={[styles.totalLabel, { color: theme.colors.primary }]}>{toPKR(total)}</Text>
                </View>
                <Button
                    title="Proceed to Checkout"
                    onPress={() => alert(`Order placed! Total: ${toPKR(total)}`)}
                    containerStyle={{ marginTop: 12 }}
                />
                <TouchableOpacity onPress={() => dispatch(clearBag())} style={{ alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ color: theme.colors.error, fontSize: 13 }}>Clear bag</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    item: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 12, gap: 12 },
    image: { width: 80, height: 80, borderRadius: 8, backgroundColor: '#f5f5f5' },
    info: { flex: 1 },
    title: { fontSize: 13, marginBottom: 2, fontWeight: '500' },
    category: { fontSize: 11, color: '#999', marginBottom: 4, textTransform: 'capitalize' },
    price: { fontSize: 14, fontWeight: '700', marginBottom: 8 },
    qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    qtyBtn: { width: 28, height: 28, borderWidth: 1, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
    qtyText: { fontSize: 16, lineHeight: 20 },
    qtyValue: { fontSize: 14, fontWeight: '600', minWidth: 20, textAlign: 'center' },
    separator: { height: 1, marginHorizontal: 0 },
    summary: { padding: 16, borderTopWidth: 1 },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    totalRow: { marginTop: 4, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#eee' },
    totalLabel: { fontSize: 16, fontWeight: '700' },
});

export default Bag;
