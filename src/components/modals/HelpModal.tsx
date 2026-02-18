import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import { useTranslations } from '../../i18n';

interface HelpModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function HelpModal({ visible, onClose }: HelpModalProps) {
  const t = useTranslations();

  const sections = [
    {
      icon: '⚔️',
      title: t['help.addEnemies.title'],
      content: t['help.addEnemies.text'],
    },
    {
      icon: '🎭',
      title: t['help.types.title'],
      items: [
        { tag: `👤 ${t['type.normal']}`, desc: t['help.types.normal'], color: Colors.gold[500] },
        { tag: `⭐ ${t['type.elite']}`, desc: t['help.types.elite'], color: Colors.purple[400] },
        { tag: `👑 ${t['type.boss']}`, desc: t['help.types.boss'], color: Colors.red[400] },
        { tag: `🎯 ${t['type.objective']}`, desc: t['help.types.objective'], color: Colors.blue[400] },
      ],
    },
    {
      icon: '❤️',
      title: t['help.health.title'],
      content: t['help.health.text'],
    },
    {
      icon: '📋',
      title: t['help.statuses.title'],
      items: [
        { tag: '☠️', desc: t['help.statuses.poison'] },
        { tag: '🩸', desc: t['help.statuses.wound'] },
        { tag: '⛓️', desc: t['help.statuses.immobilize'] },
        { tag: '🚫', desc: t['help.statuses.disarm'] },
        { tag: '💫', desc: t['help.statuses.stun'] },
        { tag: '🌀', desc: t['help.statuses.muddle'] },
        { tag: '💪', desc: t['help.statuses.strengthen'] },
        { tag: '🛡️', desc: t['help.statuses.shield'] },
      ],
    },
    {
      icon: '🔢',
      title: t['help.numbering.title'],
      content: t['help.numbering.text'],
    },
    {
      icon: '🎮',
      title: t['help.controls.title'],
      items: [
        { desc: t['help.controls.collapse'] },
        { desc: t['help.controls.duplicate'] },
        { desc: t['help.controls.delete'] },
      ],
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
            maxHeight: '85%',
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
                backgroundColor: `${Colors.blue[500]}22`,
                borderWidth: 1,
                borderColor: Colors.blue[500],
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <Ionicons name="help-circle-outline" size={20} color={Colors.blue[400]} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: Colors.text.primary,
                }}
              >
                {t['help.title']}
              </Text>
              <Text style={{ fontSize: 12, color: Colors.text.muted, marginTop: 1 }}>
                {t['help.subtitle']}
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
              accessibilityLabel={t['help.close']}
            >
              <Ionicons name="close" size={20} color={Colors.text.muted} />
            </TouchableOpacity>
          </View>

          {/* Body */}
          <ScrollView
            style={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {sections.map((section, idx) => (
              <View
                key={idx}
                style={{
                  marginBottom: 16,
                  padding: 12,
                  backgroundColor: Colors.bg.medium,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: Colors.border.subtle,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: Colors.text.primary,
                    marginBottom: 8,
                  }}
                >
                  {section.icon} {section.title}
                </Text>
                {section.content && (
                  <Text
                    style={{
                      fontSize: 13,
                      color: Colors.text.secondary,
                      lineHeight: 20,
                    }}
                  >
                    {section.content}
                  </Text>
                )}
                {section.items?.map((item, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: 'row',
                      marginBottom: i < section.items!.length - 1 ? 6 : 0,
                    }}
                  >
                    {'tag' in item && item.tag && (
                      <Text style={{
                        fontSize: 13,
                        marginRight: 6,
                        minWidth: 28,
                        color: 'color' in item && item.color ? item.color : Colors.text.secondary,
                      }}>
                        {item.tag}
                      </Text>
                    )}
                    <Text
                      style={{
                        fontSize: 13,
                        color: Colors.text.secondary,
                        flex: 1,
                        lineHeight: 20,
                      }}
                    >
                      {item.desc}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
            <View style={{ height: 16 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
