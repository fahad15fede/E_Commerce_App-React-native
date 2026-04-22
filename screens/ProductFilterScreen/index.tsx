import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useTheme, Button } from '@rneui/themed';
import { scale } from "react-native-size-matters";
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { styles } from './styles';
import AppContainer from '../../components/HOC/AppContainer';
import { colors, sizes, productCategories } from "../../data";
import PriceRange from './PriceRange';
import ColorSelection from './ColorSelection';
import SizeSelection from './SizeSelection';
import CategorySelection from './CategorySelection';
import { applyFilters, resetFilters } from '../../store/cartSlice';

const ProductFilter = ({ navigation }) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [low, setLow] = useState<number>(0);
    const [high, setHigh] = useState<number>(55600); // ~200 USD in PKR
    const [colorList, setColorList] = useState<any>(colors);
    const [sizeList, setSizeList] = useState<any>(sizes);
    const [currentCategory, setCurrentCategory] = useState<number>(0);

    const handleValueChange = useCallback((lowValue: number, highValue: number) => {
        setLow(lowValue);
        setHigh(highValue);
    }, []);

    const handleColorSelection = (index: number) => {
        setColorList(Object.assign([], colorList, { [index]: { color: colorList[index].color, selected: !colorList[index].selected } }));
    };

    const handleSizeSelection = (index: number) => {
        setSizeList(Object.assign([], sizeList, { [index]: { size: sizeList[index].size, selected: !sizeList[index].selected } }));
    };

    const handleApply = () => {
        dispatch(applyFilters({
            priceLow: low / 278,
            priceHigh: high / 278,
            colors: colorList.filter((c: any) => c.selected).map((c: any) => c.color),
            sizes: sizeList.filter((s: any) => s.selected).map((s: any) => s.size),
            category: productCategories[currentCategory],
        }) as any);
        navigation.goBack();
    };

    const handleDiscard = () => {
        dispatch(resetFilters() as any);
        navigation.goBack();
    };

    return (
        <>
            <AppContainer>
                <View style={styles.container}>
                    <PriceRange
                        title={t('common:priceRange')}
                        onValueChanged={handleValueChange}
                        low={low}
                        high={high}
                        min={0}
                        max={55600}
                    />
                    <ColorSelection
                        title={t('common:colors')}
                        colors={colorList}
                        onColorSelection={handleColorSelection}
                    />
                    <SizeSelection
                        title={t('common:sizes')}
                        sizes={sizeList}
                        onSizeSelection={handleSizeSelection}
                    />
                    <CategorySelection
                        title={t('common:category')}
                        categories={productCategories}
                        currentCategory={currentCategory}
                        onCategorySelection={setCurrentCategory}
                    />
                </View>
            </AppContainer>
            <View style={styles.bottom}>
                <View style={[styles.horizontalContainer, { justifyContent: 'space-between' }]}>
                    <Button
                        title={t('common:discard')}
                        onPress={handleDiscard}
                        style={{ width: scale(155) }}
                        buttonStyle={[styles.button, { borderColor: theme.colors.black }]}
                        titleStyle={{ color: theme.colors.black, fontWeight: '500' }}
                    />
                    <Button
                        title={t('common:apply')}
                        onPress={handleApply}
                        style={{ width: scale(155) }}
                    />
                </View>
            </View>
        </>
    );
}


export default ProductFilter;