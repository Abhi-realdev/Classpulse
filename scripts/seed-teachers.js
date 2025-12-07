import fs from 'fs/promises';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Read .env (if present) so we don't require dotenv
const envPath = path.resolve(process.cwd(), '.env');
let env = {};
try {
  const txt = await fs.readFile(envPath, 'utf8');
  txt.split(/\r?\n/).forEach(line => {
    const m = line.match(/^\s*([^#=]+)\s*=\s*(.*)\s*$/);
    if (m) {
      env[m[1].trim()] = m[2].trim().replace(/^\"|\"$/g, '').replace(/^\'|\'$/g, '');
    }
  });
} catch (e) {
  console.warn('.env not found or not readable, falling back to process.env');
}

const SUPABASE_URL = env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Please ensure .env or environment variables are set.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const teachers = [
  { name: 'Dr. Rajesh Kumar', subject: 'Mathematics', email: 'rajesh.kumar@sunbeam.edu.in', avatar_url: '' },
  { name: 'Mrs. Priya Sharma', subject: 'Physics', email: 'priya.sharma@sunbeam.edu.in', avatar_url: '' },
  { name: 'Mr. Amit Verma', subject: 'Chemistry', email: 'amit.verma@sunbeam.edu.in', avatar_url: '' },
  { name: 'Ms. Anjali Singh', subject: 'Biology', email: 'anjali.singh@sunbeam.edu.in', avatar_url: '' },
  { name: 'Dr. Suresh Patel', subject: 'English', email: 'suresh.patel@sunbeam.edu.in', avatar_url: '' },
  { name: 'Mrs. Kavita Gupta', subject: 'Hindi', email: 'kavita.gupta@sunbeam.edu.in', avatar_url: '' },
  { name: 'Mr. Vikram Reddy', subject: 'Computer Science', email: 'vikram.reddy@sunbeam.edu.in', avatar_url: '' },
  { name: 'Ms. Neha Joshi', subject: 'History', email: 'neha.joshi@sunbeam.edu.in', avatar_url: '' },
  { name: 'Dr. Ramesh Yadav', subject: 'Geography', email: 'ramesh.yadav@sunbeam.edu.in', avatar_url: '' },
  { name: 'Mrs. Sunita Das', subject: 'Economics', email: 'sunita.das@sunbeam.edu.in', avatar_url: '' },
  { name: 'Mr. Sandeep Mehta', subject: 'Mathematics', email: 'sandeep.mehta@sunbeam.edu.in', avatar_url: '' },
  { name: 'Ms. Pooja Rao', subject: 'Physics', email: 'pooja.rao@sunbeam.edu.in', avatar_url: '' },
  { name: 'Mr. Arjun Singh', subject: 'Computer Science', email: 'arjun.singh@sunbeam.edu.in', avatar_url: '' },
  { name: 'Ms. Meera Nair', subject: 'English', email: 'meera.nair@sunbeam.edu.in', avatar_url: '' }
];

console.log('Seeding', teachers.length, 'teachers to', SUPABASE_URL);

try {
  const { data, error } = await supabase.from('teachers').insert(teachers).select('*');
  if (error) {
    console.error('Supabase insert error:', error);
    process.exit(1);
  }
  console.log('Inserted/returned rows:', data?.length ?? 0);
  data?.forEach(t => console.log('-', t.name, `<${t.email}>`, '-', t.subject));
  console.log('Done.');
  process.exit(0);
} catch (err) {
  console.error('Unexpected error while seeding teachers:', err);
  process.exit(1);
}
