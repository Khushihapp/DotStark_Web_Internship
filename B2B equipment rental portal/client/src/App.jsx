import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import EquipmentDetails from "./pages/EquipmentDetails";
import AdminBookings from "./pages/AdminBookings";

function Home() {
  const [equipment, setEquipment] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const navigate = useNavigate();

  const categories = [
    "All",
    "Heavy Machinery",
    "Power Tools",
    "Compaction",
    "Power & Electrical",
  ];

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/equipment"
        );

        setEquipment(response.data);
      } catch (error) {
        console.error("Failed to fetch equipment:", error);
      }
    };

    fetchEquipment();
  }, []);

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      
<section className="hero-banner">
  <div>
    <h1>Equipment Rental Portal</h1>

    <p>
      Find and rent reliable equipment for your business and construction projects.
    </p>

    <button
      onClick={() =>{
        document.getElementById("equipment")?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }}
    >
      Explore Equipment
    </button>
  </div>
</section>

      <input
        type="text"
        placeholder="Search equipment..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div id = "equipment" className="equipment-grid">
          {filteredEquipment.map((item) => (
            <div className="equipment-card" key={item._id}>
      
            <img
              src={item.image}
              alt={item.name}
              width="200"
            />

            <h2>{item.name}</h2>

            <p>{item.category}</p>

            <p>${item.dailyRate}/day</p>

            <p>
              {item.availability
                ? "Available"
                : "Currently Rented"}
            </p>

            <button
              onClick={() =>
                navigate(`/equipment/${item._id}`)
              }
            >
              View Details & Rent
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/equipment/:id"
          element={<EquipmentDetails />}
        />
        <Route
          path="/admin/bookings"
         element={<AdminBookings />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

