import React, {useEffect, useRef} from 'react';
import {Animated, StyleProp, ViewStyle} from 'react-native';

type AnimationType = 'fade' | 'slide-up' | 'slide-right' | 'scale';

type Props = {
	children: React.ReactNode;
	animationType?: AnimationType;
	delay?: number;
	duration?: number;
	index?: number;
	style?: StyleProp<ViewStyle>;
};

export const AnimatedWrapper: React.FC<Props> = ({
 children,
 animationType = 'fade',
 delay = 0,
 duration = 300,
 index = 0,
 style,
}) => {
	const opacity = useRef(new Animated.Value(0)).current;
	const translateY = useRef(new Animated.Value(20)).current;
	const translateX = useRef(new Animated.Value(20)).current;
	const scale = useRef(new Animated.Value(0.95)).current;
	
	useEffect(() => {
		const delayTotal = delay + index * 80;
		
		const animations: Animated.CompositeAnimation[] = [];
		
		if (animationType === 'fade') {
			animations.push(
				Animated.timing(opacity, {
					toValue: 1,
					duration,
					delay: delayTotal,
					useNativeDriver: true,
				})
			);
		}
		
		if (animationType === 'slide-up') {
			animations.push(
				Animated.timing(translateY, {
					toValue: 0,
					duration,
					delay: delayTotal,
					useNativeDriver: true,
				}),
				Animated.timing(opacity, {
					toValue: 1,
					duration,
					delay: delayTotal,
					useNativeDriver: true,
				})
			);
		}
		
		if (animationType === 'slide-right') {
			animations.push(
				Animated.timing(translateX, {
					toValue: 0,
					duration,
					delay: delayTotal,
					useNativeDriver: true,
				}),
				Animated.timing(opacity, {
					toValue: 1,
					duration,
					delay: delayTotal,
					useNativeDriver: true,
				})
			);
		}
		
		if (animationType === 'scale') {
			animations.push(
				Animated.timing(scale, {
					toValue: 1,
					duration,
					delay: delayTotal,
					useNativeDriver: true,
				}),
				Animated.timing(opacity, {
					toValue: 1,
					duration,
					delay: delayTotal,
					useNativeDriver: true,
				})
			);
		}
		
		Animated.parallel(animations).start();
	}, []);
	
	const getTransform = () => {
		switch (animationType) {
			case 'slide-up':
				return [{ translateY }];
			case 'slide-right':
				return [{ translateX }];
			case 'scale':
				return [{ scale }];
			default:
				return [];
		}
	};
	
	return (
		<Animated.View style={[{ opacity, transform: getTransform() }, style]}>
			{children}
		</Animated.View>
	);
};
