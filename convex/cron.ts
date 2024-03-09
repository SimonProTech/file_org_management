import { cronJobs } from 'convex/server';
import { internal } from './_generated/api';

const crons = cronJobs();

crons.monthly(
  'clear all files after 30 days',
  { day: 1, hourUTC: 16, minuteUTC: 0 }, // every minute
  internal.files.removeFileAutomatically,
);
