import React, { useEffect } from 'react';
import { ScrollView, View, ImageBackground, TouchableHighlight, Dimensions, ActivityIndicator } from 'react-native';
import { Button, Text, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
import ProductCard from '../../components/ProductCard';
import ErrorBoundary from '../../components/HOC/ErrorBoundary';
import { banner } from '../../data';
import { fetchProducts } from '../../store/productSlice';
import { toggleFavorite, addToBag } from '../../store/cartSlice';
import { IRootState } from '../../store';

const Home = ({ navigation }) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state: IRootState) => state.product);
    const favorites = useSelector((state: IRootState) => state.cart.favorites);
    const screenHeight = Dimensions.get('window').height;
    const sixtyFivePercentOfScreenHeight = screenHeight * 0.67;

    useEffect(() => {
        dispatch(fetchProducts() as any);
    }, []);

    return (
        <ScrollView>
            <View style={styles().container}>
                <View style={styles(sixtyFivePercentOfScreenHeight).imageContainer}>
                    <ImageBackground source={banner.image} resizeMode="cover" style={styles().image}>
                        <Text style={styles().text}>{banner.text}</Text>
                        <Button size="sm" title={banner.buttonText} onPress={() => {}} containerStyle={styles().button} />
                    </ImageBackground>
                </View>
                <View style={styles().titleContainer}>
                    <View>
                        <Text h1>{t('common:new')}</Text>
                        <Text h3 style={styles().subTitle}>{t('common:homeSubTitle')}</Text>
                    </View>
                    <TouchableHighlight underlayColor="transparent" onPress={() => navigation.navigate(t('common:shop'))}>
                        <Text h3>{t('common:viewAll')}</Text>
                    </TouchableHighlight>
                </View>

                {loading && <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginVertical: 20 }} />}
                {error && <Text style={{ color: theme.colors.error, textAlign: 'center', margin: 10 }}>{error}</Text>}

                {!loading && !error && (
                    <ScrollView horizontal>
                        <View style={styles().productContainer}>
                            {products.map((product, index) => (
                                <ProductCard
                                    key={index}
                                    category={product.category}
                                    name={product.title}
                                    ratingValue={product.rating?.rate}
                                    totalRating={product.rating?.count}
                                    price={product.price}
                                    image={{ uri: product.image }}
                                    buttonStyle={{ backgroundColor: `${theme.colors.primary}` }}
                                    label="NEW"
                                    isFavorite={favorites.some(f => f.id === product.id)}
                                    onFavoritePress={() => dispatch(toggleFavorite(product) as any)}
                                    onAddToBag={() => dispatch(addToBag(product) as any)}
                                />
                            ))}
                        </View>
                    </ScrollView>
                )}
            </View>
        </ScrollView>
    );
};

export default ErrorBoundary(Home);
