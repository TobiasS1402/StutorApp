/**
 * Calculate when it's friday by the given data
 * @param d
 */
const getFriday = (d: Date): Date => {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1) + 4;
  d.setHours(23, 59, 59, 0);
  return new Date(d.setDate(diff));
};

export default getFriday;
