import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    const { secret, newUserId } = await req.json();
    
    if (secret !== 'fix-admin-userid-socrates73') {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }

    const client = new MongoClient(process.env.MONGODB_URI || '');
    await client.connect();
    const db = client.db('learningscience');
    const userProfiles = db.collection('userProfiles');

    // Find and update the admin user profile in the correct collection
    const result = await userProfiles.findOneAndUpdate(
      { email: 'socrates73@gmail.com' },
      { $set: { userId: newUserId } },
      { returnDocument: 'after' }
    );

    await client.close();

    if (result && result.value) {
      return NextResponse.json({
        message: 'Admin user ID updated successfully in userProfiles collection',
        userId: result.value.userId,
        email: result.value.email,
        role: result.value.role
      });
    } else {
      return NextResponse.json({
        message: 'Admin user not found in userProfiles collection'
      }, { status: 404 });
    }

  } catch (error) {
    console.error('Failed to fix user ID:', error);
    return NextResponse.json(
      { error: 'Failed to fix user ID', details: error.message },
      { status: 500 }
    );
  }
}
