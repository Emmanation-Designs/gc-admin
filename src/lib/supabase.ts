import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hpnesoyqvsozsglphdpp.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmVzb3lxdnNvenNnbHBoZHBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MTA4ODgsImV4cCI6MjA5NDA4Njg4OH0.ERs2-MIouf8dvcOhYr3HoOlfPjeghzLWXpO9tuZu7UM';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const ALLOWED_EMAILS = [
  'gibsoncollections1@gmail.com',
  'gibsoncollections2@gmail.com'
];
