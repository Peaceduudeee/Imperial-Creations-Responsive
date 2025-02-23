import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

// Initialize Firebase Admin
initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const products = [
  {
    id: "carpet_001",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268149/carpet_001_b4t1zh.jpg",
    name: "Majestic Lion Rug",
    description: "This stunning carpet features a regal lion in lifelike detail, symbolizing strength and courage. The intricate weaving captures the powerful expression and flowing mane, making it a perfect statement piece. The warm brown, beige, and earthy tones enhance its rich, natural aesthetic, ideal for living rooms or office spaces.",
    price: 9600,
    size: "6ft*9ft",
    stock: 150,
    colors: "Shades of brown, beige, cream, and black"
  },
  {
    id: "carpet_002",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268149/carpet_002_uhuwtr.jpg",
    name: "Persian Sapphire Elegance",
    description: "A mesmerizing Persian-inspired carpet in a breathtaking turquoise-blue shade, featuring a symmetrical floral medallion design. The fine detailing and intricate borderwork reflect the craftsmanship of traditional Persian art. This piece adds sophistication and charm to any home décor.",
    price: 9600,
    size: "6ft*9ft",
    stock: 150,
    colors: "Turquoise blue, navy, beige, gold, and maroon"
  },
  {
    id: "carpet_003",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268148/carpet_003_he7qkb.jpg",
    name: "Royal Amber Blossom",
    description: "This intricately designed rug showcases a radiant sunburst pattern in warm amber and peach hues, surrounded by an elegant Persian-style border. The floral and geometric patterns blend harmoniously, creating a regal yet inviting look.",
    price: 9600,
    size: "6ft*9ft",
    stock: 150,
    colors: "Peach, amber, maroon, blue, beige, and green"
  },
  {
    id: "carpet_006",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268148/carpet_006_pjeubg.jpg",
    name: "Enchanted Rose Garden",
    description: "A soft yet striking carpet adorned with delicate pink and lavender tones, forming a mesmerizing floral medallion pattern. The intricate symmetry and ornate border give it a luxurious, timeless appeal, ideal for bedrooms or lounge areas.",
    price: 9600,
    size: "6ft*9ft",
    stock: 150,
    colors: "Soft pink, lavender, maroon, green, and beige"
  },
  {
    id: "carpet_012",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268148/carpet_012_qbxi6o.jpg",
    name: "Classic Ivory Bloom",
    description: "A stunning masterpiece with a delicate beige and cream base, adorned with intricate floral and latticework motifs. The soothing, neutral tones make it a versatile choice for various interiors, blending effortlessly with both modern and classic décor. Its elegant, handwoven look exudes grace and charm.",
    price: 9600,
    size: "6ft*9ft",
    stock: 150,
    colors: "Beige, ivory, green, brown, and maroon"
  },
  {
    id: "carpet_011",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268148/carpet_011_cqhrmx.jpg",
    name: "Kashan Tree of Life",
    description: "A breathtaking carpet featuring an intricate 'Tree of Life' design on a striking blue background. The detailed artwork showcases birds, deer, and floral motifs symbolizing prosperity and harmony, surrounded by a beautifully patterned ivory border. This masterpiece brings a sense of tradition and elegance.",
    price: 9600,
    size: "6ft*9ft",
    stock: 150,
    colors: "Sky blue, cream, maroon, green, and gold"
  },
  {
    id: "carpet_009",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268147/carpet_009_huramq.jpg",
    name: "Persian Rose Radiance",
    description: "A luxurious Persian carpet in soft pink hues, adorned with an intricate floral medallion design. The delicate latticework and harmonious blend of colors exude elegance and sophistication.",
    price: 9600,
    size: "6ft*9ft",
    stock: 150,
    colors: "Soft pink, lavender, navy, maroon, and beige"
  },
  {
    id: "carpet_007",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268147/carpet_007_yr9mpk.jpg",
    name: "Imperial Crimson Majesty",
    description: "A grand carpet featuring a stunning red base with intricate blue and golden floral designs radiating from the center. The mesmerizing symmetry and finely detailed border give it an opulent look, making it a perfect addition to formal rooms, lounges, or statement spaces.",
    price: 9600,
    size: "6ft*9ft",
    stock: 150,
    colors: "Deep red, blue, gold, beige, and black"
  },
  {
    id: "carpet_013",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268147/carpet_013_kq3a6s.jpg",
    name: "Kashmiri Floral Paradise",
    description: "This carpet in a rich crimson shade boasts an intricate floral garden pattern reminiscent of classic Kashmiri craftsmanship. With its vibrant floral motifs and ornamental borders, it radiates warmth and grandeur.",
    price: 9600,
    size: "6ft*9ft",
    stock: 150,
    colors: "Crimson red, gold, green, beige, and navy"
  },
  {
    id: "carpet_010",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268147/carpet_010_upkbpu.jpg",
    name: "Vintage Blue Elegance",
    description: "A sophisticated carpet featuring a muted blue background with intricate Persian-style floral motifs. The classic color combination of soft blues, ivory, and brown gives it a timeless charm, perfect for enhancing traditional and contemporary interiors alike.",
    price: 9600,
    size: "6ft*9ft",
    stock: 150,
    colors: "Muted blue, beige, ivory, brown, and maroon"
  },
  {
    id: "carpet_005",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268147/carpet_005_rgmp1v.jpg",
    name: "Ivory Persian Harmony",
    description: "A refined Persian-style carpet with an elegant ivory base adorned with intricate floral and vine motifs. The rich combination of soft green, brown, and deep red in the border enhances its classic appeal. This timeless piece adds warmth and sophistication to any interior.",
    price: 9600,
    size: "6ft*9ft",
    stock: 150,
    colors: "Ivory, beige, brown, green, and maroon"
  },
  {
    id: "carpet_008",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268147/carpet_008_touut0.jpg",
    name: "Regal Burgundy Elegance",
    description: "A majestic carpet featuring an opulent floral design on a deep burgundy background. The black and gold central medallion with intricate floral patterns radiates luxury, making it a perfect centerpiece for grand interiors.",
    price: 9600,
    size: "6ft*9ft",
    stock: 150,
    colors: "Burgundy, black, gold, beige, blue, and ivory"
  },
  {
    id: "carpet_004",
    image: "https://res.cloudinary.com/dxhtr756o/image/upload/v1740268148/carpet_004_pfckvg.jpg",
    name: "Persian Sunburst Grandeur",
    description: "A breathtaking Persian-style carpet featuring a mesmerizing sunburst medallion pattern in deep red and orange hues. The detailed geometric floral motifs and expertly woven border create a visually stunning effect.",
    price: 9600,
    size: "6ft*9ft",
    stock: 150,
    colors: "Deep red, burnt orange, navy, beige, and gold"
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