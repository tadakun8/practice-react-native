import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';

export default function Spining() {
  const animatedDegree = useRef(new Animated.Value(0))
  const _degree = animatedDegree.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
  const animated = () => {
    Animated.timing(
      animatedDegree.current,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start(() => {
      animatedDegree.current = new Animated.Value(0)
      animated()
    })
  }
  useEffect(() => {
    animated()
  }, [])

  return (
    <View>
      <Animated.Image 
        source={require('../assets/cat.png')}
        style={{transform: [{rotate: _degree}]}}
      />
    </View>
  )
}
