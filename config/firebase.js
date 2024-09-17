// const admin = require('firebase-admin');
// require('dotenv').config(); // Load environment variables

// try {
//   // Ensure private key and other credentials are loaded correctly from environment variables
//   const serviceAccount = {
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//     privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
//   };

//   // Initialize Firebase Admin SDK with credentials
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });

//   console.log('Firebase Admin initialized successfully');
// } catch (error) {
//   console.error('Error initializing Firebase Admin:', error);
//   process.exit(1); // Exit the application if Firebase initialization fails
// }

// module.exports = admin;
