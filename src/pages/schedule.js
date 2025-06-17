import React, { useEffect, useState } from "react";

const MeetingScheduler = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Replace with your public calendar ID
  const calendarId = "your_calendar_id@group.calendar.google.com";
  const apiKey = "YOUR_GOOGLE_API_KEY";

  useEffect(() => {
    const fetchAvailability = async () => {
      const now = new Date();
      const end = new Date(now);
      end.setDate(now.getDate() + 7); // next 7 days

      const res = await fetch(`https://www.googleapis.com/calendar/v3/freeBusy?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timeMin: now.toISOString(),
          timeMax: end.toISOString(),
          items: [{ id: calendarId }],
        }),
      });

      const data = await res.json();
      const busy = data.calendars[calendarId]?.busy || [];

      // Create dummy available slots from 9am to 5pm each day, 1-hour blocks
      const available = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(now);
        date.setDate(now.getDate() + i);
        for (let hour = 9; hour < 17; hour++) {
          const slotStart = new Date(date);
          slotStart.setHours(hour, 0, 0, 0);
          const slotEnd = new Date(slotStart);
          slotEnd.setHours(hour + 1);

          const isBusy = busy.some((b) => {
            return new Date(b.start) < slotEnd && new Date(b.end) > slotStart;
          });

          if (!isBusy) {
            available.push(slotStart.toISOString());
          }
        }
      }

      setSlots(available);
    };

    fetchAvailability();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/send-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        time: selectedSlot,
      }),
    });

    alert("Request sent!");
  };

  return (
    <div>
      <h3>Pick a Time</h3>
      <ul>
        {slots.map((slot) => (
          <li key={slot}>
            <label>
              <input type="radio" name="slot" value={slot} onChange={() => setSelectedSlot(slot)} />
              {new Date(slot).toLocaleString()}
            </label>
          </li>
        ))}
      </ul>

      <h3>Your Info</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <br />
        <input
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <br />
        <button type="submit" disabled={!selectedSlot}>
          Request Meeting
        </button>
      </form>
    </div>
  );
};

export default MeetingScheduler;
