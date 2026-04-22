import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Badge, Icon, Text, useTheme } from '@rneui/themed';
import { scale, verticalScale } from "react-native-size-matters";
import { styles } from './styles';
import { toPKR } from '../../utils/currency';

type ProductCardProps = {
    image?: any;
    imageStyle?: { [key: string]: any };
    label?: string;
    badgeStyle?: { [key: string]: any };
    buttonStyle?: { [key: string]: any };
    ratingValue?: number;
    ratingCount?: number;
    totalRating?: number;
    ratingSize?: number;
    salePrice?: number;
    price: number;
    currency?: string;
    category: string;
    name: string;
    imageWidth?: number;
    imageHeight?: number;
    isFavorite?: boolean;
    onFavoritePress?: () => void;
    onAddToBag?: () => void;
    onPress?: () => void;
};

const ProductCard = (props: ProductCardProps) => {
    const { theme } = useTheme();
    let {
        imageStyle,
        image,
        label,
        badgeStyle,
        buttonStyle = { backgroundColor: '#fff' },
        ratingValue = 0,
        ratingCount = 5,
        totalRating = 0,
        ratingSize = 15,
        salePrice,
        price,
        currency = "$",
        category,
        name,
        imageWidth = 135,
        imageHeight = 150,
        isFavorite = false,
        onFavoritePress,
        onAddToBag,
        onPress,
    } = props;

    imageWidth = scale(imageWidth);

    return (
        <View style={[styles(imageWidth).container]}>
            <View style={styles(imageWidth).imageContainer}>
                <TouchableOpacity onPress={onPress}>
                    <Image source={image} resizeMode="cover" style={[styles(imageWidth).image, imageStyle, { height: verticalScale(imageHeight) }]} />
                    <Badge
                        status="primary"
                        value={label ? label : ""}
                        containerStyle={{ position: 'absolute', top: 10, left: 8 }}
                        badgeStyle={[label && { backgroundColor: "#000", borderColor: 'transparent', borderRadius: 25, paddingHorizontal: 2, height: 24 }, badgeStyle]}
                        textStyle={{ fontSize: 11, fontWeight: "700" }}
                    />
                    <Icon
                        raised
                        name={isFavorite ? "favorite" : "favorite-border"}
                        type="material-icons"
                        color={isFavorite ? '#2563EB' : "#9B9B9B"}
                        size={18}
                        containerStyle={[{ position: 'absolute', bottom: -20, right: -10, backgroundColor: '#fff' }, buttonStyle]}
                        onPress={onFavoritePress}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles().productInfo}>
                <View style={styles().star}>
                    {(() => {
                        let rating = [];
                        for (let i = 1; i <= ratingCount; i++) {
                            if (i <= ratingValue && totalRating !== 0) {
                                rating.push(<Icon key={i} name="star" type="ionicons" color={theme.colors.warning} size={ratingSize} />);
                            } else {
                                rating.push(<Icon key={i} name="star-outline" type="ionicons" color={theme.colors.grey0} size={ratingSize} />);
                            }
                        }
                        return rating;
                    })()}
                    <Text h4>({totalRating})</Text>
                </View>
                <Text style={styles().text} h4>{category}</Text>
                <Text style={styles().text}>{name}</Text>
                <View style={styles().priceContainer}>
                    <Text style={[styles().price, salePrice && { textDecorationLine: 'line-through' }]}>{toPKR(price)}</Text>
                    {salePrice && <Text style={styles().salePrice}>{toPKR(salePrice)}</Text>}
                </View>
                {onAddToBag && (
                    <TouchableOpacity
                        onPress={onAddToBag}
                        style={{ marginTop: 6, backgroundColor: '#222', borderRadius: 20, paddingVertical: 6, alignItems: 'center' }}
                    >
                        <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>Add to Bag</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default ProductCard;
