import "../App.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EquipmentDetails() {
  const { id } = useParams();

  const [equipment, setEquipment] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [totalDays, setTotalDays] = useState(0);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/equipment/${id}`
        );

        setEquipment(response.data);
      } catch (error) {
        console.error("Failed to fetch equipment:", error);
      }
    };

    fetchEquipment();
  }, [id]);

  const handleChange = (e) => {
    const updatedFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    setFormData(updatedFormData);

    if (updatedFormData.startDate && updatedFormData.endDate) {
      const start = new Date(updatedFormData.startDate);
      const end = new Date(updatedFormData.endDate);

      const difference = end - start;
      const days = difference / (1000 * 60 * 60 * 24);

      setTotalDays(days > 0 ? days : 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/bookings", {
        ...formData,
        equipment: equipment._id,
        totalDays: totalDays,
        totalCost: totalDays * equipment.dailyRate,
      });

      alert("Booking created successfully!");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        startDate: "",
        endDate: "",
      });

      setTotalDays(0);
      setShowForm(false);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
    }
  };

  if (!equipment) {
    return <p>Loading...</p>;
  }

  const totalCost = totalDays * equipment.dailyRate;

  return (
    <div className = "details-page">
      <img
        src={equipment.image}
        alt={equipment.name}
        className = "details-image"
      />

      <h1>{equipment.name}</h1>

      <p>Category: {equipment.category}</p>

      <h2>₹{equipment.dailyRate}/day</h2>

      <p>{equipment.description}</p>
      
        <h3>Safety & Operational Instructions</h3>

        <ul>
          <li>Read the manufacturer's instructions before operating the equipment.</li>
          <li>Wear appropriate personal protective equipment (PPE).</li>
          <li>Inspect the equipment for damage before use.</li>
          <li>Keep unauthorized people away from the operating area.</li>
          <li>Switch off the equipment before cleaning or maintenance.</li>
        </ul>

      <p>
        {equipment.availability
          ? "Available"
          : "Currently Rented"}
      </p>

      <h3>Specifications</h3>
        {Object.entries(equipment.specifications || {}).map(([key, value]) => (
        <p key={key}><strong>{key}:</strong> {value}</p>
      ))}
      

      <button onClick={() => setShowForm(true)}>
        Rent This Equipment
      </button>

      {showForm && (
        <form className ="booking-form" onSubmit={handleSubmit}>
          <h2>Rental Details</h2>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <br />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <br />

          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <br />

          <input
            type="text"
            name="company"
            placeholder="Company (Optional)"
            value={formData.company}
            onChange={handleChange}
          />

          <br />
          
<div className="date-fields">
        <div className="date-field">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            min={new Date().toISOString().split("T")[0]}
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

          <div className="date-field">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            min={
              formData.startDate ||
              new Date().toISOString().split("T")[0]
            }
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
      </div>


          {totalDays > 0 && (
            <div>
              <h3>Rental Summary</h3>

              <p>Total Days: {totalDays}</p>

              <p>Daily Rate: ₹{equipment.dailyRate}</p>

              <p>Total Cost: ₹{totalCost}</p>
            </div>
          )}

          <br />

          <button type="submit">
            Book Equipment
          </button>
        </form>
      )}
    </div>
  );
}

export default EquipmentDetails;
