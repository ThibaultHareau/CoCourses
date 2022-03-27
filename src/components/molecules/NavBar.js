import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { Colors } from '../../styles/index';

const HomeHighlight = "../../assets/images/HomeHighlight.png";
const Home = '../../assets/images/Home.png';
const CatalogHighlight = '../../assets/images/BookHighlight.png';
const Catalog = '../../assets/images/Book.png';
const ProfileHighlight = '../../assets/images/AccountHighlight.png';
const Profile = '../../assets/images/Account.png';
const ScanHighlight = '../../assets/images/ScanHighlight.png';
const Scan = '../../assets/images/Scan.png';

export default function NavBar({ state, descriptors, navigation }) {
    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.bar}
                        activeOpacity={.9}
                        key={"Button"+label}
                    >
                        <Image source={(label == 'Accueil')?
                            (isFocused? require(HomeHighlight):require(Home))
                            : (label == 'Catalogue')?
                            (isFocused? require(CatalogHighlight):require(Catalog))
                            : (label == 'Profil')?
                            (isFocused? require(ProfileHighlight):require(Profile))
                            : (isFocused? require(ScanHighlight):require(Scan))}
                            style={styles.image} key={"Image"+label}/>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    bar: {
        flex: 1,
        height:65,
        backgroundColor: Colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height:40,
        resizeMode: 'contain'
    }
})