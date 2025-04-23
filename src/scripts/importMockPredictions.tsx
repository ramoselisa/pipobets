
import { createClient } from '@supabase/supabase-js';
import { mockPredictions } from "@/data/mockPredictions";

// Configure the Supabase client (public keys, safe to expose)
const SUPABASE_URL = "https://delemxcvtgxiuxygvvra.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbGVteGN2dGd4aXV4eWd2dnJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNjYwMTUsImV4cCI6MjA2MDk0MjAxNX0.6RSJ_T9lOhikNchU7fMSnv44tlfNrpKsMCOCHPJgSbA";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Transform mockPrediction keys to match the database schema
function toDbFormat(pred: any) {
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
    normalized_date: pred.normalizedDate ?? null,
    normalized_time: pred.normalizedTime ?? null,
    is_lost: pred.isLost ?? false
  };
}

// Utility to populate the database with all mock predictions
async function importAll() {
  for (const pred of mockPredictions) {
    const { error } = await supabase.from("predictions").insert([toDbFormat(pred)]);
    if (error) {
      console.error("Failed to insert:", pred, error);
    } else {
      console.log(`Inserted prediction for: ${pred.name}`);
    }
  }
  console.log("Finished importing all predictions!");
}

importAll();
