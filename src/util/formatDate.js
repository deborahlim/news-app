export function msToTime(ms) {
  let seconds = (ms / 1000).toFixed();
  let minutes = (ms / (1000 * 60)).toFixed();
  let hours = (ms / (1000 * 60 * 60)).toFixed();
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed();
  let years = (ms / (1000 * 60 * 60 * 24 * 365)).toFixed();
  if (seconds < 60) return seconds + " Sec";
  else if (minutes < 60) return minutes + " Min";
  else if (hours < 24 && hours > 1) return hours + " Hrs";
  else if (hours < 24 && hours >= 1) return hours + " Hr";
  else if (days < 365 && days > 1) return days + " Days";
  else if (days < 365 && days <= 1) return days + " Day";
  else return years > 1 ? years + " Years" : years + " Year";
}
export const timeElaspedSinceCurr = (str) => {
  const timeElasped = msToTime(Date.now() - new Date(str).getTime());
  return timeElasped + " ago";
};
