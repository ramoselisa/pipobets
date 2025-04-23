
import { createClient } from '@supabase/supabase-js';
import { mockPredictions } from "@/data/mockPredictions";

// Configure the Supabase client (public keys, safe to expose)
const SUPABASE_URL = "https://delemxcvtgxiuxygvvra.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbGVteGN2dGd4aXV4eWd2dnJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNjYwMTUsImV4cCI6MjA2MDk0MjAxNX0.6RSJ_T9lOhikNchU7fMSnv44tlfNrpKsMCOCHPJgSbA";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper functions to normalize date and time
function normalizeDate(dateStr: string | null | undefined) {
  if (!dateStr) return null;
  
  try {
    // Parse the date string into a Date object
    const date = new Date(dateStr);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) return null;
    
    // Format to YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error("Error normalizing date:", error);
    return null;
  }
}

function normalizeTime(timeStr: string | null | undefined) {
  if (!timeStr) return null;
  
  try {
    // Check if the timeStr is in HH:MM format
    const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
    if (!timeRegex.test(timeStr)) return null;
    
    // Make sure it's formatted as HH:MM (with leading zeros)
    const [hours, minutes] = timeStr.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  } catch (error) {
    console.error("Error normalizing time:", error);
    return null;
  }
}

// Transform mockPrediction keys to match the database schema
function toDbFormat(pred: any) {
  // Normalize date and time
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
    approved: true // all mock data should be approved
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
