// scripts/addTestOrders.js
import admin from "firebase-admin";
import { v4 as uuidv4 } from "uuid"; // Generate unique order IDs
import { Timestamp } from "firebase-admin/firestore";
import fs from "fs";

//  Load Firebase Admin credentials (Ensure you downloaded the JSON file)
const serviceAccount = JSON.parse(fs.readFileSync("./firebaseAdminConfig.json", "utf8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

//  Function to add a test order
const addTestOrder = async () => {
  try {
    const orderId = uuidv4(); // Generate a unique order ID
    const testOrder = {
      userId: "testUser123", // Fake user ID for testing
      items: [
        { id: "carpet_001", name: "Persian Rug", qty: 2, price: 45000 },
        { id: "carpet_002", name: "Handwoven Kashmiri", qty: 1, price: 60000 },
      ],
      totalAmount: 150000,
      shippingInfo: {
        fullName: "Test User",
        phone: "9876543210",
        address: "123 Test Street",
        city: "Mumbai",
        pincode: "400001",
      },
      paymentMethod: "Cash on Delivery",
      status: "Processing",
      createdAt: Timestamp.now(),
    };

    await db.collection("orders").doc(orderId).set(testOrder);
    console.log(` Test order added successfully! Order ID: ${orderId}`);
  } catch (error) {
    console.error(" Error adding test order:", error);
  }
};

//  Run the function
addTestOrder();