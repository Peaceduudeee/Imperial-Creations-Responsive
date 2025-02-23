import admin from "firebase-admin";
import fs from "fs";

// 🔹 Load Firebase Admin SDK Credentials
const serviceAccount = JSON.parse(fs.readFileSync("./firebaseAdminConfig.json", "utf8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// 🔹 Function to Create User Cart Structure
async function createCartStructure(userId) {
  const cartRef = db.collection("users").doc(userId).collection("cartItems");

  const cartData = {
    carpet_001: { name: "Persian Blossom Elegance", price: 45000, quantity: 1 },
    carpet_002: { name: "Royal Persian Mandala", price: 50000, quantity: 1 },
    carpet_003: { name: "Heritage Floral Kashmiri", price: 28000, quantity: 1 },
  };

  for (const [id, data] of Object.entries(cartData)) {
    await cartRef.doc(id).set(data);
  }

  console.log(`✅ Cart structure created for User: ${userId}`);
}

// 🔹 Function to Create User Wishlist Structure
async function createWishlistStructure(userId) {
  const wishlistRef = db.collection("users").doc(userId).collection("wishlist");

  const wishlistData = {
    carpet_001: { name: "Persian Blossom Elegance", price: 45000 },
    carpet_005: { name: "Imperial Red Royalty", price: 32000 },
  };

  for (const [id, data] of Object.entries(wishlistData)) {
    await wishlistRef.doc(id).set(data);
  }

  console.log(`✅ Wishlist structure created for User: ${userId}`);
}

// 🔹 Run Both Functions
async function main() {
  const userId = "userID_123"; // Replace with actual user ID
  await createCartStructure(userId);
  await createWishlistStructure(userId);
  console.log("🔥 Firestore setup completed!");
}

main().catch(console.error);