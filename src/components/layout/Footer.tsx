import React from 'react';
import { View, Text } from 'react-native';
import { Colors } from '../../theme';

export default function Footer() {
  return (
    <View
      style={{
        backgroundColor: Colors.bg.darker,
        borderTopWidth: 1,
        borderTopColor: Colors.border.subtle,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 11, color: Colors.text.muted }}>
        © 2026 Antonio Payá González
      </Text>
    </View>
  );
}
