
import { createClient } from '@supabase/supabase-js';
import { mockPredictions } from "@/data/mockPredictions";
import { format, parse, isValid } from 'date-fns';

const SUPABASE_URL = "https://delemxcvtgxiuxygvvra.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbGVteGN2dGd4aXV4eWd2dnJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNjYwMTUsImV4cCI6MjA2MDk0MjAxNX0.6RSJ_T9lOhikNchU7fMSnv44tlfNrpKsMCOCHPJgSbA";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper function to parse and normalize various date formats
function normalizeDate(dateStr: string | null | undefined) {
  if (!dateStr) return null;
  
  const dateFormats = [
    'dd/MM/yyyy',
    'dd/MM/yy',
    'dd/MM',
    'd/M',
    'dd-MM-yyyy',
    'dd.MM',
    'dd.MM.yyyy',
    'dd MMM yyyy',
    'MMM d',
    'dd-MMM-yyyy',
    'yyyy-MM-dd'
  ];

  // Try each format until we find one that works
  for (const format of dateFormats) {
    const parsedDate = parse(dateStr, format, new Date());
    if (isValid(parsedDate)) {
      // If year is not specified, assume 2025
      if (!dateStr.includes('202')) {
        parsedDate.setFullYear(2025);
      }
      return format(parsedDate, 'yyyy-MM-dd');
    }
  }

  console.error(`Could not normalize date: ${dateStr}`);
  return null;
}

function normalizeTime(timeStr: string | null | undefined) {
  if (!timeStr) return null;
  
  // Handle various time formats
  const timeFormats = {
    'HH:mm': /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    'HH:mm:ss': /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
    'h:mma': /^(1[0-2]|0?[1-9]):[0-5][0-9][ap]m$/i,
    'ha': /^(1[0-2]|0?[1-9])[ap]m$/i,
    'H\\h': /^([0-1]?[0-9]|2[0-3])h$/i,
  };

  // Remove any extra spaces
  timeStr = timeStr.trim().toLowerCase();
  
  // Try to parse the time string
  try {
    let normalized = null;
    
    if (timeStr.match(timeFormats['HH:mm'])) {
      normalized = timeStr.padStart(5, '0');
    } else if (timeStr.match(timeFormats['HH:mm:ss'])) {
      normalized = timeStr.substring(0, 5);
    } else if (timeStr.includes('h')) {
      normalized = timeStr.replace('h', ':00');
    } else if (timeStr.includes('am') || timeStr.includes('pm')) {
      const [time, meridiem] = timeStr.split(/am|pm/i);
      const [hours, minutes = '00'] = time.split(':');
      let hour = parseInt(hours);
      
      if (meridiem.toLowerCase() === 'pm' && hour < 12) hour += 12;
      if (meridiem.toLowerCase() === 'am' && hour === 12) hour = 0;
      
      normalized = `${hour.toString().padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    }

    if (normalized && normalized.match(timeFormats['HH:mm'])) {
      return normalized;
    }
  } catch (error) {
    console.error("Error normalizing time:", error);
  }
  
  return null;
}

// Transform mockPrediction keys to match the database schema
function toDbFormat(pred: any) {
  const normalizedDate = normalizeDate(pred.date);
  const normalizedTime = normalizeTime(pred.time);
  
  return {
    name: pred.name,
    date: pred.date,
    time: pred.time ?? null,
    weight: pred.weight,
    height: pred.height,
    gender: pred.gender ?? null,
    hair_color: pred.hairColor ?? null,
    eye_color: pred.eyeColor ?? null,
    hope_mom: pred.hopeMom ?? null,
    hope_dad: pred.hopeDad ?? null,
    resemblance: pred.resemblance ?? null,
    advice: pred.advice ?? null,
    normalized_date: normalizedDate,
    normalized_time: normalizedTime,
    is_lost: pred.isLost ?? false,
    approved: true,
    status: 'approved'
  };
}

// Utility to populate the database with all mock predictions
async function importAll() {
  // First, delete existing predictions
  const { error: deleteError } = await supabase
    .from("predictions")
    .delete()
    .neq('id', '');  // Delete all rows

  if (deleteError) {
    console.error("Failed to delete existing predictions:", deleteError);
    return;
  }

  // Then insert new predictions
  for (const pred of mockPredictions) {
    const formattedPred = toDbFormat(pred);
    console.log(`Inserting prediction for ${pred.name} with normalized date: ${formattedPred.normalized_date}, time: ${formattedPred.normalized_time}`);
    
    const { error } = await supabase.from("predictions").insert([formattedPred]);
    if (error) {
      console.error("Failed to insert:", pred, error);
    } else {
      console.log(`Inserted prediction for: ${pred.name}`);
    }
  }
  console.log("Finished importing all predictions!");
}

importAll();
