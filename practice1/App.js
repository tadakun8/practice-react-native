import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, ActivityIndicator, FlatList, TextInput, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview'
import DateTimePicker from '@react-native-community/datetimepicker';
import Clipboard from 'expo-clipboard'

export default function App() {
  const showWarning = (message) => {
    console.warn(message)
  };

  const data = [
    {str:'GuidovanRossum',key:'Guido'},
    {str:'MatsumotoYukihiro',key:'Matz'},
    {str:'RasmusLerdorf',key:'Rasmus'}
  ]

  const onChange = (e, selectedDate) => {
    setDate(selectedDate)
  } 

  const [text, setText] = useState('')
  const [date, setDate] = useState(new Date())

  const copyToClipBoard = () => {
    Clipboard.setString(text)
  }

  const getClipBoardText = async () => {
    const text = await Clipboard.getStringAsync()
    setText(text)
  }

  // Dimensionsの使い方
  // 画面幅を取得したい場合に使用
  const { width, height, scale } = Dimensions.get('window')

  // ネットワーク通信
  const [threads, setThreads] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    fetch('https://www.reddit.com/r/newsokur/hot.json')
      .then(response => response.json())
      .then(response => {
        let threads = response.data.children
        threads = response.data.children.map(item => {
          item.key = item.data.url
          return item
        })
        setThreads(threads)
        setIsLoading(false)
      })
      .catch(err => {
        console.warn(err)
      })
  }, [])
  return (
    /**
     * View / Text / Imageの使い方
     * - View : 要素の表示
     * - Text : テキストの表示
     * - Image : 画像の表示 _ 幅と高さを設定しないと表示されない
     */
    // <View style={styles.container}>
    //   {/* <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" /> */}
    //   {/* <Image 
    //     style={{
    //       width: 64,
    //       height: 64
    //     }}
    //     source={{uri: 'https://1.bp.blogspot.com/-QFEyMUUrYgM/X9QSNE27xvI/AAAAAAABcyY/iKgL_r2ZNpc4RHXxnuBt88NzTiCm8eX3QCNcBGAsYHQ/s883/pyoko_kagamimochi.png'}}
    //   /> */}
    // </View>
    
    /**
     * Buttunの使い方
     * - 原則としてButtonはstyleの適用ができない
     * - styleの適用をしたい場合、TouchbleOpacityを使用する
     */
    // <View style={{
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center'
    // }}>
    //   <Button 
    //     onPress={() => showWarning('pressed!')}
    //     title={'press'}
    //   />
    // </View>

    /**
     * TouchableOpacityの使い方
     * - Buttunではスタイルの適用ができない
     * - スタイルを適用したい場合、このコンポーネントで代用する
     * - タッチ時にイベント発火させる
     * - タッチ時に少し透明になる
     */
    // <View>
    //   <TouchableOpacity 
    //     onPress={() => {
    //       console.warn('pressed!')
    //     }}>
    //       <Image 
    //         style={{
    //           width: 64,
    //           height: 64
    //         }}
    //         source={require('./assets/sample1.png')}
    //       />
    //   </TouchableOpacity>
    // </View>


    /**
     * ActivityIndicatorの使い方
     * ローディングのくるくる
     */
    // <View
    //   style={{
    //     paddingTop: 50
    //   }}
    // >
    //   <ActivityIndicator />
    // </View>

    /**
     * FlatListの使い方
     * itemの部分(関数の引数)は({item})とすること
     */
    // <View 
    // style={{
    //   paddingTop: 50
    // }}>
    //   <FlatList 
    //     data={data}
    //     renderItem={({item}) => {
    //       return (
    //         <Text key={item.key}>{item.str}</Text>
    //       )
    //     }}
    //   />
    // </View>

    /**
     * TextInputの使い方
     */
    // <View style={{
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: '#F5FCFF'
    // }}>
    //   <TextInput
    //     style={{
    //       width: '100%',
    //       borderBottomWidth: 1,
    //       borderBottomColor: '#ccc'
    //     }}
    //     onChangeText={(input) => {
    //       setText(input)
    //     }}
    //     // このvalueは入力値を表示する
    //     value={text}
    //   />
    //   <Text>{text}</Text>
    // </View>

    /**
     * WebViewの使い方
     * - 他のwebサイトを表示させたい場合に使用する
     * - Expoの場合はreact-native-webviewからの<WebView>を使う必要がある
     * - styleを厳密に定義するかscalesPageToFitをtrueにしないと表示されない
     * - htmlもレンダリングできるがbaseUrlに空のStringを入れないとandroidで文字化けする
     */
    // <WebView
    //   source={{uri: 'https://amazon.co.jp'}}
    //   scalesPageToFit={true}
    //   style={{
    //     marginTop: 20
    //   }}
    // />
    // <WebView
    //   source={{html: '<h1>あいうえお</h1>', baseUrl: ''}}
    //   style={{
    //     marginTop: 20
    //   }}
    //   scalesPageToFit={true}
    // />

    /**
     * DateTimePickerの使い方
     * - 日付を選ばせる時に使用する
     * - DatePickerIOSはdeprecatedになっている
     * - そのため@react-native-community/datetimepickerのDatetimePickerを利用する
     *     - これはios/Androidで使用可能
     */
    // <View>
    //   <DateTimePicker
    //     value={date}
    //     onChange={onChange}
    //     display='default'
    //     locale='ja'
    //   />
    //   <Text>
    //     {date.toString()}
    //   </Text>
    // </View>

    /**
     * ClipBoardの使い方
     * expoだと、expo-clipboardを使う必要がある
     */
    // <View style={{
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: '#F5FCFF'
    // }}>
    //   <TextInput 
    //     style={{
    //       width: '80%',
    //       textAlign: 'center',
    //       borderBottomWidth: 1,
    //       borderColor: '#ccc'
    //     }}
    //     value={text}
    //     onChangeText={(input) => {
    //       setText(input)
    //     }}
    //   />
    //   <Button 
    //     onPress={copyToClipBoard}
    //     title='Save to clipboard'
    //   />
    //   <Text>{ text }</Text>
    //   <Button 
    //     onPress={getClipBoardText}
    //     title='Get from clipboard'
    //   />
    // </View>

    /**
     * Dimensionsの使い方
     */
    // <View style={styles.container}>
    //   <Text>{"幅: " + width }</Text>
    //   <Text>{"高さ: " + height }</Text>
    //   {/* [TODO] scaleの意味(画面の倍率・・・？ピンチとかしたら変わるのか？) */}
    //   <Text>{"倍率: " + scale }</Text>
    // </View>

    /**
     * ネットワーク通信
     */
    <View style={styles.container}>
      {isLoading 
        ? 
          <ActivityIndicator />
        :
          <FlatList
            data={threads}
            renderItem={({item}) => {
              return (
                <View key={item.key} style={{
                  flex: 1,
                  flexDirection: 'row',
                  width: '100%'
                }}>
                  <Image source={{uri:item.data.thumbnail}} style={{
                    width: 50,
                    height: 50
                  }}/>
                  <Text style={{
                    width: width - 50
                  }}>
                    {item.data.title}
                  </Text>
                </View>
              )
            }}
          />
      }
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
