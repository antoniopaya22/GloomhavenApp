import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../theme';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import EnemyManager from '../components/enemies/EnemyManager';
import AddEnemyModal from '../components/enemies/AddEnemyModal';
import HelpModal from '../components/modals/HelpModal';
import SettingsModal from '../components/modals/SettingsModal';

export default function HomeScreen() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg.darkest }}>
      <StatusBar style="light" />

      <SafeAreaView
        style={{ flex: 1, backgroundColor: Colors.bg.darkest }}
        edges={['top']}
      >
        {/* Header */}
        <Header
          onHelpPress={() => setShowHelpModal(true)}
          onSettingsPress={() => setShowSettingsModal(true)}
        />

        {/* Main Content */}
        <EnemyManager onAddPress={() => setShowAddModal(true)} />

        {/* Footer */}
        <Footer />
      </SafeAreaView>

      {/* Modals */}
      <AddEnemyModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
      <HelpModal
        visible={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />
      <SettingsModal
        visible={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
    </View>
  );
}
