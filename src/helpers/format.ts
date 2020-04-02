import { format_long_short_time, setLang } from '@beenotung/tslib/format';
import { WEEK } from '@beenotung/tslib/time';

setLang('en');
const fullDateTimeFormatThreshold = WEEK;

export function isFullDateTime(time: number, now: number) {
  return Math.abs(time - now) >= fullDateTimeFormatThreshold;
}

export function formatDateTime(time: number): string {
  return format_long_short_time(time, {
    threshold: fullDateTimeFormatThreshold,
  });
}
