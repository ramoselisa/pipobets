
import { PredictionProps } from "@/components/PredictionCard";

// Parse date string in various formats to a Date object
const parseDate = (dateStr: string): Date => {
  // Handle formats like "27/04", "27-04", "27.04", "April 27", etc.
  const normalizedDateStr = dateStr.toLowerCase();
  
  // Try to extract day and month from string
  let day: number | null = null;
  let month: number | null = null;
  
  // Check for patterns like DD/MM, DD-MM, DD.MM
  const dateMatch = normalizedDateStr.match(/(\d{1,2})[\/\-\.](\d{1,2})/);
  if (dateMatch) {
    day = parseInt(dateMatch[1]);
    month = parseInt(dateMatch[2]) - 1; // JavaScript months are 0-indexed
  } else {
    // Check for patterns like "April 27", "27 April", etc.
    const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    const monthMatch = months.findIndex(m => normalizedDateStr.includes(m));
    
    if (monthMatch !== -1) {
      month = monthMatch;
      // Extract number from string
      const numberMatch = normalizedDateStr.match(/\d{1,2}/);
      if (numberMatch) {
        day = parseInt(numberMatch[0]);
      }
    }
  }
  
  if (day !== null && month !== null) {
    // Set year to 2025 as that's the year for the baby predictions
    return new Date(2025, month, day);
  }
  
  // If we couldn't parse, return a far future date to ensure it's not selected as closest
  return new Date(9999, 0, 1);
};

// Parse time string to minutes since midnight
const parseTime = (timeStr: string | undefined): number => {
  if (!timeStr) return -1; // No time provided
  
  // Handle formats like "20:19", "20h19", "8:30pm", etc.
  let hours = 0;
  let minutes = 0;
  
  // Check for patterns like HH:MM or HH.MM
  const timeMatch = timeStr.match(/(\d{1,2})[:h\.](\d{1,2})/);
  if (timeMatch) {
    hours = parseInt(timeMatch[1]);
    minutes = parseInt(timeMatch[2]);
    
    // Check if there's AM/PM indicator
    if (timeStr.toLowerCase().includes('pm') && hours < 12) {
      hours += 12;
    } else if (timeStr.toLowerCase().includes('am') && hours === 12) {
      hours = 0;
    }
  } else {
    // Just try to extract the first number as hours
    const hourMatch = timeStr.match(/(\d{1,2})/);
    if (hourMatch) {
      hours = parseInt(hourMatch[1]);
      if (timeStr.toLowerCase().includes('pm') && hours < 12) {
        hours += 12;
      } else if (timeStr.toLowerCase().includes('am') && hours === 12) {
        hours = 0;
      }
    }
  }
  
  return hours * 60 + minutes; // Convert to minutes since midnight
};

// Parse weight string to grams
const parseWeight = (weightStr: string): number => {
  // Handle formats like "3.100 kg", "3,100 kg", "3100 g", etc.
  
  // Extract number from string
  const numberMatch = weightStr.match(/(\d+)[.,]?(\d*)/);
  if (!numberMatch) return 0;
  
  let weight = parseInt(numberMatch[1]);
  if (numberMatch[2]) {
    const decimals = numberMatch[2];
    // If in form of 3.100, treat as 3100g
    if (decimals.length === 3) {
      weight = weight * 1000 + parseInt(decimals);
    } else {
      weight = weight * 1000 + parseInt(decimals) * 100;
    }
  } else {
    // If just a number, check if it's likely kg or g
    if (weight < 10) {
      weight *= 1000; // Convert kg to g
    }
  }
  
  return weight;
};

// Calculate time difference in minutes
const calculateTimeDifference = (time1: number, time2: number): number => {
  if (time1 < 0 || time2 < 0) return Infinity; // Handle missing time
  
  // Calculate difference in minutes, considering circular nature of time
  let diff = Math.abs(time1 - time2);
  if (diff > 12 * 60) diff = 24 * 60 - diff; // Take the shortest path around the clock
  
  return diff;
};

// Calculate date difference in days
const calculateDateDifference = (date1: Date, date2: Date): number => {
  return Math.abs(date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24);
};

export interface BetWinners {
  dateWinner: PredictionProps | null;
  dateTimeDifferenceMinutes: number;
  weightWinner: PredictionProps | null;
  weightDifferenceGrams: number;
}

export const calculateBetWinners = (
  predictions: PredictionProps[], 
  actualDate: string, // Format: 'DD/MM'
  actualTime: string, // Format: 'HH:MM'
  actualWeight: string, // Format: '3.100 kg'
  actualHairColor?: string,
  actualEyeColor?: string
): BetWinners => {
  // Parse actual values
  const actualDateObj = parseDate(actualDate);
  const actualTimeMinutes = parseTime(actualTime);
  const actualWeightGrams = parseWeight(actualWeight);
  
  let closestDateDiff = Infinity;
  let closestTimeDiff = Infinity;
  let closestWeightDiff = Infinity;
  
  let dateWinner: PredictionProps | null = null;
  let weightWinner: PredictionProps | null = null;
  
  // Find the closest predictions
  predictions.forEach(prediction => {
    // Calculate date and time difference
    const predictionDate = parseDate(prediction.date);
    const dateDiff = calculateDateDifference(predictionDate, actualDateObj);
    
    const predictionTime = parseTime(prediction.time);
    let timeDiff = calculateTimeDifference(predictionTime, actualTimeMinutes);
    
    // If date is spot on, consider time difference, otherwise just use date difference
    const dateTimeDiff = dateDiff === 0 ? timeDiff / (24 * 60) : dateDiff;
    
    if (dateTimeDiff < closestDateDiff) {
      closestDateDiff = dateTimeDiff;
      closestTimeDiff = timeDiff;
      dateWinner = prediction;
    }
    
    // Calculate weight difference
    const predictionWeight = parseWeight(prediction.weight);
    const weightDiff = Math.abs(predictionWeight - actualWeightGrams);
    
    if (weightDiff < closestWeightDiff) {
      closestWeightDiff = weightDiff;
      weightWinner = prediction;
    }
  });
  
  return {
    dateWinner,
    dateTimeDifferenceMinutes: closestTimeDiff,
    weightWinner, 
    weightDifferenceGrams: closestWeightDiff
  };
};
