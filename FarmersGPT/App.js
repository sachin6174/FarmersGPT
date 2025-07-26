import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';

export default function App() {
  const [selectedTab, setSelectedTab] = useState('home');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState(null);

  const crops = ['Rice (ಅಕ್ಕಿ)', 'Wheat (ಗೋಧಿ)', 'Cotton (ಹತ್ತಿ)', 'Tomato (ಟೊಮೇಟೊ)'];

  const simulateDiagnosis = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDiagnosisResult({
        disease: 'Late Blight',
        confidence: 94,
        treatment: 'Apply copper-based fungicide spray every 7-10 days',
        kannadaName: 'ತಡವಾದ ಬ್ಲೈಟ್',
      });
      setIsLoading(false);
    }, 2000);
  };

  const renderHome = () => (
    <ScrollView style={styles.content}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>AI-powered farming solutions</Text>
        <Text style={styles.heroSubtitle}>
          Bringing cutting-edge AI technology to Indian agriculture
        </Text>
        <TouchableOpacity style={styles.primaryButton} onPress={() => setSelectedTab('diagnosis')}>
          <Text style={styles.primaryButtonText}>Get Started Today</Text>
        </TouchableOpacity>
      </View>

      {/* Feature Cards */}
      <View style={styles.featuresContainer}>
        <TouchableOpacity 
          style={styles.featureCard} 
          onPress={() => setSelectedTab('diagnosis')}
        >
          <Text style={styles.featureIcon}>📱</Text>
          <Text style={styles.featureTitle}>Leaf Diagnosis</Text>
          <Text style={styles.featureDescription}>AI-powered crop analysis</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.featureCard} onPress={() => setSelectedTab('prices')}>
          <Text style={styles.featureIcon}>📈</Text>
          <Text style={styles.featureTitle}>Market Prices</Text>
          <Text style={styles.featureDescription}>Real-time crop rates</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.featureCard} onPress={() => setSelectedTab('assistant')}>
          <Text style={styles.featureIcon}>🤖</Text>
          <Text style={styles.featureTitle}>AI Assistant</Text>
          <Text style={styles.featureDescription}>Ask in Kannada</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>10K+</Text>
          <Text style={styles.statLabel}>Farmers Joined</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>95%</Text>
          <Text style={styles.statLabel}>Accuracy Rate</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>24/7</Text>
          <Text style={styles.statLabel}>AI Support</Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderDiagnosis = () => (
    <ScrollView style={styles.content}>
      <Text style={styles.sectionTitle}>Crop Diagnosis</Text>
      
      <TouchableOpacity style={styles.uploadCard} onPress={simulateDiagnosis}>
        <Text style={styles.uploadIcon}>📷</Text>
        <Text style={styles.uploadText}>Take Photo of Plant</Text>
        <Text style={styles.uploadSubtext}>AI will analyze the image</Text>
      </TouchableOpacity>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Analyzing image...</Text>
        </View>
      )}

      {diagnosisResult && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Diagnosis Result</Text>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Disease:</Text>
            <Text style={styles.resultValue}>{diagnosisResult.disease}</Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Kannada:</Text>
            <Text style={styles.resultValue}>{diagnosisResult.kannadaName}</Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Confidence:</Text>
            <Text style={styles.resultValue}>{diagnosisResult.confidence}%</Text>
          </View>
          <Text style={styles.treatmentLabel}>Treatment:</Text>
          <Text style={styles.treatmentText}>{diagnosisResult.treatment}</Text>
        </View>
      )}
    </ScrollView>
  );

  const renderPrices = () => (
    <ScrollView style={styles.content}>
      <Text style={styles.sectionTitle}>Market Prices</Text>
      
      {crops.map((crop, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.cropCard}
          onPress={() => Alert.alert('Price Info', `${crop}: ₹2,450/quintal (+5.2%)`)}
        >
          <Text style={styles.cropName}>{crop}</Text>
          <Text style={styles.cropPrice}>₹2,450/quintal</Text>
          <Text style={styles.cropChange}>+5.2%</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderAssistant = () => (
    <ScrollView style={styles.content}>
      <Text style={styles.sectionTitle}>AI Assistant</Text>
      
      <View style={styles.chatContainer}>
        <View style={styles.exampleMessage}>
          <Text style={styles.kannadaText}>"ನನ್ನ ಟೊಮೇಟೊ ಗಿಡದಲ್ಲಿ ಹಳದಿ ಎಲೆಗಳು ಕಾಣುತ್ತಿವೆ"</Text>
          <Text style={styles.englishText}>My tomato plant has yellow leaves</Text>
        </View>
        
        <TextInput 
          style={styles.chatInput}
          placeholder="Ask your farming question in Kannada..."
          multiline
        />
        
        <TouchableOpacity style={styles.voiceButton}>
          <Text style={styles.voiceButtonText}>🎤 Voice Input</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 'home':
        return renderHome();
      case 'diagnosis':
        return renderDiagnosis();
      case 'prices':
        return renderPrices();
      case 'assistant':
        return renderAssistant();
      default:
        return renderHome();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌱 Project Kisan</Text>
      </View>

      {/* Content */}
      {renderContent()}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navItem, selectedTab === 'home' && styles.navItemActive]}
          onPress={() => setSelectedTab('home')}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, selectedTab === 'diagnosis' && styles.navItemActive]}
          onPress={() => setSelectedTab('diagnosis')}
        >
          <Text style={styles.navIcon}>📱</Text>
          <Text style={styles.navLabel}>Diagnosis</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, selectedTab === 'prices' && styles.navItemActive]}
          onPress={() => setSelectedTab('prices')}
        >
          <Text style={styles.navIcon}>📈</Text>
          <Text style={styles.navLabel}>Prices</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, selectedTab === 'assistant' && styles.navItemActive]}
          onPress={() => setSelectedTab('assistant')}
        >
          <Text style={styles.navIcon}>🤖</Text>
          <Text style={styles.navLabel}>Assistant</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#059669',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  hero: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#1f2937',
  },
  heroSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#f3f4f6',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  featureIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#1f2937',
  },
  featureDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
  },
  statCard: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#1f2937',
  },
  uploadCard: {
    backgroundColor: '#f0fdf4',
    padding: 40,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#bbf7d0',
    borderStyle: 'dashed',
  },
  uploadIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 5,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#6b7280',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#059669',
  },
  resultCard: {
    backgroundColor: '#fef3c7',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#fbbf24',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#92400e',
  },
  resultRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400e',
    width: 80,
  },
  resultValue: {
    fontSize: 14,
    color: '#92400e',
    flex: 1,
  },
  treatmentLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400e',
    marginTop: 10,
    marginBottom: 5,
  },
  treatmentText: {
    fontSize: 14,
    color: '#92400e',
    lineHeight: 20,
  },
  cropCard: {
    backgroundColor: '#f9fafb',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cropName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  cropPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
  },
  cropChange: {
    fontSize: 14,
    color: '#10b981',
    marginLeft: 10,
  },
  chatContainer: {
    marginTop: 20,
  },
  exampleMessage: {
    backgroundColor: '#e0e7ff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  kannadaText: {
    fontSize: 16,
    color: '#3730a3',
    marginBottom: 5,
  },
  englishText: {
    fontSize: 14,
    color: '#6366f1',
  },
  chatInput: {
    backgroundColor: '#f9fafb',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d1d5db',
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  voiceButton: {
    backgroundColor: '#8b5cf6',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  voiceButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  navItemActive: {
    backgroundColor: '#ecfdf5',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '500',
  },
});
