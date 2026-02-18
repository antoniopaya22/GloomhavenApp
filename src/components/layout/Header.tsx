import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import { useI18n } from '../../i18n';
import GloomhavenLogo from '../brand/GloomhavenLogo';

interface HeaderProps {
  onHelpPress: () => void;
  onSettingsPress: () => void;
}

export default function Header({ onHelpPress, onSettingsPress }: HeaderProps) {
  const { t } = useI18n();

  return (
    <View
      style={{
        backgroundColor: Colors.bg.darker,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border.default,
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      {/* Decorative top border */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: Colors.gold[600],
          opacity: 0.6,
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand */}
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          {/* Logo */}
          <View style={{ marginRight: 10 }}>
            <GloomhavenLogo size={38} />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: 'Cinzel',
                fontSize: 18,
                fontWeight: '700',
                color: Colors.text.primary,
                letterSpacing: 1,
              }}
              numberOfLines={1}
            >
              Gloomhaven
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 2,
              }}
            >
              <View
                style={{
                  height: 1,
                  flex: 1,
                  backgroundColor: Colors.gold[700],
                  maxWidth: 30,
                }}
              />
              <Text
                style={{
                  color: Colors.gold[500],
                  fontSize: 8,
                  marginHorizontal: 4,
                }}
              >
                ◆
              </Text>
              <View
                style={{
                  height: 1,
                  flex: 1,
                  backgroundColor: Colors.gold[700],
                  maxWidth: 30,
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 10,
                color: Colors.text.muted,
                letterSpacing: 0.5,
              }}
              numberOfLines={1}
            >
              {t['header.tagline']}
            </Text>
          </View>
        </View>

        {/* Actions */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <TouchableOpacity
            onPress={onHelpPress}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              backgroundColor: Colors.bg.medium,
              borderWidth: 1,
              borderColor: Colors.border.default,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            accessibilityLabel={t['header.help']}
          >
            <Ionicons name="help-circle-outline" size={20} color={Colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onSettingsPress}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              backgroundColor: Colors.bg.medium,
              borderWidth: 1,
              borderColor: Colors.border.default,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            accessibilityLabel={t['header.settings']}
          >
            <Ionicons name="settings-outline" size={20} color={Colors.text.secondary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
