import React, { useState } from 'react';
import { View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@rneui/themed';
import { styles } from './styles';

const Profile = () => {
    const [username, setUsername] = useState('john_doe');
    const [email, setEmail] = useState('john@example.com');
    const [phone, setPhone] = useState('+1 234 567 8900');
    const [address, setAddress] = useState('123 Main St, New York');

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>J</Text>
            </View>
            <Text style={styles.name}>{username}</Text>

            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={styles.label}>Phone</Text>
            <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone number"
                keyboardType="phone-pad"
            />

            <Text style={styles.label}>Address</Text>
            <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                placeholder="Address"
            />

            <TouchableOpacity style={styles.saveBtn} onPress={() => {}}>
                <Text style={styles.saveBtnText}>Save Changes</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Profile;
