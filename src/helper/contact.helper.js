export function formatTime(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

export const generateFileName = ({ fromDate, toDate, format }) => {
  const fromDateStr = new Date(fromDate).toLocaleDateString();
  const toDateStr = new Date(toDate).toLocaleTimeString();
  const HH_MM_SS = formatTime(new Date().toISOString());
  const exportfileName = `${fromDate}_to_${toDate}_${HH_MM_SS}.${format}`;
  return exportfileName;
};
