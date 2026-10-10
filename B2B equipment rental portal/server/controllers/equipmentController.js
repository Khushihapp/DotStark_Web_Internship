import Equipment from "../models/equipment.js";

export const getEquipment = async (req, res) => {
  try {
    const { search, category } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "All") {
      filter.category = category;
    }

    const equipment = await Equipment.find(filter);

    res.status(200).json(equipment);
  } catch (error) {
    console.log("Equipment error :",error)
    res.status(500).json({
      message: "Failed to fetch equipment",
    });
  }
};

export const getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({
        message: "Equipment not found",
      });
    }

    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch equipment",
    });
  }
};