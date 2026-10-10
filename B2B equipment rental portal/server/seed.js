import dotenv from "dotenv";
import connectDB from "./db.js";
import Equipment from "./models/equipment.js";

dotenv.config();

const equipment = [
  {
    name: "Power Generator 7000W",
    category: "Power & Electrical",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    dailyRate: 45,
    description:
      "Reliable 7000W generator suitable for construction sites and commercial use.",
    specifications: {
      powerOutput: "7000W",
      fuelType: "Petrol",
    },
    availability: true,
  },

  {
    name: "Mini Excavator",
    category: "Heavy Machinery",
    image:
      "https://images.unsplash.com/photo-1580901369227-308f6f40ddeb?auto=format&fit=crop&w=800&q=80",
    dailyRate: 180,
    description:
      "Compact excavator suitable for digging, construction and earthmoving work.",
    specifications: {
      operatingWeight: "2500 kg",
      fuelType: "Diesel",
    },
    availability: true,
  },

  {
    name: "Demolition Hammer",
    category: "Power Tools",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    dailyRate: 35,
    description:
      "Heavy-duty demolition hammer designed for concrete and masonry work.",
    specifications: {
      powerOutput: "1500W",
      voltage: "220V",
    },
    availability: true,
  },

  {
    name: "Plate Compactor",
    category: "Compaction",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    dailyRate: 55,
    description:
      "Powerful plate compactor for soil, pavement and construction work.",
    specifications: {
      operatingWeight: "90 kg",
      fuelType: "Petrol",
    },
    availability: true,
  },
];

const seedData = async () => {
  try {
    await connectDB();

    await Equipment.deleteMany();
    await Equipment.insertMany(equipment);

    console.log("Equipment data inserted successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error inserting equipment:", error.message);
    process.exit(1);
  }
};

seedData();