import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing, Dimensions } from 'react-native';
import { Colors } from '../../theme';
import GloomhavenLogo from '../brand/GloomhavenLogo';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

/**
 * Animated splash screen with the Gloomhaven logo.
 * Shows for at least 1 second, then fades out.
 */
export default function SplashScreen({ onFinish }: SplashScreenProps) {
  // Animation values
  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(15)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const lineWidth = useRef(new Animated.Value(0)).current;
  const versionOpacity = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Phase 1: Logo entrance (0 - 400ms)
    const logoEntrance = Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(glowOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]);

    // Phase 2: Title (400ms - 700ms)
    const titleEntrance = Animated.parallel([
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(titleTranslateY, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    // Phase 3: Decorative line + subtitle (700ms - 1000ms)
    const decorEntrance = Animated.parallel([
      Animated.timing(lineWidth, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false, // width can't use native driver
      }),
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(versionOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]);

    // Phase 4: Fade out (after 1.2s total)
    const fadeOut = Animated.timing(screenOpacity, {
      toValue: 0,
      duration: 400,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    });

    // Run the sequence
    Animated.sequence([
      logoEntrance,
      Animated.delay(50),
      titleEntrance,
      Animated.delay(50),
      decorEntrance,
      Animated.delay(400), // Hold for a moment
      fadeOut,
    ]).start(() => {
      onFinish();
    });
  }, []);

  const maxLineWidth = SCREEN_WIDTH * 0.4;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: Colors.bg.darkest,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
        opacity: screenOpacity,
      }}
    >
      {/* Ambient glow behind logo */}
      <Animated.View
        style={{
          position: 'absolute',
          width: 280,
          height: 280,
          borderRadius: 140,
          backgroundColor: Colors.gold[900],
          opacity: Animated.multiply(glowOpacity, new Animated.Value(0.25)),
        }}
      />

      {/* Logo */}
      <Animated.View
        style={{
          opacity: logoOpacity,
          transform: [{ scale: logoScale }],
          marginBottom: 24,
        }}
      >
        <GloomhavenLogo size={140} />
      </Animated.View>

      {/* Title */}
      <Animated.View
        style={{
          opacity: titleOpacity,
          transform: [{ translateY: titleTranslateY }],
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: '700',
            color: Colors.text.primary,
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          Gloomhaven
        </Text>
      </Animated.View>

      {/* Decorative line */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
          height: 12,
        }}
      >
        <Animated.View
          style={{
            height: 1,
            backgroundColor: Colors.gold[600],
            width: lineWidth.interpolate({
              inputRange: [0, 1],
              outputRange: [0, maxLineWidth],
            }),
            opacity: 0.6,
          }}
        />
        <Animated.Text
          style={{
            color: Colors.gold[500],
            fontSize: 10,
            marginHorizontal: 8,
            opacity: subtitleOpacity,
          }}
        >
          ◆
        </Animated.Text>
        <Animated.View
          style={{
            height: 1,
            backgroundColor: Colors.gold[600],
            width: lineWidth.interpolate({
              inputRange: [0, 1],
              outputRange: [0, maxLineWidth],
            }),
            opacity: 0.6,
          }}
        />
      </View>

      {/* Subtitle */}
      <Animated.View
        style={{
          opacity: subtitleOpacity,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: Colors.gold[500],
            letterSpacing: 4,
            textTransform: 'uppercase',
            fontWeight: '600',
          }}
        >
          Enemy Manager
        </Text>
      </Animated.View>

      {/* Version at bottom */}
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 48,
          opacity: versionOpacity,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 10,
            color: Colors.text.muted,
            letterSpacing: 1,
          }}
        >
          v1.0.0
        </Text>
      </Animated.View>
    </Animated.View>
  );
}
