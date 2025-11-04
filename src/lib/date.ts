import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
  formatDistance,
  formatDistanceToNow,
  isToday,
  isYesterday,
  parseISO,
} from 'date-fns';

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string | number, formatStr = 'PPP'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
  return format(dateObj, formatStr);
}

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string | number): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
  return formatDistanceToNow(dateObj, { addSuffix: true });
}

/**
 * Format date distance between two dates
 */
export function formatDateDistance(
  date: Date | string | number,
  baseDate: Date = new Date()
): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
  return formatDistance(dateObj, baseDate, { addSuffix: true });
}

/**
 * Check if date is today
 */
export function isDateToday(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
  return isToday(dateObj);
}

/**
 * Check if date is yesterday
 */
export function isDateYesterday(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
  return isYesterday(dateObj);
}

/**
 * Get human readable date (Today, Yesterday, or formatted date)
 */
export function getHumanReadableDate(date: Date | string | number): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);

  if (isToday(dateObj)) {
    return 'Today';
  }

  if (isYesterday(dateObj)) {
    return 'Yesterday';
  }

  const daysDiff = differenceInDays(new Date(), dateObj);
  if (daysDiff < 7) {
    return format(dateObj, 'EEEE'); // Day name
  }

  return formatDate(dateObj);
}

/**
 * Get time ago string (e.g., "5 minutes ago", "2 hours ago", "3 days ago")
 */
export function getTimeAgo(date: Date | string | number): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
  const now = new Date();

  const minutesDiff = differenceInMinutes(now, dateObj);
  if (minutesDiff < 60) {
    return `${minutesDiff} minute${minutesDiff !== 1 ? 's' : ''} ago`;
  }

  const hoursDiff = differenceInHours(now, dateObj);
  if (hoursDiff < 24) {
    return `${hoursDiff} hour${hoursDiff !== 1 ? 's' : ''} ago`;
  }

  const daysDiff = differenceInDays(now, dateObj);
  if (daysDiff < 7) {
    return `${daysDiff} day${daysDiff !== 1 ? 's' : ''} ago`;
  }

  return formatDate(dateObj);
}
