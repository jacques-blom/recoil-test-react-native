import React from 'react'
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {atom, RecoilRoot, selector, useRecoilValue, useSetRecoilState} from '@jacques-blom/recoil'
import {company} from 'faker'
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context'

const itemsAtom = atom<string[]>({
    key: 'items',
    default: [],
})

const countSelector = selector({
    key: 'count',
    get: ({get}) => {
        return get(itemsAtom).length
    },
})

const Items = () => {
    const items = useRecoilValue(itemsAtom)
    const count = useRecoilValue(countSelector)

    return (
        <View>
            <Text style={{fontWeight: '500', fontSize: 20, marginBottom: 20}}>Items ({count}):</Text>
            {items.map((item, index) => (
                <Text key={index}>• {item}</Text>
            ))}
        </View>
    )
}

const AddButton = () => {
    const setItem = useSetRecoilState(itemsAtom)

    return (
        <TouchableOpacity
            onPress={() => setItem((i) => [...i, company.bsBuzz()])}
            style={{
                padding: 10,
                backgroundColor: '#00BFFF',
                height: 60,
                justifyContent: 'center',
            }}
        >
            <Text style={{textAlign: 'center', fontSize: 17, fontWeight: '600'}}>Add Item</Text>
        </TouchableOpacity>
    )
}

const HomeScreen = () => {
    const {top} = useSafeAreaInsets()

    return (
        <View style={{flex: 1}}>
            <ScrollView style={{flex: 1}} contentContainerStyle={{padding: 20, paddingTop: top + 20}}>
                <Items />
            </ScrollView>
            <AddButton />
        </View>
    )
}

export default function App() {
    return (
        <SafeAreaProvider>
            <RecoilRoot>
                <HomeScreen />
            </RecoilRoot>
        </SafeAreaProvider>
    )
}
