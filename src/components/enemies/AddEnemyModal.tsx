import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, EnemyTypeColors } from '../../theme';
import { useTranslations } from '../../i18n';
import { useEnemyManager } from '../../context';
import type { EnemyType } from '../../types';

interface AddEnemyModalProps {
  visible: boolean;
  onClose: () => void;
}

const ENEMY_TYPES: { value: EnemyType; emoji: string }[] = [
  { value: 'normal', emoji: '👤' },
  { value: 'elite', emoji: '⭐' },
  { value: 'boss', emoji: '👑' },
  { value: 'objective', emoji: '🎯' },
];

export default function AddEnemyModal({ visible, onClose }: AddEnemyModalProps) {
  const t = useTranslations();
  const { addEnemy } = useEnemyManager();

  const [name, setName] = useState('');
  const [health, setHealth] = useState('10');
  const [quantity, setQuantity] = useState(1);
  const [type, setType] = useState<EnemyType>('normal');

  const handleConfirm = () => {
    if (!name.trim()) return;
    const hp = parseInt(health) || 10;
    addEnemy(name.trim(), Math.max(1, hp), type, quantity);
    // Reset form
    setName('');
    setHealth('10');
    setQuantity(1);
    setType('normal');
    onClose();
  };

  const handleCancel = () => {
    setName('');
    setHealth('10');
    setQuantity(1);
    setType('normal');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.7)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ width: '100%', maxWidth: 400 }}
        >
          <View
            style={{
              backgroundColor: Colors.bg.dark,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: Colors.border.default,
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
                <Ionicons name="add" size={20} color={Colors.gold[400]} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: Colors.text.primary,
                  }}
                >
                  {t['em.modal.title']}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: Colors.text.muted,
                    marginTop: 1,
                  }}
                >
                  {t['em.modal.subtitle']}
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleCancel}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                accessibilityLabel={t['em.modal.close']}
              >
                <Ionicons name="close" size={20} color={Colors.text.muted} />
              </TouchableOpacity>
            </View>

            {/* Body */}
            <ScrollView
              style={{ padding: 16, maxHeight: 400 }}
              showsVerticalScrollIndicator={false}
            >
              {/* Name */}
              <View style={{ marginBottom: 16 }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: Colors.text.secondary,
                    marginBottom: 6,
                  }}
                >
                  📛 {t['em.modal.name']}
                </Text>
                <TextInput
                  style={{
                    backgroundColor: Colors.bg.medium,
                    borderWidth: 1,
                    borderColor: Colors.border.default,
                    borderRadius: 8,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    color: Colors.text.primary,
                    fontSize: 14,
                  }}
                  value={name}
                  onChangeText={setName}
                  placeholder={t['em.modal.namePlaceholder']}
                  placeholderTextColor={Colors.text.muted}
                  autoFocus
                />
              </View>

              {/* Health */}
              <View style={{ marginBottom: 16 }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: Colors.text.secondary,
                    marginBottom: 6,
                  }}
                >
                  ❤️ {t['em.modal.health']}
                </Text>
                <TextInput
                  style={{
                    backgroundColor: Colors.bg.medium,
                    borderWidth: 1,
                    borderColor: Colors.border.default,
                    borderRadius: 8,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    color: Colors.text.primary,
                    fontSize: 14,
                  }}
                  value={health}
                  onChangeText={setHealth}
                  keyboardType="numeric"
                />
              </View>

              {/* Quantity */}
              <View style={{ marginBottom: 16 }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: Colors.text.secondary,
                    marginBottom: 6,
                  }}
                >
                  👥 {t['em.modal.quantity']}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 16,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      backgroundColor: Colors.bg.medium,
                      borderWidth: 1,
                      borderColor: Colors.border.default,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    accessibilityLabel={t['em.modal.quantityDecrease']}
                  >
                    <Ionicons name="remove" size={20} color={Colors.text.secondary} />
                  </TouchableOpacity>

                  <View style={{ alignItems: 'center' }}>
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: '700',
                        color: Colors.text.primary,
                      }}
                    >
                      {quantity}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: Colors.text.muted,
                      }}
                    >
                      {t['em.modal.quantityLabel']}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => setQuantity(Math.min(20, quantity + 1))}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      backgroundColor: Colors.bg.medium,
                      borderWidth: 1,
                      borderColor: Colors.border.default,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    accessibilityLabel={t['em.modal.quantityIncrease']}
                  >
                    <Ionicons name="add" size={20} color={Colors.text.secondary} />
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    fontSize: 11,
                    color: Colors.text.muted,
                    textAlign: 'center',
                    marginTop: 6,
                  }}
                >
                  {t['em.modal.quantityHint']}
                </Text>
              </View>

              {/* Enemy Type */}
              <View style={{ marginBottom: 8 }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: Colors.text.secondary,
                    marginBottom: 6,
                  }}
                >
                  🎭 {t['em.modal.type']}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 8,
                  }}
                >
                  {ENEMY_TYPES.map((et) => {
                    const isSelected = type === et.value;
                    const colors = EnemyTypeColors[et.value];
                    return (
                      <TouchableOpacity
                        key={et.value}
                        onPress={() => setType(et.value)}
                        style={{
                          flex: 1,
                          minWidth: 70,
                          paddingVertical: 10,
                          paddingHorizontal: 8,
                          borderRadius: 8,
                          backgroundColor: isSelected
                            ? colors.bg
                            : Colors.bg.medium,
                          borderWidth: 2,
                          borderColor: isSelected
                            ? colors.border
                            : Colors.border.subtle,
                          alignItems: 'center',
                        }}
                      >
                        <Text style={{ fontSize: 20, marginBottom: 2 }}>
                          {et.emoji}
                        </Text>
                        <Text
                          style={{
                            fontSize: 11,
                            fontWeight: '600',
                            color: isSelected
                              ? colors.text
                              : Colors.text.muted,
                          }}
                        >
                          {t[`type.${et.value}` as keyof typeof t]}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </ScrollView>

            {/* Footer */}
            <View
              style={{
                flexDirection: 'row',
                padding: 16,
                gap: 10,
                borderTopWidth: 1,
                borderTopColor: Colors.border.subtle,
              }}
            >
              <TouchableOpacity
                onPress={handleCancel}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 8,
                  backgroundColor: Colors.bg.medium,
                  borderWidth: 1,
                  borderColor: Colors.border.default,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: Colors.text.secondary,
                  }}
                >
                  {t['em.modal.cancel']}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleConfirm}
                disabled={!name.trim()}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 8,
                  backgroundColor: name.trim()
                    ? Colors.gold[600]
                    : Colors.bg.medium,
                  borderWidth: 1,
                  borderColor: name.trim()
                    ? Colors.gold[500]
                    : Colors.border.subtle,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 6,
                  opacity: name.trim() ? 1 : 0.5,
                }}
              >
                <Ionicons
                  name="add"
                  size={18}
                  color={name.trim() ? Colors.text.dark : Colors.text.muted}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: name.trim() ? Colors.text.dark : Colors.text.muted,
                  }}
                >
                  {t['em.modal.confirm']}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
