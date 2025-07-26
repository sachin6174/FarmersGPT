import React, { useState, useRef } from 'react';
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
  Modal,
  Dimensions,
  FlatList,
  Switch,
  Animated
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Registration fields
  const [regForm, setRegForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'farmer',
    state: '',
    farmSize: '',
    acceptTerms: false
  });

  const languages = ['English', 'Kannada', 'Hindi', 'Telugu', 'Tamil', 'Malayalam'];
  const crops = ['Rice (ಅಕ್ಕಿ)', 'Wheat (ಗೋಧಿ)', 'Cotton (ಹತ್ತಿ)', 'Tomato (ಟೊಮೇಟೊ)'];
  const states = ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Kerala', 'Maharashtra'];

  const simulateDiagnosis = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDiagnosisResult({
        disease: 'Late Blight',
        confidence: 94,
        treatment: 'Apply copper-based fungicide spray every 7-10 days',
        prevention: 'Ensure proper air circulation and avoid overhead watering',
        economicImpact: 'Can reduce yield by 30-50% if left untreated',
        kannadaName: 'ತಡವಾದ ಬ್ಲೈಟ್',
        hindiName: 'देर से आने वाला ब्लाइट',
        treatment_kannada: 'ತಾಮ್ರ ಆಧಾರಿತ ಶಿಲೀಂಧ್ರನಾಶಕವನ್ನು ಪ್ರತಿ 7-10 ದಿನಗಳಿಗೊಮ್ಮೆ ಸಿಂಪಡಿಸಿ'
      });
      setIsLoading(false);
    }, 3000);
  };

  const handleImageUpload = () => {
    Alert.alert(
      'Select Image Source',
      'Choose how you want to upload the image',
      [
        { text: 'Camera', onPress: () => simulateImageCapture('camera') },
        { text: 'Gallery', onPress: () => simulateImageCapture('gallery') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const simulateImageCapture = (source) => {
    setUploadedImage('https://via.placeholder.com/300x300/16a34a/ffffff?text=Plant+Leaf');
    simulateDiagnosis();
  };

  const handleLogin = () => {
    if (email && password) {
      setIsAuthenticated(true);
      setUserProfile({
        name: 'Ramesh Kumar',
        email: email,
        role: 'farmer',
        state: 'Karnataka',
        farmSize: '5 acres'
      });
      setCurrentScreen('home');
      Alert.alert('Success', 'Logged in successfully!');
    } else {
      Alert.alert('Error', 'Please enter email and password');
    }
  };

  const handleSignup = () => {
    if (regForm.name && regForm.email && regForm.password && regForm.acceptTerms) {
      setIsAuthenticated(true);
      setUserProfile({
        name: regForm.name,
        email: regForm.email,
        role: regForm.role,
        state: regForm.state,
        farmSize: regForm.farmSize
      });
      setCurrentScreen('home');
      Alert.alert('Success', 'Account created successfully!');
    } else {
      Alert.alert('Error', 'Please fill all required fields and accept terms');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    setCurrentScreen('home');
  };

  const sendChatMessage = () => {
    if (chatInput.trim()) {
      const newMessage = {
        id: Date.now(),
        text: chatInput,
        type: 'user',
        timestamp: new Date().toLocaleTimeString(),
        language: selectedLanguage
      };
      
      setChatMessages(prev => [...prev, newMessage]);
      setChatInput('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          text: generateAIResponse(chatInput),
          type: 'ai',
          timestamp: new Date().toLocaleTimeString(),
          confidence: 95
        };
        setChatMessages(prev => [...prev, aiResponse]);
      }, 2000);
    }
  };

  const generateAIResponse = (input) => {
    const responses = {
      'English': 'Based on your query about crop health, I recommend checking soil moisture levels and ensuring proper fertilization. Regular monitoring is key for healthy crops.',
      'Kannada': 'ನಿಮ್ಮ ಬೆಳೆಯ ಆರೋಗ್ಯದ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗೆ ಆಧಾರಿತವಾಗಿ, ಮಣ್ಣಿನ ತೇವಾಂಶದ ಮಟ್ಟವನ್ನು ಪರಿಶೀಲಿಸಲು ಮತ್ತು ಸರಿಯಾದ ಗೊಬ್ಬರವನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲು ನಾನು ಶಿಫಾರಸು ಮಾಡುತ್ತೇನೆ।',
      'Hindi': 'आपकी फसल के स्वास्थ्य के बारे में प्रश्न के आधार पर, मैं मिट्टी की नमी के स्तर की जांच करने और उचित उर्वरीकरण सुनिश्चित करने की सिफारिश करता हूं।'
    };
    return responses[selectedLanguage] || responses['English'];
  };

  // Navigation Component
  const renderNavigation = () => (
    <View style={styles.navigation}>
      <View style={styles.navContent}>
        <TouchableOpacity style={styles.logo} onPress={() => setCurrentScreen('home')}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoText}>K</Text>
          </View>
          <Text style={styles.logoTitle}>Project Kisan</Text>
        </TouchableOpacity>

        <View style={styles.navLinks}>
          <TouchableOpacity onPress={() => setCurrentScreen('diagnosis')}>
            <Text style={styles.navLink}>📱 Leaf Diagnosis</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentScreen('farmer-assistant')}>
            <Text style={styles.navLink}>AI Assistant</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.navAuth}>
          {isAuthenticated && userProfile ? (
            <View style={styles.userInfo}>
              <View style={styles.userProfile}>
                <Text style={styles.userName}>{userProfile.name}</Text>
                <Text style={styles.userRole}>{userProfile.role}</Text>
              </View>
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.authButtons}>
              <TouchableOpacity 
                style={styles.loginButton} 
                onPress={() => setCurrentScreen('login')}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.signupButton} 
                onPress={() => setCurrentScreen('signup')}
              >
                <Text style={styles.signupButtonText}>Sign Up →</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  // Screen render functions
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return renderHome();
      case 'diagnosis':
        return renderDiagnosis();
      case 'farmer-assistant':
        return renderFarmerAssistant();
      case 'login':
        return renderLogin();
      case 'signup':
        return renderSignup();
      case 'features':
        return renderFeatures();
      case 'download':
        return renderDownload();
      default:
        return renderHome();
    }
  };

  const renderHome = () => (
    <ScrollView style={styles.scrollContainer}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <View style={styles.heroHeader}>
            <Text style={styles.heroSubheading}>Empowering Modern Agriculture</Text>
            <Text style={styles.heroTitle}>
              AI-powered farming solutions for a{' '}
              <Text style={styles.heroTitleEmphasis}>better tomorrow.</Text>
            </Text>
            <Text style={styles.heroDescription}>
              Bringing cutting-edge AI technology and innovative practices to Indian agriculture. Helping farmers
              maximize yields, reduce waste, and enhance sustainability through intelligent solutions.
            </Text>
          </View>
          
          <View style={styles.heroButtons}>
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={() => setCurrentScreen(isAuthenticated ? 'farmer-assistant' : 'signup')}
            >
              <Text style={styles.primaryButtonText}>Get Started Today →</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={() => setCurrentScreen('farmer-assistant')}
            >
              <Text style={styles.secondaryButtonText}>🤖 AI Assistant</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.tertiaryButton} 
              onPress={() => setCurrentScreen('diagnosis')}
            >
              <Text style={styles.tertiaryButtonText}>Try Diagnosis</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Interactive Map Card */}
        <View style={styles.mapCard}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/400x250/16a34a/ffffff?text=Farm+Landscape' }}
            style={styles.mapImage}
          />
          <View style={styles.mapOverlay}>
            <View style={[styles.techBadge, { top: 15, left: 15 }]}>
              <Text style={styles.techBadgeText}>🌾 Precision Agriculture</Text>
            </View>
            <View style={[styles.techBadge, { top: '50%', left: '50%', marginLeft: -60, marginTop: -15 }]}>
              <Text style={styles.techBadgeText}>🚜 Smart Farming</Text>
            </View>
            <View style={[styles.techBadge, { bottom: 15, right: 15 }]}>
              <Text style={styles.techBadgeText}>📊 Data Analytics</Text>
            </View>
            <View style={[styles.techBadge, { top: 15, right: 15 }]}>
              <Text style={styles.techBadgeText}>🌱 Crop Health</Text>
            </View>
          </View>
        </View>

        {/* Feature Grid */}
        <View style={styles.featureGrid}>
          {/* Success Story Card */}
          <View style={styles.successCard}>
            <View style={styles.successHeader}>
              <View style={styles.userAvatars}>
                <Text style={styles.avatar}>👨‍🌾</Text>
                <Text style={styles.avatar}>👩‍🌾</Text>
                <Text style={styles.avatar}>+</Text>
              </View>
            </View>
            <Text style={styles.successNumber}>10K+</Text>
            <Text style={styles.successLabel}>farmers joined</Text>
            <Text style={styles.successSubtext}>Join us in transforming the future of farming.</Text>
          </View>

          {/* Diagnosis Feature */}
          <TouchableOpacity 
            style={styles.diagnosisCard} 
            onPress={() => setCurrentScreen('diagnosis')}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>📱</Text>
              <Text style={styles.cardArrow}>→</Text>
            </View>
            <Text style={styles.cardTitle}>Leaf Diagnosis</Text>
            <Text style={styles.cardSubtitle}>AI-powered crop analysis</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Demo Section */}
      <View style={styles.demoSection}>
        <Text style={styles.sectionTitle}>Try Our AI Features</Text>
        <Text style={styles.sectionSubtitle}>
          Experience the power of AI-driven farming assistance with these quick demos
        </Text>

        <View style={styles.demoGrid}>
          {/* Quick Diagnosis Demo */}
          <View style={styles.demoCard}>
            <View style={styles.demoHeader}>
              <View style={styles.demoIconContainer}>
                <Text style={styles.demoIcon}>📱</Text>
              </View>
              <View style={styles.demoTitleContainer}>
                <Text style={styles.demoTitle}>Quick Diagnosis</Text>
                <Text style={styles.demoSubtitle}>Upload & analyze</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.uploadArea} onPress={handleImageUpload}>
              {uploadedImage ? (
                <Image source={{ uri: uploadedImage }} style={styles.uploadedImage} />
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <Text style={styles.uploadIcon}>📷</Text>
                  <Text style={styles.uploadText}>Upload plant photo</Text>
                </View>
              )}
            </TouchableOpacity>

            {isLoading && (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>🔄 Analyzing...</Text>
              </View>
            )}
          </View>

          {/* Market Prices Demo */}
          <View style={styles.demoCard}>
            <View style={styles.demoHeader}>
              <View style={styles.demoIconContainer}>
                <Text style={styles.demoIcon}>📈</Text>
              </View>
              <View style={styles.demoTitleContainer}>
                <Text style={styles.demoTitle}>Market Prices</Text>
                <Text style={styles.demoSubtitle}>Real-time rates</Text>
              </View>
            </View>

            <View style={styles.priceList}>
              {crops.slice(0, 3).map((crop, index) => (
                <View key={index} style={styles.priceItem}>
                  <Text style={styles.cropName}>{crop}</Text>
                  <Text style={styles.cropPrice}>₹2,450/quintal</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Voice Assistant Demo */}
          <View style={styles.demoCard}>
            <View style={styles.demoHeader}>
              <View style={styles.demoIconContainer}>
                <Text style={styles.demoIcon}>🎤</Text>
              </View>
              <View style={styles.demoTitleContainer}>
                <Text style={styles.demoTitle}>Voice Assistant</Text>
                <Text style={styles.demoSubtitle}>Ask in Kannada</Text>
              </View>
            </View>

            <View style={styles.voiceDemo}>
              <Text style={styles.kannadaExample}>"ನನ್ನ ಟೊಮೇಟೊ ಗಿಡದಲ್ಲಿ ಹಳದಿ ಎಲೆಗಳು ಕಾಣುತ್ತಿವೆ"</Text>
              <Text style={styles.englishTranslation}>My tomato plant has yellow leaves</Text>
              
              <TouchableOpacity 
                style={styles.voiceButton} 
                onPress={() => setCurrentScreen('farmer-assistant')}
              >
                <Text style={styles.voiceButtonText}>🎤 Try Voice Demo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Demo Results */}
        {diagnosisResult && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Demo Result</Text>
            
            <View style={styles.resultContent}>
              <View style={styles.resultHeader}>
                <Text style={styles.resultIcon}>✅</Text>
                <View style={styles.resultInfo}>
                  <Text style={styles.diseaseName}>Disease: {diagnosisResult.disease}</Text>
                  <Text style={styles.diseaseKannada}>Kannada: {diagnosisResult.kannadaName}</Text>
                </View>
                <View style={styles.confidenceBadge}>
                  <Text style={styles.confidenceText}>{diagnosisResult.confidence}% Confidence</Text>
                </View>
              </View>
              <Text style={styles.treatmentText}>{diagnosisResult.treatment}</Text>
            </View>

            <TouchableOpacity 
              style={styles.fullDiagnosisButton}
              onPress={() => setCurrentScreen('diagnosis')}
            >
              <Text style={styles.fullDiagnosisText}>Try Full Diagnosis Tool</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* About Section */}
      <View style={styles.aboutSection}>
        <Text style={styles.aboutSubheading}>About Project Kisan</Text>
        <Text style={styles.aboutTitle}>
          A Smarter, More Productive Agricultural Future
        </Text>
        <Text style={styles.aboutDescription}>
          We are committed to supporting farmers and agricultural businesses with the tools and knowledge they need
          to thrive. With a focus on sustainable practices, advanced AI technology, and a deep understanding of
          Indian agriculture, we help farmers grow more with less impact on the environment.
        </Text>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.featuresTitle}>Embrace AI-Powered Practices</Text>
        <View style={styles.featuresCard}>
          <Text style={styles.featuresDescription}>
            Adopt intelligent methods that not only boost productivity but also minimize environmental impact,
            ensuring the long-term health of your land and the surrounding ecosystem through advanced AI technology
            and sustainable farming practices.
          </Text>
          
          <View style={styles.featuresStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>95%</Text>
              <Text style={styles.statLabel}>Accuracy Rate</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>24/7</Text>
              <Text style={styles.statLabel}>AI Support</Text>
            </View>
            <TouchableOpacity style={styles.featuresArrow}>
              <Text style={styles.arrowText}>→</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Newsletter Section */}
      <View style={styles.newsletterSection}>
        <Text style={styles.newsletterTitle}>Subscribe to our newsletter for the latest updates.</Text>
        <Text style={styles.newsletterDescription}>
          Get insights on sustainable farming, AI technology updates, and success stories from farmers across
          India. Stay ahead with cutting-edge agricultural innovations.
        </Text>
        
        <View style={styles.newsletterForm}>
          <TextInput
            style={styles.newsletterInput}
            placeholder="Enter your email address"
            placeholderTextColor="rgba(255,255,255,0.7)"
          />
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeText}>Subscribe →</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.privacyText}>
          By subscribing, you agree to our Privacy Policy and consent to receive updates.
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerGrid}>
          <View style={styles.footerColumn}>
            <View style={styles.footerLogo}>
              <View style={styles.footerLogoIcon}>
                <Text style={styles.footerLogoText}>K</Text>
              </View>
              <Text style={styles.footerLogoTitle}>Project Kisan</Text>
            </View>
            <Text style={styles.footerDescription}>
              Empowering farmers with AI-powered solutions for sustainable agriculture and better crop yields through
              innovative technology.
            </Text>
          </View>

          <View style={styles.footerColumn}>
            <Text style={styles.footerHeading}>Services</Text>
            <TouchableOpacity onPress={() => setCurrentScreen('diagnosis')}>
              <Text style={styles.footerLink}>Crop Diagnosis</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Market Intelligence</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Voice Assistant</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Government Schemes</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerColumn}>
            <Text style={styles.footerHeading}>Solutions</Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Family Farming</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Sustainable Practices</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Waste Management</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Resource Optimization</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerColumn}>
            <Text style={styles.footerHeading}>Resources</Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Documentation</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Success Stories</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Support Center</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Community</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footerBottom}>
          <Text style={styles.footerCopyright}>© 2024 Project Kisan. All rights reserved.</Text>
          <View style={styles.footerBottomLinks}>
            <TouchableOpacity>
              <Text style={styles.footerBottomLink}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerBottomLink}>Terms of Service</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerBottomLink}>Cookie Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderDiagnosis = () => (
    <ScrollView style={styles.scrollContainer}>
      {/* Header */}
      <View style={styles.diagnosisHeader}>
        <Text style={styles.pageTitle}>Advanced AI Leaf Disease Detection</Text>
        <Text style={styles.pageSubtitle}>
          Upload an image of your crop leaf and get instant AI-powered disease analysis with treatment recommendations
        </Text>
      </View>

      {/* Language Selector */}
      <View style={styles.languageSection}>
        <Text style={styles.languageLabel}>Select Language / ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ</Text>
        <TouchableOpacity 
          style={styles.languageSelector}
          onPress={() => setShowLanguageSelector(true)}
        >
          <Text style={styles.languageSelectorText}>{selectedLanguage}</Text>
          <Text style={styles.languageArrow}>▼</Text>
        </TouchableOpacity>
      </View>

      {/* Upload Section */}
      <View style={styles.uploadSection}>
        <TouchableOpacity style={styles.uploadContainer} onPress={handleImageUpload}>
          {uploadedImage ? (
            <View style={styles.uploadedImageContainer}>
              <Image source={{ uri: uploadedImage }} style={styles.uploadedImageLarge} />
              <TouchableOpacity style={styles.changeImageButton} onPress={handleImageUpload}>
                <Text style={styles.changeImageText}>📷 Change Image</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.uploadPlaceholderLarge}>
              <Text style={styles.uploadIconLarge}>📷</Text>
              <Text style={styles.uploadTitleLarge}>Drag & Drop or Click to Upload</Text>
              <Text style={styles.uploadSubtextLarge}>Support JPG, PNG, JPEG files up to 10MB</Text>
              <View style={styles.uploadButtons}>
                <TouchableOpacity style={styles.uploadButton}>
                  <Text style={styles.uploadButtonText}>📱 Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.uploadButton}>
                  <Text style={styles.uploadButtonText}>🖼️ Choose File</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Loading Analysis */}
      {isLoading && (
        <View style={styles.loadingAnalysis}>
          <Text style={styles.loadingIcon}>🔄</Text>
          <Text style={styles.loadingTitle}>Analyzing your leaf image...</Text>
          <Text style={styles.loadingSubtext}>Our AI is examining the image for diseases and health issues</Text>
          <View style={styles.loadingProgress}>
            <View style={styles.progressBar}></View>
          </View>
          <Text style={styles.loadingPercent}>Processing: 45%</Text>
        </View>
      )}

      {/* Detailed Results */}
      {diagnosisResult && (
        <View style={styles.detailedResults}>
          <Text style={styles.resultsTitle}>🔬 Disease Analysis Results</Text>
          
          {/* Disease Information */}
          <View style={styles.diseaseCard}>
            <View style={styles.diseaseHeader}>
              <Text style={styles.diseaseIcon}>🦠</Text>
              <View style={styles.diseaseInfo}>
                <Text style={styles.diseaseNameEng}>{diagnosisResult.disease}</Text>
                <Text style={styles.diseaseNameLocal}>Kannada: {diagnosisResult.kannadaName}</Text>
                <Text style={styles.diseaseNameLocal}>Hindi: {diagnosisResult.hindiName}</Text>
              </View>
              <View style={styles.confidenceContainer}>
                <Text style={styles.confidenceValue}>{diagnosisResult.confidence}%</Text>
                <Text style={styles.confidenceLabel}>Confidence</Text>
              </View>
            </View>
          </View>

          {/* Treatment Recommendations */}
          <View style={styles.treatmentCard}>
            <Text style={styles.treatmentTitle}>💊 Treatment Recommendations</Text>
            <Text style={styles.treatmentText}>{diagnosisResult.treatment}</Text>
            {selectedLanguage === 'Kannada' && (
              <Text style={styles.treatmentKannada}>{diagnosisResult.treatment_kannada}</Text>
            )}
          </View>

          {/* Prevention Tips */}
          <View style={styles.preventionCard}>
            <Text style={styles.preventionTitle}>🛡️ Prevention Tips</Text>
            <Text style={styles.preventionText}>{diagnosisResult.prevention}</Text>
          </View>

          {/* Economic Impact */}
          <View style={styles.economicCard}>
            <Text style={styles.economicTitle}>💰 Economic Impact</Text>
            <Text style={styles.economicText}>{diagnosisResult.economicImpact}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareButtonText}>📤 Share Results</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>💾 Save Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Language Selector Modal */}
      <Modal visible={showLanguageSelector} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.languageModal}>
            <Text style={styles.modalTitle}>Select Language</Text>
            {languages.map((lang, index) => (
              <TouchableOpacity 
                key={index}
                style={[styles.languageOption, selectedLanguage === lang && styles.selectedLanguage]}
                onPress={() => {
                  setSelectedLanguage(lang);
                  setShowLanguageSelector(false);
                }}
              >
                <Text style={styles.languageOptionText}>{lang}</Text>
                {selectedLanguage === lang && <Text style={styles.checkMark}>✓</Text>}
              </TouchableOpacity>
            ))}
            <TouchableOpacity 
              style={styles.closeModal}
              onPress={() => setShowLanguageSelector(false)}
            >
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );

  const renderFarmerAssistant = () => (
    <ScrollView style={styles.scrollContainer}>
      {/* Header */}
      <View style={styles.assistantHeader}>
        <Text style={styles.pageTitle}>🤖 Multimodal Farmer Assistant</Text>
        <Text style={styles.pageSubtitle}>
          Voice + Image AI assistant that understands your farming needs in multiple Indian languages
        </Text>
      </View>

      {/* Language & Voice Settings */}
      <View style={styles.settingsSection}>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Language:</Text>
          <TouchableOpacity 
            style={styles.settingSelector}
            onPress={() => setShowLanguageSelector(true)}
          >
            <Text style={styles.settingValue}>{selectedLanguage}</Text>
            <Text style={styles.settingArrow}>▼</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Voice Mode:</Text>
          <Switch
            value={isVoiceMode}
            onValueChange={setIsVoiceMode}
            trackColor={{ false: '#767577', true: '#10b981' }}
            thumbColor={isVoiceMode ? '#059669' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Chat Messages */}
      <View style={styles.chatContainer}>
        {chatMessages.length === 0 ? (
          <View style={styles.welcomeMessage}>
            <Text style={styles.welcomeIcon}>👋</Text>
            <Text style={styles.welcomeTitle}>Welcome to AI Farm Assistant!</Text>
            <Text style={styles.welcomeText}>
              Ask me anything about farming in {selectedLanguage}. I can help with:
            </Text>
            <View style={styles.helpTopics}>
              <Text style={styles.helpTopic}>🌱 Crop diseases & treatment</Text>
              <Text style={styles.helpTopic}>🌧️ Weather & irrigation</Text>
              <Text style={styles.helpTopic}>🌾 Best practices & tips</Text>
              <Text style={styles.helpTopic}>💰 Market prices & trends</Text>
            </View>
          </View>
        ) : (
          <FlatList
            data={chatMessages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={[styles.messageContainer, item.type === 'user' ? styles.userMessage : styles.aiMessage]}>
                <View style={styles.messageContent}>
                  <Text style={styles.messageText}>{item.text}</Text>
                  <Text style={styles.messageTime}>{item.timestamp}</Text>
                  {item.type === 'ai' && item.confidence && (
                    <Text style={styles.messageConfidence}>Confidence: {item.confidence}%</Text>
                  )}
                </View>
              </View>
            )}
          />
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.quickActionsTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.quickActionButton}>
            <Text style={styles.actionIcon}>🌡️</Text>
            <Text style={styles.actionText}>Weather</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Text style={styles.actionIcon}>💰</Text>
            <Text style={styles.actionText}>Prices</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Text style={styles.actionIcon}>🌾</Text>
            <Text style={styles.actionText}>Crop Care</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Text style={styles.actionIcon}>📋</Text>
            <Text style={styles.actionText}>Schedule</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Input Section */}
      <View style={styles.inputSection}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.chatInput}
            value={chatInput}
            onChangeText={setChatInput}
            placeholder={`Ask your farming question in ${selectedLanguage}...`}
            multiline
          />
          <TouchableOpacity style={styles.attachButton}>
            <Text style={styles.attachIcon}>📎</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.inputActions}>
          <TouchableOpacity 
            style={[styles.voiceInputButton, isVoiceMode && styles.voiceInputActive]}
          >
            <Text style={styles.voiceInputIcon}>🎤</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraButton}>
            <Text style={styles.cameraIcon}>📷</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={sendChatMessage}
          >
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  const renderLogin = () => (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.authContainer}>
        <View style={styles.authHeader}>
          <Text style={styles.authTitle}>Welcome Back</Text>
          <Text style={styles.authSubtitle}>
            Sign in to access your personalized farming dashboard and AI-powered insights
          </Text>
        </View>

        <View style={styles.authForm}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.authInput}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.passwordToggleText}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.authOptions}>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
                onPress={() => setRememberMe(!rememberMe)}
              >
                {rememberMe && <Text style={styles.checkboxCheck}>✓</Text>}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Remember me</Text>
            </View>
            
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.authButton} onPress={handleLogin}>
            <Text style={styles.authButtonText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.authAlternative}>
            <Text style={styles.authAlternativeText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => setCurrentScreen('signup')}>
              <Text style={styles.authAlternativeLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Feature Highlights */}
        <View style={styles.authFeatures}>
          <Text style={styles.authFeaturesTitle}>What you'll get access to:</Text>
          <View style={styles.featuresList}>
            <Text style={styles.featureItem}>🔬 Advanced AI crop disease detection</Text>
            <Text style={styles.featureItem}>🤖 Multilingual farming assistant</Text>
            <Text style={styles.featureItem}>📊 Personalized farming insights</Text>
            <Text style={styles.featureItem}>🌡️ Weather-based recommendations</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderSignup = () => (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.authContainer}>
        <View style={styles.authHeader}>
          <Text style={styles.authTitle}>Join Project Kisan</Text>
          <Text style={styles.authSubtitle}>
            Create your account and start transforming your farming with AI-powered insights
          </Text>
        </View>

        <View style={styles.authForm}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.authInput}
              value={regForm.name}
              onChangeText={(text) => setRegForm({...regForm, name: text})}
              placeholder="Enter your full name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.authInput}
              value={regForm.email}
              onChangeText={(text) => setRegForm({...regForm, email: text})}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.authInput}
              value={regForm.phone}
              onChangeText={(text) => setRegForm({...regForm, phone: text})}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.authInput}
              value={regForm.password}
              onChangeText={(text) => setRegForm({...regForm, password: text})}
              placeholder="Create a password"
              secureTextEntry
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              style={styles.authInput}
              value={regForm.confirmPassword}
              onChangeText={(text) => setRegForm({...regForm, confirmPassword: text})}
              placeholder="Confirm your password"
              secureTextEntry
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Role</Text>
            <View style={styles.roleSelector}>
              <TouchableOpacity
                style={[styles.roleOption, regForm.role === 'farmer' && styles.roleOptionSelected]}
                onPress={() => setRegForm({...regForm, role: 'farmer'})}
              >
                <Text style={styles.roleOptionText}>👨‍🌾 Farmer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.roleOption, regForm.role === 'worker' && styles.roleOptionSelected]}
                onPress={() => setRegForm({...regForm, role: 'worker'})}
              >
                <Text style={styles.roleOptionText}>👷‍♂️ Agricultural Worker</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>State</Text>
            <TouchableOpacity style={styles.selectInput}>
              <Text style={styles.selectPlaceholder}>
                {regForm.state || 'Select your state'}
              </Text>
              <Text style={styles.selectArrow}>▼</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Farm Size</Text>
            <TextInput
              style={styles.authInput}
              value={regForm.farmSize}
              onChangeText={(text) => setRegForm({...regForm, farmSize: text})}
              placeholder="e.g., 5 acres, 2 hectares"
            />
          </View>

          <View style={styles.termsContainer}>
            <TouchableOpacity
              style={[styles.checkbox, regForm.acceptTerms && styles.checkboxChecked]}
              onPress={() => setRegForm({...regForm, acceptTerms: !regForm.acceptTerms})}
            >
              {regForm.acceptTerms && <Text style={styles.checkboxCheck}>✓</Text>}
            </TouchableOpacity>
            <Text style={styles.termsText}>
              I agree to the{' '}
              <Text style={styles.termsLink}>Terms & Conditions</Text>
              {' '}and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.authButton} onPress={handleSignup}>
            <Text style={styles.authButtonText}>Create Account</Text>
          </TouchableOpacity>

          <View style={styles.authAlternative}>
            <Text style={styles.authAlternativeText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => setCurrentScreen('login')}>
              <Text style={styles.authAlternativeLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Benefits Section */}
        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>Why join Project Kisan?</Text>
          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>🎯</Text>
              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>95% Accurate Diagnosis</Text>
                <Text style={styles.benefitDescription}>AI-powered disease detection with treatment recommendations</Text>
              </View>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>🗣️</Text>
              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>Multilingual Support</Text>
                <Text style={styles.benefitDescription}>Available in 6+ Indian languages including Kannada</Text>
              </View>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>📱</Text>
              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>24/7 AI Assistant</Text>
                <Text style={styles.benefitDescription}>Get instant farming advice anytime, anywhere</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Navigation */}
      {renderNavigation()}
      
      {/* Main Content */}
      {renderScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  
  // Navigation Styles
  navigation: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  navContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#059669',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  logoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  navLink: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  navAuth: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userProfile: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  userRole: {
    fontSize: 10,
    color: '#10b981',
    textTransform: 'capitalize',
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  logoutText: {
    fontSize: 12,
    color: '#6b7280',
  },
  authButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loginButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  loginButtonText: {
    fontSize: 12,
    color: '#6b7280',
  },
  signupButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#059669',
  },
  signupButtonText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },

  // Hero Section Styles
  heroSection: {
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  heroContent: {
    marginBottom: 32,
  },
  heroHeader: {
    marginBottom: 32,
  },
  heroSubheading: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '300',
    color: '#1f2937',
    lineHeight: 40,
    marginBottom: 16,
  },
  heroTitleEmphasis: {
    fontWeight: '500',
  },
  heroDescription: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 32,
  },
  heroButtons: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    color: '#ffffff',
    marginLeft: 8,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#059669',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
  },
  secondaryButtonText: {
    color: '#059669',
    fontSize: 16,
    fontWeight: '600',
  },
  tertiaryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  tertiaryButtonText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '500',
  },

  // Map Card Styles
  mapCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: 200,
  },
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  techBadge: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  techBadgeText: {
    fontSize: 10,
    color: '#059669',
    fontWeight: '500',
  },

  // Feature Grid Styles
  featureGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  successCard: {
    flex: 1,
    backgroundColor: '#059669',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  successHeader: {
    marginBottom: 12,
  },
  userAvatars: {
    flexDirection: 'row',
    gap: -8,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 12,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  successNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  successLabel: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 8,
  },
  successSubtext: {
    fontSize: 10,
    color: '#ffffff',
    opacity: 0.8,
    textAlign: 'center',
  },
  diagnosisCard: {
    flex: 1,
    backgroundColor: '#dbeafe',
    padding: 20,
    borderRadius: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 24,
    color: '#3b82f6',
  },
  cardArrow: {
    fontSize: 16,
    color: '#93c5fd',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#3b82f6',
  },

  // Demo Section Styles
  demoSection: {
    backgroundColor: '#f9fafb',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '300',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 24,
  },
  demoGrid: {
    gap: 20,
  },
  demoCard: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  demoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  demoIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#ecfdf5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  demoIcon: {
    fontSize: 20,
    color: '#059669',
  },
  demoTitleContainer: {
    flex: 1,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  demoSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadPlaceholder: {
    alignItems: 'center',
  },
  uploadIcon: {
    fontSize: 32,
    marginBottom: 8,
    color: '#6b7280',
  },
  uploadText: {
    fontSize: 14,
    color: '#6b7280',
  },
  uploadedImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  loadingText: {
    fontSize: 14,
    color: '#059669',
  },
  priceList: {
    gap: 8,
  },
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  cropName: {
    fontSize: 14,
    color: '#1f2937',
    flex: 1,
  },
  cropPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  voiceDemo: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  kannadaExample: {
    fontSize: 14,
    color: '#3730a3',
    marginBottom: 4,
  },
  englishTranslation: {
    fontSize: 12,
    color: '#6366f1',
    marginBottom: 12,
  },
  voiceButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  voiceButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },

  // Result Card Styles
  resultCard: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    marginTop: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 20,
  },
  resultContent: {
    marginBottom: 20,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
  },
  diseaseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f59e0b',
    marginBottom: 4,
  },
  diseaseKannada: {
    fontSize: 12,
    color: '#d97706',
  },
  confidenceBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  confidenceText: {
    fontSize: 12,
    color: '#92400e',
    fontWeight: '600',
  },
  treatmentText: {
    fontSize: 14,
    color: '#d97706',
    lineHeight: 20,
  },
  fullDiagnosisButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  fullDiagnosisText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },

  // About Section Styles
  aboutSection: {
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  aboutSubheading: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 16,
  },
  aboutTitle: {
    fontSize: 28,
    fontWeight: '300',
    color: '#1f2937',
    lineHeight: 36,
    marginBottom: 24,
  },
  aboutDescription: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },

  // Features Section Styles
  featuresSection: {
    backgroundColor: '#f9fafb',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '300',
    color: '#1f2937',
    marginBottom: 24,
  },
  featuresCard: {
    backgroundColor: '#ecfdf5',
    padding: 24,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
  },
  featuresDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 20,
  },
  featuresStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  featuresArrow: {
    width: 32,
    height: 32,
    backgroundColor: '#059669',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    color: '#ffffff',
    fontSize: 16,
  },

  // Newsletter Section Styles
  newsletterSection: {
    backgroundColor: '#059669',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  newsletterTitle: {
    fontSize: 28,
    fontWeight: '300',
    color: '#ffffff',
    marginBottom: 16,
  },
  newsletterDescription: {
    fontSize: 16,
    color: '#bbf7d0',
    lineHeight: 24,
    marginBottom: 32,
  },
  newsletterForm: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  newsletterInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 12,
  },
  subscribeButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  subscribeText: {
    color: '#059669',
    fontSize: 16,
    fontWeight: '600',
  },
  privacyText: {
    fontSize: 12,
    color: '#bbf7d0',
    opacity: 0.8,
  },

  // Footer Styles
  footer: {
    backgroundColor: '#1f2937',
    paddingVertical: 48,
    paddingHorizontal: 20,
  },
  footerGrid: {
    gap: 24,
    marginBottom: 32,
  },
  footerColumn: {
    marginBottom: 24,
  },
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  footerLogoIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#059669',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  footerLogoText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footerLogoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  footerDescription: {
    fontSize: 14,
    color: '#9ca3af',
    lineHeight: 20,
  },
  footerHeading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  footerLink: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 12,
    lineHeight: 20,
  },
  footerBottom: {
    borderTopWidth: 1,
    borderTopColor: '#374151',
    paddingTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerCopyright: {
    fontSize: 12,
    color: '#9ca3af',
  },
  footerBottomLinks: {
    flexDirection: 'row',
    gap: 20,
  },
  footerBottomLink: {
    fontSize: 12,
    color: '#9ca3af',
  },

  // Diagnosis Page Styles
  diagnosisHeader: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f0fdf4',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
  languageSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  languageLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  languageSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
  },
  languageSelectorText: {
    fontSize: 16,
    color: '#1f2937',
  },
  languageArrow: {
    fontSize: 12,
    color: '#6b7280',
  },
  uploadSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  uploadContainer: {
    borderWidth: 2,
    borderColor: '#bbf7d0',
    borderStyle: 'dashed',
    borderRadius: 16,
    backgroundColor: '#f0fdf4',
    padding: 40,
    alignItems: 'center',
  },
  uploadedImageContainer: {
    alignItems: 'center',
  },
  uploadedImageLarge: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  changeImageButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  changeImageText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  uploadPlaceholderLarge: {
    alignItems: 'center',
  },
  uploadIconLarge: {
    fontSize: 48,
    color: '#059669',
    marginBottom: 16,
  },
  uploadTitleLarge: {
    fontSize: 18,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 8,
  },
  uploadSubtextLarge: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
  },
  uploadButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  uploadButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#059669',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  uploadButtonText: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingAnalysis: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    alignItems: 'center',
  },
  loadingIcon: {
    fontSize: 32,
    marginBottom: 16,
  },
  loadingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 8,
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingProgress: {
    width: 200,
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressBar: {
    width: '45%',
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 2,
  },
  loadingPercent: {
    fontSize: 12,
    color: '#6b7280',
  },
  detailedResults: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 24,
  },
  diseaseCard: {
    backgroundColor: '#fef3c7',
    borderWidth: 1,
    borderColor: '#fbbf24',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  diseaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  diseaseIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  diseaseInfo: {
    flex: 1,
  },
  diseaseNameEng: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 4,
  },
  diseaseNameLocal: {
    fontSize: 12,
    color: '#d97706',
    marginBottom: 2,
  },
  confidenceContainer: {
    alignItems: 'center',
  },
  confidenceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  confidenceLabel: {
    fontSize: 10,
    color: '#d97706',
  },
  treatmentCard: {
    backgroundColor: '#dbeafe',
    borderWidth: 1,
    borderColor: '#93c5fd',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  treatmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  treatmentKannada: {
    fontSize: 14,
    color: '#3730a3',
    fontStyle: 'italic',
    marginTop: 8,
  },
  preventionCard: {
    backgroundColor: '#ecfdf5',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  preventionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 8,
  },
  preventionText: {
    fontSize: 14,
    color: '#047857',
    lineHeight: 20,
  },
  economicCard: {
    backgroundColor: '#fdf2f8',
    borderWidth: 1,
    borderColor: '#f9a8d4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  economicTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#be185d',
    marginBottom: 8,
  },
  economicText: {
    fontSize: 14,
    color: '#be185d',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#10b981',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageModal: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    minWidth: 280,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedLanguage: {
    backgroundColor: '#ecfdf5',
  },
  languageOptionText: {
    fontSize: 16,
    color: '#1f2937',
  },
  checkMark: {
    fontSize: 16,
    color: '#059669',
    fontWeight: 'bold',
  },
  closeModal: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  closeModalText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '600',
  },

  // Farmer Assistant Styles
  assistantHeader: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f3e8ff',
  },
  settingsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#f9fafb',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  settingSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
  },
  settingValue: {
    fontSize: 14,
    color: '#1f2937',
    marginRight: 8,
  },
  settingArrow: {
    fontSize: 10,
    color: '#6b7280',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    minHeight: 300,
  },
  welcomeMessage: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  welcomeIcon: {
    fontSize: 32,
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  helpTopics: {
    alignItems: 'flex-start',
    gap: 8,
  },
  helpTopic: {
    fontSize: 14,
    color: '#374151',
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  aiMessage: {
    alignItems: 'flex-start',
  },
  messageContent: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 14,
    color: '#1f2937',
    lineHeight: 20,
  },
  messageTime: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 4,
  },
  messageConfidence: {
    fontSize: 10,
    color: '#059669',
    marginTop: 4,
  },
  quickActions: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  quickActionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 20,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  inputSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 8,
  },
  attachButton: {
    padding: 8,
  },
  attachIcon: {
    fontSize: 20,
    color: '#6b7280',
  },
  inputActions: {
    flexDirection: 'row',
    gap: 8,
  },
  voiceInputButton: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 20,
  },
  voiceInputActive: {
    backgroundColor: '#8b5cf6',
  },
  voiceInputIcon: {
    fontSize: 16,
    color: '#6b7280',
  },
  cameraButton: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 20,
  },
  cameraIcon: {
    fontSize: 16,
    color: '#6b7280',
  },
  sendButton: {
    backgroundColor: '#059669',
    padding: 12,
    borderRadius: 20,
  },
  sendIcon: {
    fontSize: 16,
    color: '#ffffff',
  },

  // Auth Styles
  authContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  authHeader: {
    marginBottom: 32,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  authSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
  authForm: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 6,
  },
  authInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  passwordToggle: {
    padding: 12,
  },
  passwordToggleText: {
    fontSize: 16,
  },
  authOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  checkboxCheck: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#374151',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
  authButton: {
    backgroundColor: '#059669',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  authButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  authAlternative: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authAlternativeText: {
    fontSize: 14,
    color: '#6b7280',
  },
  authAlternativeLink: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
  },
  authFeatures: {
    backgroundColor: '#f0fdf4',
    padding: 20,
    borderRadius: 12,
  },
  authFeaturesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    fontSize: 14,
    color: '#059669',
  },
  roleSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  roleOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  roleOptionSelected: {
    borderColor: '#059669',
    backgroundColor: '#ecfdf5',
  },
  roleOptionText: {
    fontSize: 14,
    color: '#374151',
  },
  selectInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
  },
  selectPlaceholder: {
    fontSize: 16,
    color: '#6b7280',
  },
  selectArrow: {
    fontSize: 12,
    color: '#6b7280',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  termsText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    flex: 1,
  },
  termsLink: {
    color: '#059669',
    fontWeight: '500',
  },
  benefitsSection: {
    backgroundColor: '#f9fafb',
    padding: 20,
    borderRadius: 12,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  benefitsList: {
    gap: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  benefitIcon: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 18,
  },
});