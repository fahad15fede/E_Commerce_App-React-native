import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';

type PriceRangeProps = {
    title: string;
    low: number;
    high: number;
    onValueChanged: (lowValue: number, highValue: number) => void;
    min?: number;
    max?: number;
};

const PriceRange = ({ title, low, high, onValueChanged, min = 0, max = 55600 }: PriceRangeProps) => {
    return (
        <>
            <Text style={styles.label}>{title}</Text>
            <View style={styles.row}>
                <View style={styles.inputWrap}>
                    <Text style={styles.hint}>Min (Rs)</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={String(low)}
                        onChangeText={(val) => {
                            const n = parseInt(val) || 0;
                            onValueChanged(Math.min(n, high), high);
                        }}
                    />
                </View>
                <Text style={styles.dash}>—</Text>
                <View style={styles.inputWrap}>
                    <Text style={styles.hint}>Max (Rs)</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={String(high)}
                        onChangeText={(val) => {
                            const n = parseInt(val) || 0;
                            onValueChanged(low, Math.max(n, low));
                        }}
                    />
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    label: { fontSize: 14, fontWeight: '600', marginBottom: 10 },
    row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    inputWrap: { flex: 1 },
    hint: { fontSize: 11, color: '#9B9B9B', marginBottom: 4 },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
        backgroundColor: '#fafafa',
    },
    dash: { fontSize: 18, color: '#9B9B9B', marginTop: 16 },
});

export default PriceRange;
