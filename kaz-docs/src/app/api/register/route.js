 
import { NextResponse } from 'next/server';

// Base de données simulée
const Users = [
  {
    _id: "507f1f77bcf86cd799439011",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    
    // ... autres champs
  }
  // ... autres utilisateurs
];

// Méthodes de base de données simulées
const db = {
  findOne: ({ email }) => Users.find(user => user.email === email),
  create: (userData) => {
    const newUser = {
      _id: Math.random().toString(36).substring(2, 15),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    Users.push(newUser);
    return newUser;
  }
};

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validation des champs
    if (!data.name || !data.email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required' },
        { status: 400 }
      );
    }
    
    // Vérification de l'existence
    const existingUser = db.findOne({ email: data.email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User already exists' },
        { status: 409 }
      );
    }
    
    // Création de l'utilisateur (sans hachage pour le test)
    const user = db.create({
      ...data,
      createdAt: new Date()
    });
    
    // Réponse
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email
      // ... autres champs à retourner
    };
    
    const response = NextResponse.json(
      { success: true, data: userResponse },
      { status: 201 }
    );
    
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}