import { cronJobs } from 'convex/server';
import { internal } from './_generated/api';

const crons = cronJobs();

crons.monthly(
  'clear all files after 30 days',
  { day: 1, hourUTC: 16, minuteUTC: 0 }, // every minute
  internal.files.removeFileAutomatically,
);

crons.weekly(
  'clear all notifications after 7 days if all rode it',
  { hourUTC: 23, minuteUTC: 59, dayOfWeek: 'monday' },
  internal.notifications.removeNotificationsAfterOneWeekIfAllUsersSaw,
);
