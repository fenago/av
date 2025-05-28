import { MongoClient, Db, Collection } from 'mongodb';
import { UserProfile, UserRole, ROLE_FEATURES } from '@/types/user';

// MongoDB connection for user profiles
let client: MongoClient;
let db: Db;
let userProfiles: Collection<UserProfile>;

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'learningscience';
const COLLECTION_NAME = 'userProfiles';

export async function connectToUserProfilesDB(): Promise<Collection<UserProfile>> {
  if (userProfiles) {
    return userProfiles;
  }

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    userProfiles = db.collection<UserProfile>(COLLECTION_NAME);
    
    // Create indexes for performance
    await userProfiles.createIndex({ userId: 1 }, { unique: true });
    await userProfiles.createIndex({ email: 1 }, { unique: true });
    await userProfiles.createIndex({ role: 1 });
    
    console.log('Connected to user profiles collection');
    return userProfiles;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export async function createUserProfile(profileData: {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  subscription?: UserProfile['subscription'];
}): Promise<UserProfile> {
  const collection = await connectToUserProfilesDB();
  
  const newProfile: UserProfile = {
    ...profileData,
    features: ROLE_FEATURES[profileData.role],
    usage: {
      studentsCount: 0,
      professorsCount: 1,
      coursesCount: 0,
      lastActive: new Date(),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await collection.insertOne(newProfile);
  return { ...newProfile, _id: result.insertedId.toString() };
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const collection = await connectToUserProfilesDB();
  return await collection.findOne({ userId });
}

export async function getUserProfileByEmail(email: string): Promise<UserProfile | null> {
  const collection = await connectToUserProfilesDB();
  return await collection.findOne({ email });
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
  const collection = await connectToUserProfilesDB();
  
  const result = await collection.findOneAndUpdate(
    { userId },
    { 
      $set: { 
        ...updates, 
        updatedAt: new Date() 
      } 
    },
    { returnDocument: 'after' }
  );
  
  return result?.value || null;
}

export async function updateUserRole(userId: string, newRole: UserRole): Promise<UserProfile | null> {
  const collection = await connectToUserProfilesDB();
  
  const updates = {
    role: newRole,
    features: ROLE_FEATURES[newRole],
    updatedAt: new Date(),
  };
  
  const result = await collection.findOneAndUpdate(
    { userId },
    { $set: updates },
    { returnDocument: 'after' }
  );
  
  return result?.value || null;
}

export async function getAllUserProfiles(): Promise<UserProfile[]> {
  const collection = await connectToUserProfilesDB();
  return await collection.find({}).toArray();
}

export async function deleteUserProfile(userId: string): Promise<boolean> {
  const collection = await connectToUserProfilesDB();
  const result = await collection.deleteOne({ userId });
  return result.deletedCount > 0;
}

// Helper function to check if user has feature access
export function hasFeatureAccess(profile: UserProfile, feature: keyof UserProfile['features']): boolean {
  return profile.features[feature] === true || profile.role === UserRole.ADMIN;
}

// Helper function to check usage limits
export function checkUsageLimit(profile: UserProfile, type: 'students' | 'professors' | 'courses'): boolean {
  const current = profile.usage[`${type}Count` as keyof UserProfile['usage']] as number;
  const limit = profile.features[`max${type.charAt(0).toUpperCase() + type.slice(1)}` as keyof UserProfile['features']] as number;
  
  return current < limit || profile.role === UserRole.ADMIN;
}
