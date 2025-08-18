import { getTimeInMinutes } from "../util";

export function timeLessThanOrEqualTo(start: string, end: string) {
  const [startInMinutes, endInMinutes] = getTimeInMinutes([start, end]);
  return startInMinutes <= endInMinutes;
}
export function timeLessThan(start: string, end: string) {
  const [startInMinutes, endInMinutes] = getTimeInMinutes([start, end]);
  return startInMinutes < endInMinutes;
}

