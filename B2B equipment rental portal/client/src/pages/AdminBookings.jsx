import { useEffect, useState } from "react";
import axios from "axios";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/bookings"
        );

        setBookings(response.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h1>Admin Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Equipment</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Days</th>
              <th>Total Cost</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking._id}</td>
                <td>{booking.fullName}</td>
                <td>{booking.email}</td>
                <td>{booking.equipment?.name}</td>
                <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                <td>{booking.totalDays}</td>
                <td>₹{booking.totalCost}</td>
                
                <td>
                <select
                    value={booking.status}
                    onChange={async (e) => {
                    const status = e.target.value;

                    await axios.patch(
                        `http://localhost:5000/api/bookings/${booking._id}/status`,
                        { status }
                    );

                    booking.status = status;
                    setBookings([...bookings]);
                    }}
                >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                </select>
                </td>


                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default AdminBookings;

