import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';
import { useTranslations } from '../../i18n';
import { useEnemyManager } from '../../context';
import EnemyCard from './EnemyCard';

interface EnemyManagerProps {
  onAddPress: () => void;
}

export default function EnemyManager({ onAddPress }: EnemyManagerProps) {
  const t = useTranslations();
  const { enemies, totalEnemies, totalHp, clearAllEnemies, collapseAll } =
    useEnemyManager();

  const allCollapsed = enemies.length > 0 && enemies.every((e) => e.isCollapsed);

  return (
    <View style={{ flex: 1 }}>
      {/* Compact Toolbar */}
      <View
        style={{
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderBottomWidth: 1,
          borderBottomColor: Colors.border.subtle,
          backgroundColor: Colors.bg.darker,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {/* Left: Title + Inline Stats */}
        <Ionicons
          name="skull-outline"
          size={16}
          color={Colors.gold[400]}
          style={{ marginRight: 6 }}
        />
        <Text
          style={{
            fontSize: 14,
            fontWeight: '700',
            color: Colors.text.primary,
            marginRight: 10,
          }}
          numberOfLines={1}
        >
          {t['em.title']}
        </Text>

        {/* Inline Stats Badges */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            marginRight: 'auto',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(212,175,55,0.12)',
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 4,
              gap: 3,
            }}
          >
            <Ionicons name="people" size={11} color={Colors.gold[400]} />
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                color: Colors.gold[400],
              }}
            >
              {totalEnemies}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(220,69,69,0.12)',
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 4,
              gap: 3,
            }}
          >
            <Ionicons name="heart" size={11} color={Colors.red[400]} />
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                color: Colors.red[400],
              }}
            >
              {totalHp}
            </Text>
          </View>
        </View>

        {/* Right: Icon-only Action Buttons */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          {/* Clear All */}
          <TouchableOpacity
            onPress={clearAllEnemies}
            disabled={enemies.length === 0}
            style={{
              width: 30,
              height: 30,
              borderRadius: 6,
              backgroundColor: enemies.length > 0
                ? Colors.red[800]
                : Colors.bg.medium,
              borderWidth: 1,
              borderColor: enemies.length > 0
                ? Colors.red[600]
                : Colors.border.subtle,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: enemies.length > 0 ? 1 : 0.4,
            }}
            accessibilityLabel={t['em.clear']}
          >
            <Ionicons
              name="trash-outline"
              size={14}
              color={enemies.length > 0 ? Colors.red[400] : Colors.text.muted}
            />
          </TouchableOpacity>

          {/* Collapse/Expand All */}
          <TouchableOpacity
            onPress={collapseAll}
            disabled={enemies.length === 0}
            style={{
              width: 30,
              height: 30,
              borderRadius: 6,
              backgroundColor: Colors.bg.medium,
              borderWidth: 1,
              borderColor: Colors.border.default,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: enemies.length > 0 ? 1 : 0.4,
            }}
            accessibilityLabel={allCollapsed ? t['em.expand'] : t['em.collapse']}
          >
            <Ionicons
              name={allCollapsed ? 'expand-outline' : 'contract-outline'}
              size={14}
              color={Colors.text.secondary}
            />
          </TouchableOpacity>

          {/* Add Enemy */}
          <TouchableOpacity
            onPress={onAddPress}
            style={{
              width: 30,
              height: 30,
              borderRadius: 6,
              backgroundColor: Colors.gold[600],
              alignItems: 'center',
              justifyContent: 'center',
            }}
            accessibilityLabel={t['em.addEnemy']}
          >
            <Ionicons name="add" size={18} color={Colors.text.dark} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      {enemies.length === 0 ? (
        /* Empty State */
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              borderWidth: 2,
              borderColor: Colors.border.subtle,
              borderStyle: 'dashed',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12,
            }}
          >
            <Ionicons
              name="skull-outline"
              size={28}
              color={Colors.text.muted}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: Colors.text.secondary,
              marginBottom: 6,
              textAlign: 'center',
            }}
          >
            {t['em.empty.title']}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: Colors.text.muted,
              textAlign: 'center',
              marginBottom: 16,
              lineHeight: 18,
              maxWidth: 260,
            }}
          >
            {t['em.empty.text']}
          </Text>
          <TouchableOpacity
            onPress={onAddPress}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 8,
              backgroundColor: Colors.gold[600],
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Ionicons name="add" size={18} color={Colors.text.dark} />
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                color: Colors.text.dark,
              }}
            >
              {t['em.empty.button']}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* Enemies List */
        <FlatList
          data={enemies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EnemyCard enemy={item} />}
          contentContainerStyle={{
            padding: 10,
            paddingBottom: 20,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
