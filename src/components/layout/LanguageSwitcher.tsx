import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../theme';
import { useI18n } from '../../i18n';

export default function LanguageSwitcher() {
  const { lang, toggleLang } = useI18n();

  return (
    <TouchableOpacity
      onPress={toggleLang}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 6,
        backgroundColor: Colors.bg.medium,
        borderWidth: 1,
        borderColor: Colors.border.default,
        borderRadius: 6,
        gap: 4,
      }}
      accessibilityLabel={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <Text
        style={{
          fontSize: 11,
          fontWeight: '700',
          color: lang === 'es' ? Colors.gold[400] : Colors.text.muted,
          letterSpacing: 0.5,
        }}
      >
        ES
      </Text>
      <Text style={{ fontSize: 11, color: Colors.border.default }}>|</Text>
      <Text
        style={{
          fontSize: 11,
          fontWeight: '700',
          color: lang === 'en' ? Colors.gold[400] : Colors.text.muted,
          letterSpacing: 0.5,
        }}
      >
        EN
      </Text>
    </TouchableOpacity>
  );
}
