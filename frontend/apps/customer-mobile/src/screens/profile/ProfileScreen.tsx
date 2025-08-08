import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { 
  Card, 
  Button, 
  Input,
  H3, 
  H4, 
  Body1, 
  Caption, 
  LoadingIndicator,
  colors,
  spacing
} from '@logistics/ui';
import { auth } from '@logistics/features';
import { apiService } from '@logistics/utils';

type RootStackParamList = {
  Dashboard: undefined;
  LoadDetails: { loadId: string };
  Profile: undefined;
};

type ProfileScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Profile'>;
};

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role: string;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  
  // Password change states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { useAuth } = auth;
  const { logout, user } = useAuth();

  // Fetch user profile on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Fetch user profile from API
  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      
      // In a real implementation, this would come from the auth context
      // or from an API call
      // const response = await apiService.get('/api/users/me');
      // const profileData = response.data;
      
      // For now, use mock data
      setTimeout(() => {
        const mockProfile: UserProfile = {
          id: '1',
          name: 'John Smith',
          email: 'john.smith@example.com',
          phone: '(555) 123-4567',
          company: 'ABC Shipping Inc.',
          role: 'CUSTOMER',
        };
        
        setUserProfile(mockProfile);
        
        // Initialize form fields
        setName(mockProfile.name || '');
        setEmail(mockProfile.email || '');
        setPhone(mockProfile.phone || '');
        setCompany(mockProfile.company || '');
        
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      Alert.alert(
        'Error',
        'Failed to load profile information. Please try again later.',
        [{ text: 'OK' }]
      );
      setIsLoading(false);
    }
  };

  // Validate profile form
  const validateProfileForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name) {
      newErrors.name = 'Name is required';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate password form
  const validatePasswordForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save profile
  const handleSaveProfile = async () => {
    if (!validateProfileForm()) return;
    
    setIsLoading(true);
    
    try {
      // This would be a real API call in production
      // await apiService.put('/api/users/profile', {
      //   name,
      //   email,
      //   phone,
      //   company
      // });
      
      // For now, just simulate the API call
      setTimeout(() => {
        // Update local user profile
        if (userProfile) {
          setUserProfile({
            ...userProfile,
            name,
            email,
            phone,
            company
          });
        }
        
        setIsEditing(false);
        setIsLoading(false);
        
        Alert.alert(
          'Success',
          'Profile updated successfully',
          [{ text: 'OK' }]
        );
      }, 1000);
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert(
        'Error',
        'Failed to update profile. Please try again.',
        [{ text: 'OK' }]
      );
      setIsLoading(false);
    }
  };

  // Handle change password
  const handleChangePassword = async () => {
    if (!validatePasswordForm()) return;
    
    setIsLoading(true);
    
    try {
      // This would be a real API call in production
      // await apiService.put('/api/users/password', {
      //   currentPassword,
      //   newPassword
      // });
      
      // For now, just simulate the API call
      setTimeout(() => {
        setIsChangingPassword(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setIsLoading(false);
        
        Alert.alert(
          'Success',
          'Password changed successfully',
          [{ text: 'OK' }]
        );
      }, 1000);
    } catch (error) {
      console.error('Error changing password:', error);
      Alert.alert(
        'Error',
        'Failed to change password. Please try again.',
        [{ text: 'OK' }]
      );
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          onPress: async () => {
            try {
              await logout();
              // App.js will handle navigation after logout
            } catch (error) {
              console.error('Logout error:', error);
            }
          }
        }
      ]
    );
  };

  // Render loading state
  if (isLoading && !userProfile) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <LoadingIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.profileCard}>
          <H3 style={styles.title}>My Profile</H3>
          
          {!isEditing ? (
            // View mode
            <View style={styles.profileInfo}>
              <View style={styles.infoRow}>
                <Caption style={styles.infoLabel}>Name:</Caption>
                <Body1>{userProfile?.name || 'N/A'}</Body1>
              </View>
              
              <View style={styles.infoRow}>
                <Caption style={styles.infoLabel}>Email:</Caption>
                <Body1>{userProfile?.email || 'N/A'}</Body1>
              </View>
              
              <View style={styles.infoRow}>
                <Caption style={styles.infoLabel}>Phone:</Caption>
                <Body1>{userProfile?.phone || 'N/A'}</Body1>
              </View>
              
              <View style={styles.infoRow}>
                <Caption style={styles.infoLabel}>Company:</Caption>
                <Body1>{userProfile?.company || 'N/A'}</Body1>
              </View>
              
              <View style={styles.infoRow}>
                <Caption style={styles.infoLabel}>Role:</Caption>
                <Body1>{userProfile?.role || 'CUSTOMER'}</Body1>
              </View>
              
              <Button
                style={styles.editButton}
                onPress={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </View>
          ) : (
            // Edit mode
            <View style={styles.editForm}>
              <Input
                label="Name"
                value={name}
                onChangeText={setName}
                error={errors.name}
              />
              
              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
              />
              
              <Input
                label="Phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                error={errors.phone}
              />
              
              <Input
                label="Company"
                value={company}
                onChangeText={setCompany}
                error={errors.company}
              />
              
              <View style={styles.buttonRow}>
                <Button
                  variant="outline"
                  style={styles.cancelButton}
                  onPress={() => {
                    setIsEditing(false);
                    setErrors({});
                  }}
                >
                  Cancel
                </Button>
                
                <Button
                  style={styles.saveButton}
                  onPress={handleSaveProfile}
                  disabled={isLoading}
                >
                  Save
                </Button>
              </View>
            </View>
          )}
        </Card>
        
        <Card style={styles.securityCard}>
          <H4 style={styles.sectionTitle}>Security</H4>
          
          {!isChangingPassword ? (
            <Button
              variant="outline"
              onPress={() => setIsChangingPassword(true)}
            >
              Change Password
            </Button>
          ) : (
            <View style={styles.passwordForm}>
              <Input
                label="Current Password"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry
                error={errors.currentPassword}
              />
              
              <Input
                label="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                error={errors.newPassword}
              />
              
              <Input
                label="Confirm New Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                error={errors.confirmPassword}
              />
              
              <View style={styles.buttonRow}>
                <Button
                  variant="outline"
                  style={styles.cancelButton}
                  onPress={() => {
                    setIsChangingPassword(false);
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                    setErrors({});
                  }}
                >
                  Cancel
                </Button>
                
                <Button
                  style={styles.saveButton}
                  onPress={handleChangePassword}
                  disabled={isLoading}
                >
                  Update
                </Button>
              </View>
            </View>
          )}
        </Card>
        
        <Button
          variant="outline"
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          Logout
        </Button>
      </ScrollView>
      
      {isLoading && <LoadingIndicator fullScreen />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrey,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGrey,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  profileCard: {
    marginBottom: spacing.md,
  },
  title: {
    marginBottom: spacing.md,
    color: colors.accent,
    textAlign: 'center',
  },
  profileInfo: {
    marginTop: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  infoLabel: {
    width: 100,
    color: colors.grey,
  },
  editButton: {
    marginTop: spacing.md,
  },
  editForm: {
    marginTop: spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  cancelButton: {
    flex: 1,
    marginRight: spacing.sm,
  },
  saveButton: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  securityCard: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    color: colors.accent,
  },
  passwordForm: {
    marginTop: spacing.md,
  },
  logoutButton: {
    marginBottom: spacing.xl,
  },
});

export default ProfileScreen;