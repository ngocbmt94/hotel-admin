import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://mvauhbaifdcbifcjmydb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12YXVoYmFpZmRjYmlmY2pteWRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg0Mjk0NzUsImV4cCI6MjAyNDAwNTQ3NX0.LQaNsZdlpZ5K8FOd0_dArFrWupkb54VgMkuuGQO6yjQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
