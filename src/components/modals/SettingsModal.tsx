import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Switch,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import { useI18n, useTranslations } from '../../i18n';
import { useEnemyManager } from '../../context';
import type { AppSettings } from '../../types';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function SettingsModal({ visible, onClose }: SettingsModalProps) {
  const t = useTranslations();
  const { lang, toggleLang } = useI18n();
  const { settings, updateSettings } = useEnemyManager();

  const settingItems: {
    key: keyof AppSettings;
    emoji: string;
    label: string;
    desc: string;
  }[] = [
    {
      key: 'confirmClear',
      emoji: '⚠️',
      label: t['settings.confirmClear.label'],
      desc: t['settings.confirmClear.desc'],
    },
    {
      key: 'autoRemoveDead',
      emoji: '💀',
      label: t['settings.autoRemove.label'],
      desc: t['settings.autoRemove.desc'],
    },
    {
      key: 'compactCards',
      emoji: '📏',
      label: t['settings.compact.label'],
      desc: t['settings.compact.desc'],
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.7)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
        }}
      >
        <View
          style={{
            backgroundColor: Colors.bg.dark,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: Colors.border.default,
            width: '100%',
            maxWidth: 420,
            maxHeight: '80%',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 16,
              backgroundColor: Colors.bg.darker,
              borderBottomWidth: 1,
              borderBottomColor: Colors.border.subtle,
            }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: `${Colors.gold[500]}22`,
                borderWidth: 1,
                borderColor: Colors.gold[600],
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <Ionicons name="settings-outline" size={20} color={Colors.gold[400]} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: Colors.text.primary,
                }}
              >
                {t['settings.title']}
              </Text>
              <Text style={{ fontSize: 12, color: Colors.text.muted, marginTop: 1 }}>
                {t['settings.subtitle']}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: 'rgba(255,255,255,0.05)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              accessibilityLabel={t['settings.close']}
            >
              <Ionicons name="close" size={20} color={Colors.text.muted} />
            </TouchableOpacity>
          </View>

          {/* Body */}
          <ScrollView style={{ padding: 16 }}>
            {/* Language Switcher */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 14,
                borderBottomWidth: 1,
                borderBottomColor: Colors.border.subtle,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: Colors.text.primary,
                  }}
                >
                  🌐 {t['settings.language.label']}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: Colors.text.muted,
                    marginTop: 2,
                  }}
                >
                  {t['settings.language.desc']}
                </Text>
              </View>
              <TouchableOpacity
                onPress={toggleLang}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: Colors.bg.medium,
                  borderWidth: 1,
                  borderColor: Colors.border.default,
                  borderRadius: 8,
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    backgroundColor: lang === 'es' ? Colors.gold[600] : 'transparent',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '700',
                      color: lang === 'es' ? Colors.text.dark : Colors.text.muted,
                    }}
                  >
                    ES
                  </Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    backgroundColor: lang === 'en' ? Colors.gold[600] : 'transparent',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '700',
                      color: lang === 'en' ? Colors.text.dark : Colors.text.muted,
                    }}
                  >
                    EN
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {settingItems.map((item, idx) => (
              <View
                key={item.key}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 14,
                  borderBottomWidth: idx < settingItems.length - 1 ? 1 : 0,
                  borderBottomColor: Colors.border.subtle,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: Colors.text.primary,
                    }}
                  >
                    {item.emoji} {item.label}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: Colors.text.muted,
                      marginTop: 2,
                    }}
                  >
                    {item.desc}
                  </Text>
                </View>
                <Switch
                  value={settings[item.key]}
                  onValueChange={(value) => updateSettings(item.key, value)}
                  trackColor={{
                    false: Colors.bg.lighter,
                    true: Colors.gold[600],
                  }}
                  thumbColor={
                    settings[item.key] ? Colors.gold[300] : Colors.text.muted
                  }
                />
              </View>
            ))}
            <View style={{ height: 16 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
