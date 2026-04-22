import React, { useRef, useState } from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme, Text, Icon } from '@rneui/themed';
import { ActionSheetRef } from 'react-native-actions-sheet';
import { useSelector, useDispatch } from 'react-redux';
import { styles } from './styles';
import ProductCard from '../../components/ProductCard';
import ErrorBoundary from '../../components/HOC/ErrorBoundary';
import AppContainer from '../../components/HOC/AppContainer';
import { tags, sortItems } from '../../data';
import Chip from '../../components/Chip';
import Dialog from '../../components/Dialog';
import SortBy from './SortBy';
import { IRootState } from '../../store';
import { toggleFavorite, addToBag } from '../../store/cartSlice';

const Category = ({ route, navigation }) => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const [currentSortIndex, setCurrentSort] = useState(3);
    const category: string = route.params.category;

    const { products, loading, error } = useSelector((state: IRootState) => state.product);
    const favorites = useSelector((state: IRootState) => state.cart.favorites);
    const filters = useSelector((state: IRootState) => state.cart.filters);

    // Apply category filter
    let filtered = products.filter(p =>
        p.category?.toLowerCase().includes(category?.toLowerCase())
    );
    if (filtered.length === 0) filtered = products;

    // Apply price filter
    filtered = filtered.filter(p => p.price >= filters.priceLow && p.price <= filters.priceHigh);

    // Apply category filter from filter screen
    if (filters.category && filters.category !== 'All') {
        filtered = filtered.filter(p => p.category?.toLowerCase().includes(filters.category.toLowerCase()));
    }

    // Apply sort
    const sortId = sortItems[currentSortIndex]?.id;
    if (sortId === 'asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
    else if (sortId === 'desc') filtered = [...filtered].sort((a, b) => b.price - a.price);

    return (
        <AppContainer>
            <View style={styles.container}>
                <View style={styles.topBox}>
                    <ScrollView horizontal>
                        {tags.map((tag: string, index: number) => (
                            <Chip key={index} color={theme.colors.white} backgroundColor={theme.colors.black} text={tag} />
                        ))}
                    </ScrollView>
                    <View style={styles.filterContainer}>
                        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('ProductFilter')}>
                            <Icon type="material-icons" size={25} name="filter-list" color={theme.colors.black} />
                            <Text style={styles.filterText}>Filters</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.row} onPress={() => actionSheetRef.current?.show()}>
                            <Icon type="material-icons" size={25} name="swap-vert" color={theme.colors.black} />
                            <Text style={styles.filterText}>{sortItems[currentSortIndex].name}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.row}>
                            <Icon type="material-icons" size={25} name="view-list" color={theme.colors.black} />
                        </TouchableOpacity>
                    </View>
                </View>

                {loading && <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginVertical: 20 }} />}
                {error && <Text style={{ color: theme.colors.error, textAlign: 'center', margin: 10 }}>{error}</Text>}

                {!loading && !error && (
                    <View style={styles.productContainer}>
                        {filtered.map((product, index) => (
                            <ProductCard
                                key={index}
                                category={product.category}
                                name={product.title}
                                ratingValue={product.rating?.rate}
                                totalRating={product.rating?.count}
                                price={product.price}
                                image={{ uri: product.image }}
                                buttonStyle={{ backgroundColor: `${theme.colors.primary}` }}
                                imageWidth={155}
                                imageHeight={160}
                                isFavorite={favorites.some(f => f.id === product.id)}
                                onFavoritePress={() => dispatch(toggleFavorite(product) as any)}
                                onAddToBag={() => dispatch(addToBag(product) as any)}
                            />
                        ))}
                    </View>
                )}
            </View>
            <Dialog actionSheetRef={actionSheetRef}>
                <SortBy sortItems={sortItems} setCurrentSort={setCurrentSort} currentSortIndex={currentSortIndex} />
            </Dialog>
        </AppContainer>
    );
};

export default ErrorBoundary(Category);
