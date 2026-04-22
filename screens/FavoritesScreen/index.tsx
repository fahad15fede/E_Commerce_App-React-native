import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, useTheme } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../store';
import { toggleFavorite, addToBag } from '../../store/cartSlice';
import ProductCard from '../../components/ProductCard';

const Favorites = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const favorites = useSelector((state: IRootState) => state.cart.favorites);

    if (favorites.length === 0) {
        return (
            <View style={styles.empty}>
                <Text h3>No favorites yet</Text>
                <Text h4 style={{ marginTop: 8, color: '#999' }}>Tap the heart on any product</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={favorites}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={{ padding: 10 }}
            renderItem={({ item }) => (
                <ProductCard
                    category={item.category}
                    name={item.title}
                    price={item.price}
                    image={{ uri: item.image }}
                    ratingValue={item.rating?.rate}
                    totalRating={item.rating?.count}
                    buttonStyle={{ backgroundColor: theme.colors.primary }}
                    isFavorite={true}
                    onFavoritePress={() => dispatch(toggleFavorite(item) as any)}
                    onAddToBag={() => dispatch(addToBag(item) as any)}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({
    empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default Favorites;
