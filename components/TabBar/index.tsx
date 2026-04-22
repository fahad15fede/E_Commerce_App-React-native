
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@rneui/themed';
import { useSelector } from 'react-redux';
import { styles } from './styles';
import SvgIcon from '../../components/SvgIcon';
import { TAB_BAR_HEIGHT } from '../../constants';
import { IRootState } from '../../store';

type TabBarProps = {
    style?: {[key: string]: any};
    navigation?: any;
    height?: number;
    state: any;
    descriptors: any;
};

const TabBar = (props: TabBarProps) => {
    const {
        style,
        navigation,
        height = TAB_BAR_HEIGHT,
        state,
        descriptors
    } = props;

    const bagCount = useSelector((state: IRootState) =>
        state.cart.bag.reduce((sum, item) => sum + item.quantity, 0)
    );

    const onPress = (route, isFocused) => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
        }
    };
    const onLongPress = (route) => {
        navigation.emit({
            type: 'tabLongPress',
            target: route.key,
        });
    };


    return (
        <View style={[styles(height).container, style]}>
            <View style={styles().content}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;
                    return (
                        <TouchableOpacity
                            style={styles().navItem}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={() => onPress(route, isFocused)}
                            onLongPress={() => onLongPress(route)}
                            key={index}
                        >
                            <View style={styles().center}>
                                <View>
                                    <SvgIcon name={label.toLowerCase()} color={isFocused ? '#2563EB' : '#9B9B9B'} isFocused={isFocused} width={30} height={30} />
                                    {label.toLowerCase() === 'bag' && bagCount > 0 && (
                                        <View style={{
                                            position: 'absolute', top: -4, right: -6,
                                            backgroundColor: '#2563EB', borderRadius: 10,
                                            minWidth: 18, height: 18, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 3
                                        }}>
                                            <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>{bagCount}</Text>
                                        </View>
                                    )}
                                </View>
                                <Text style={[styles().navText, { color: isFocused ? '#2563EB' : '#9B9B9B' }]}>
                                    {label}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    );
}


export default TabBar;