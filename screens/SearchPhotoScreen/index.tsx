import React from 'react';
import { View, ImageBackground, Dimensions } from 'react-native';
import { useTheme } from '@rneui/themed';
import { styles } from './styles';
import ErrorBoundary from '../../components/HOC/ErrorBoundary';

const SearchPhoto = ({ route }) => {
    const { theme } = useTheme();
    const searchImage = route.params;
    const screenHeight = Dimensions.get('window').height;

    return (
        <View style={styles().container}>
            <View style={styles(screenHeight).imageContainer}>
                <ImageBackground source={searchImage} resizeMode="cover" style={styles().image} />
            </View>
        </View>
    );
};

export default ErrorBoundary(SearchPhoto);
