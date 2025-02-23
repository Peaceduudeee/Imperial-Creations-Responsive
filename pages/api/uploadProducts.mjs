import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

// Initialize Firebase Admin
initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

// Array of carpet products
const products = [
  {
    id: "carpet_001",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268149/carpet_001_b4t1zh.jpg",
    name: "Carpet 001", // Update with actual name if needed
    description: "Semi worsted yarn are prepared by making fibres as parallel as possible by applying controlled drafting of the fibres. Finer microns and longer length wools are used to create a luxurious carpet for your home.",
    price: 9600,
    size: "6ft*9ft"
  },
  {
    id: "carpet_002",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268149/carpet_002_uhuwtr.jpg",
    name: "Carpet 002",
    description: "Semi worsted yarn are prepared by making fibres as parallel as possible by applying controlled drafting of the fibres. Finer microns and longer length wools are used to create a luxurious carpet for your home.",
    price: 9600,
    size: "6ft*9ft"
  },
  {
    id: "carpet_003",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268148/carpet_003_he7qkb.jpg",
    name: "Carpet 003",
    description: "Semi worsted yarn are prepared by making fibres as parallel as possible by applying controlled drafting of the fibres. Finer microns and longer length wools are used to create a luxurious carpet for your home.",
    price: 9600,
    size: "6ft*9ft"
  },
  {
    id: "carpet_006",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268148/carpet_006_pjeubg.jpg",
    name: "Carpet 006",
    description: "Semi worsted yarn are prepared by making fibres as parallel as possible by applying controlled drafting of the fibres. Finer microns and longer length wools are used to create a luxurious carpet for your home.",
    price: 9600,
    size: "6ft*9ft"
  },
  {
    id: "carpet_012",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268148/carpet_012_qbxi6o.jpg",
    name: "Carpet 012",
    description: "Semi worsted yarn are prepared by making fibres as parallel as possible by applying controlled drafting of the fibres. Finer microns and longer length wools are used to create a luxurious carpet for your home.",
    price: 9600,
    size: "6ft*9ft"
  },
  {
    id: "carpet_011",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268148/carpet_011_cqhrmx.jpg",
    name: "Carpet 011",
    description: "Semi worsted yarn are prepared by making fibres as parallel as possible by applying controlled drafting of the fibres. Finer microns and longer length wools are used to create a luxurious carpet for your home.",
    price: 9600,
    size: "6ft*9ft"
  },
  {
    id: "carpet_009",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268147/carpet_009_huramq.jpg",
    name: "Carpet 009",
    description: "Semi worsted yarn are prepared by making fibres as parallel as possible by applying controlled drafting of the fibres. Finer microns and longer length wools are used to create a luxurious carpet for your home.",
    price: 9600,
    size: "6ft*9ft"
  },
  {
    id: "carpet_007",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268147/carpet_007_yr9mpk.jpg",
    name: "Carpet 007",
    description: "Semi worsted yarn are prepared by making fibres as parallel as possible by applying controlled drafting of the fibres. Finer microns and longer length wools are used to create a luxurious carpet for your home.",
    price: 9600,
    size: "6ft*9ft"
  },
  {
    id: "carpet_013",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268147/carpet_013_kq3a6s.jpg",
    name: "Carpet 013",
    description: "Semi worsted yarn are prepared by making fibres as parallel as possible by applying controlled drafting of the fibres. Finer microns and longer length wools are used to create a luxurious carpet for your home.",
    price: 9600,
    size: "6ft*9ft"
  },
  {
    id: "carpet_010",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268147/carpet_010_upkbpu.jpg",
    name: "Carpet 010",
    description: "Semi worsted yarn are prepared by making fibres as parallel as possible by applying controlled drafting of the fibres. Finer microns and longer length wools are used to create a luxurious carpet for your home.",
    price: 9600,
    size: "6ft*9ft"
  },
  {
    id: "carpet_005",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268147/carpet_005_rgmp1v.jpg",
    name: "Carpet 005",
    description: "Semi worsted yarn are prepared by making fibres as parallel as possible by applying controlled drafting of the fibres. Finer microns and longer length wools are used to create a luxurious carpet for your home.",
    price: 9600,
    size: "6ft*9ft"
  },
  {
    id: "carpet_008",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268147/carpet_008_touut0.jpg",
    name: "Carpet 008",
    description: "Semi worsted yarn are prepared by making fibres as parallel as possible by applying controlled drafting of the fibres. Finer microns and longer length wools are used to create a luxurious carpet for your home.",
    price: 9600,
    size: "6ft*9ft"
  },
  {
    id: "carpet_004",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268148/carpet_004_pfckvg.jpg",
    name: "Carpet 004",
    description: "Semi worsted yarn are prepared by making fibres as parallel as possible by applying controlled drafting of the fibres. Finer microns and longer length wools are used to create a luxurious carpet for your home.",
    price: 9600,
    size: "6ft*9ft"
  }
];

async function uploadProducts() {
  try {
    for (const product of products) {
      // Use the product id as the document ID
      await db.collection("products").doc(product.id).set(product);
      console.log(`Product ${product.id} uploaded successfully`);
    }
  } catch (error) {
    console.error("Error uploading products:", error);
  }
}

uploadProducts();