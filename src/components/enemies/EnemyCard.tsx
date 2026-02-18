import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, EnemyTypeColors, StatusEffects } from '../../theme';
import { useTranslations } from '../../i18n';
import { useEnemyManager } from '../../context';
import type { Enemy, StatusEffect } from '../../types';

interface EnemyCardProps {
  enemy: Enemy;
}

export default function EnemyCard({ enemy }: EnemyCardProps) {
  const t = useTranslations();
  const {
    removeEnemy,
    duplicateEnemy,
    updateEnemyHp,
    updateEnemyMaxHp,
    updateEnemyName,
    toggleStatus,
    toggleCollapse,
  } = useEnemyManager();

  const typeColors = EnemyTypeColors[enemy.type];
  const hpPercent = enemy.maxHp > 0 ? (enemy.currentHp / enemy.maxHp) * 100 : 0;

  const hpBarColor =
    hpPercent > 60
      ? Colors.green[500]
      : hpPercent > 30
      ? Colors.gold[500]
      : Colors.red[500];

  const typeLabel = t[`type.${enemy.type}` as keyof typeof t];
  const typeEmoji =
    enemy.type === 'normal'
      ? '👤'
      : enemy.type === 'elite'
      ? '⭐'
      : enemy.type === 'boss'
      ? '👑'
      : '🎯';

  return (
    <View
      style={{
        backgroundColor: typeColors.bg,
        borderWidth: 1,
        borderColor: typeColors.border,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 12,
      }}
    >
      {/* Card Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 10,
          backgroundColor: 'rgba(0,0,0,0.2)',
        }}
      >
        {/* Enemy Number Badge */}
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: typeColors.badge,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '700',
              color: Colors.text.dark,
            }}
          >
            {enemy.number}
          </Text>
        </View>

        {/* Name & Type */}
        <View style={{ flex: 1 }}>
          <TextInput
            style={{
              fontSize: 15,
              fontWeight: '600',
              color: Colors.text.primary,
              padding: 0,
              margin: 0,
            }}
            value={enemy.name}
            onChangeText={(text) => updateEnemyName(enemy.id, text)}
            placeholder={t['card.namePlaceholder']}
            placeholderTextColor={Colors.text.muted}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 2,
            }}
          >
            <Text style={{ fontSize: 11 }}>{typeEmoji} </Text>
            <Text
              style={{
                fontSize: 11,
                color: typeColors.text,
                fontWeight: '600',
              }}
            >
              {typeLabel}
            </Text>
          </View>
        </View>

        {/* Controls */}
        <View style={{ flexDirection: 'row', gap: 6 }}>
          <TouchableOpacity
            onPress={() => toggleCollapse(enemy.id)}
            style={{
              width: 30,
              height: 30,
              borderRadius: 6,
              backgroundColor: 'rgba(255,255,255,0.05)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            accessibilityLabel={t['card.collapse']}
          >
            <Ionicons
              name={enemy.isCollapsed ? 'chevron-down' : 'chevron-up'}
              size={16}
              color={Colors.text.secondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => duplicateEnemy(enemy.id)}
            style={{
              width: 30,
              height: 30,
              borderRadius: 6,
              backgroundColor: 'rgba(255,255,255,0.05)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            accessibilityLabel={t['card.duplicate']}
          >
            <Ionicons name="copy-outline" size={16} color={Colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => removeEnemy(enemy.id)}
            style={{
              width: 30,
              height: 30,
              borderRadius: 6,
              backgroundColor: 'rgba(220,69,69,0.15)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            accessibilityLabel={t['card.delete']}
          >
            <Ionicons name="trash-outline" size={16} color={Colors.red[400]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Health Bar */}
      <View
        style={{
          height: 4,
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}
      >
        <View
          style={{
            height: '100%',
            width: `${hpPercent}%`,
            backgroundColor: hpBarColor,
            borderRadius: 2,
          }}
        />
      </View>

      {/* Card Body - Collapsible */}
      {!enemy.isCollapsed && (
        <View style={{ padding: 12 }}>
          {/* Health Section */}
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 11,
                color: Colors.text.muted,
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                marginBottom: 8,
              }}
            >
              {t['card.hp']}
            </Text>

            {/* HP Display */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: '700',
                  color:
                    enemy.currentHp === 0
                      ? Colors.red[400]
                      : Colors.text.primary,
                }}
              >
                {enemy.currentHp}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: Colors.text.muted,
                  marginHorizontal: 4,
                }}
              >
                /
              </Text>
              <TextInput
                style={{
                  fontSize: 20,
                  color: Colors.text.secondary,
                  fontWeight: '600',
                  padding: 0,
                  minWidth: 30,
                  textAlign: 'center',
                }}
                value={String(enemy.maxHp)}
                onChangeText={(text) => {
                  const val = parseInt(text) || 1;
                  updateEnemyMaxHp(enemy.id, Math.max(1, Math.min(999, val)));
                }}
                keyboardType="numeric"
                accessibilityLabel={t['card.hpMax']}
              />
            </View>

            {/* HP Buttons */}
            <View style={{ flexDirection: 'row', gap: 6 }}>
              {/* Damage buttons */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  gap: 4,
                }}
              >
                {[-5, -2, -1].map((amount) => (
                  <TouchableOpacity
                    key={amount}
                    onPress={() => updateEnemyHp(enemy.id, amount)}
                    style={{
                      flex: 1,
                      paddingVertical: 8,
                      borderRadius: 6,
                      backgroundColor: Colors.red[800],
                      borderWidth: 1,
                      borderColor: Colors.red[600],
                      alignItems: 'center',
                    }}
                    accessibilityLabel={`${amount} ${t['js.hpAria']}`}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '700',
                        color: Colors.red[400],
                      }}
                    >
                      {amount}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Heal buttons */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  gap: 4,
                }}
              >
                {[1, 2, 5].map((amount) => (
                  <TouchableOpacity
                    key={amount}
                    onPress={() => updateEnemyHp(enemy.id, amount)}
                    style={{
                      flex: 1,
                      paddingVertical: 8,
                      borderRadius: 6,
                      backgroundColor: Colors.green[800],
                      borderWidth: 1,
                      borderColor: Colors.green[600],
                      alignItems: 'center',
                    }}
                    accessibilityLabel={`+${amount} ${t['js.hpAria']}`}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '700',
                        color: Colors.green[400],
                      }}
                    >
                      +{amount}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Divider */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 8,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: Colors.border.subtle,
              }}
            />
            <Text
              style={{
                color: Colors.gold[700],
                fontSize: 8,
                marginHorizontal: 8,
              }}
            >
              ◆
            </Text>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: Colors.border.subtle,
              }}
            />
          </View>

          {/* Status Effects */}
          {enemy.type !== 'objective' && (
            <View>
              {/* Negative statuses */}
              <Text
                style={{
                  fontSize: 10,
                  color: Colors.red[400],
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  marginBottom: 6,
                }}
              >
                ⚠️ {t['status.negative']}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 6,
                  marginBottom: 10,
                }}
              >
                {StatusEffects.negative.map((status) => {
                  const isActive = enemy.statuses.includes(status.key as StatusEffect);
                  return (
                    <TouchableOpacity
                      key={status.key}
                      onPress={() =>
                        toggleStatus(enemy.id, status.key as StatusEffect)
                      }
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 6,
                        backgroundColor: isActive
                          ? `${status.color}22`
                          : 'rgba(255,255,255,0.03)',
                        borderWidth: 1,
                        borderColor: isActive
                          ? status.color
                          : Colors.border.subtle,
                        opacity: isActive ? 1 : 0.6,
                      }}
                    >
                      <Text style={{ fontSize: 12 }}>
                        {status.emoji}{' '}
                        <Text
                          style={{
                            color: isActive
                              ? status.color
                              : Colors.text.muted,
                            fontSize: 11,
                            fontWeight: isActive ? '600' : '400',
                          }}
                        >
                          {t[`status.${status.key}` as keyof typeof t]}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Positive statuses */}
              <Text
                style={{
                  fontSize: 10,
                  color: Colors.green[400],
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  marginBottom: 6,
                }}
              >
                ✨ {t['status.positive']}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 6,
                }}
              >
                {StatusEffects.positive.map((status) => {
                  const isActive = enemy.statuses.includes(status.key as StatusEffect);
                  return (
                    <TouchableOpacity
                      key={status.key}
                      onPress={() =>
                        toggleStatus(enemy.id, status.key as StatusEffect)
                      }
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 6,
                        backgroundColor: isActive
                          ? `${status.color}22`
                          : 'rgba(255,255,255,0.03)',
                        borderWidth: 1,
                        borderColor: isActive
                          ? status.color
                          : Colors.border.subtle,
                        opacity: isActive ? 1 : 0.6,
                      }}
                    >
                      <Text style={{ fontSize: 12 }}>
                        {status.emoji}{' '}
                        <Text
                          style={{
                            color: isActive
                              ? status.color
                              : Colors.text.muted,
                            fontSize: 11,
                            fontWeight: isActive ? '600' : '400',
                          }}
                        >
                          {t[`status.${status.key}` as keyof typeof t]}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
