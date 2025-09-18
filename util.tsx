import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { Toast } from 'toastify-react-native';
import { messages } from './validation/messages';


export function getErrorMessage(error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>): string | undefined {
  return error?.message as string | undefined;
}

export function getTimeDifferenceInMinutes(start: string, end: string): number {
  const [startInMinutes, endInMinutes] = getTimeInMinutes([start, end]);
  let diffInMinutes = endInMinutes - startInMinutes;
  if (diffInMinutes < 0) {
    diffInMinutes += 24 * 60;
  }
  return diffInMinutes;
}

export function formatMinutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${padToTwoDigits(hours)}:${padToTwoDigits(minutes)}`;
}

export function getTimeInMinutes(dates: string[]): number[] {
  return dates.map((date) => {
    const [hours, minutes] = date.split(":").map(Number);
    return hours * 60 + minutes;
  });
}
export function padToTwoDigits(num: number): string {
  return num.toString().padStart(2, "0");
}

export function parseCurrencyToFloat(value: string | number): number {
  const raw = typeof value === 'number' ? value.toString() : value?.replace(/\D/g, '')

  if (!raw) return 0

  const integerPart = raw.slice(0, -2) || '0'
  const decimalPart = raw.slice(-2)
  return parseFloat(`${integerPart}.${decimalPart}`)
}

export function formatFloatToString(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function truncateString(str: string, maxLength: number) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

export function getFormatedCurrentHours(){
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`
}

export function isValidHour(time: string | undefined) {
  if(! time) return false;
  const regex = /^([01]\d|2[0-3]):[0-5]\d$/;
  return regex.test(time);
}

export function onValidationFail() {
  Toast.error(messages.submitFail, "bottom");
}

export function toDate(dateString: string) {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day); // mês começa do 0
}

export function toTimestamp(dateString: string) {
  return toDate(dateString).getTime();
}

export function formatPhoneNumber(input: string): string {
  const digits = input.replace(/\D/g, '');
  const mask = '(##) #####-####';
  let formatted = '';
  let digitIndex = 0;

  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === '#') {
      if (digitIndex < digits.length) {
        formatted += digits[digitIndex];
        digitIndex++;
      } else {
        formatted += '_';
      }
    } else {
      formatted += mask[i];
    }
  }

  return formatted;
}

export function capitalizeText(text: string) {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

type SetErrorFunction<T> = (
  name: keyof T,
  error: { type: string; message: string }
) => void;

interface HandleRequestErrorOptions<T> {
  error: any;
  setError: SetErrorFunction<T>;
  fallbackField?: keyof T;
}

export function handleRequestError<T>({
  error,
  setError,
  fallbackField,
}: HandleRequestErrorOptions<T>) {
  const status = error.response.status;
  const response = error.response.data;

  if (typeof response?.errors === 'object' && response?.errors !== null) {
    Object.entries(response.errors).forEach(([field, message]) => {
      setError(field as keyof T, {
        type: 'manual',
        message: Array.isArray(message) ? message[0] : message,
      });
    });
    return;
  }

  if (fallbackField) {
    setError(fallbackField, {
      type: 'manual',
      message:
        status === 500
          ? 'Não foi possível completar a requisição'
          : response?.message ?? 'Erro desconhecido',
    });
  } else {
    Toast.error(
      status === 500
        ? 'Não foi possível completar a requisição'
        : response?.message ?? 'Erro desconhecido',
    );
  }
}

type EnumLike = { [key: string]: string };

export function formatEnumToOptions<T extends EnumLike>(enumObj: T) {
  return Object.entries(enumObj).map(([key, value]) => ({
    value: key as keyof T,
    label: value
  }));
}

export function getDistanceInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Raio da Terra em km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // distância em km
}

export const formatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});