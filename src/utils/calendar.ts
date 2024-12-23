export const generateCalendarLink = (eventInfo: {
  date: Date;
  location: string;
  address: string;
}) => {
  const event = {
    title: "Soirée des Trophées",
    description: `Lieu : ${eventInfo.location}\nAdresse : ${eventInfo.address}`,
    startDate: eventInfo.date.toISOString(),
    endDate: new Date(eventInfo.date.getTime() + 4 * 60 * 60 * 1000).toISOString(), // Event duration: 4 hours
    location: `${eventInfo.location}, ${eventInfo.address}`,
  };

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `SUMMARY:${event.title}`,
    `DTSTART:${event.startDate.replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
    `DTEND:${event.endDate.replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
    `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${event.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  return URL.createObjectURL(blob);
};