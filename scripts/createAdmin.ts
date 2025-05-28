import { createUserProfile } from '@/libs/userProfile';
import { UserRole } from '@/types/user';

async function createAdminProfile() {
  try {
    console.log('Creating admin profile...');
    
    const adminProfile = await createUserProfile({
      userId: 'admin_socrates73',
      email: 'socrates73@gmail.com',
      name: 'Immanual Kant',
      role: UserRole.ADMIN,
    });

    console.log('✅ Admin profile created successfully:');
    console.log({
      email: adminProfile.email,
      name: adminProfile.name,
      role: adminProfile.role,
      features: adminProfile.features,
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to create admin profile:', error);
    process.exit(1);
  }
}

// Run the script
createAdminProfile();
