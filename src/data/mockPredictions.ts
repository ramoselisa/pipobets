import { PredictionProps } from "@/components/PredictionCard";
import { isAfter, parseISO } from "date-fns";

// Get today's date
const today = new Date();

// Mock data based on the provided table
export const mockPredictions: PredictionProps[] = [
  {
    name: "Tia Celia",
    date: "27/04",
    time: "3:00",
    weight: "2.900 kg",
    height: "41 cm",
    normalizedDate: "27-Apr-2025",
    normalizedTime: "03:00",
    isLost: isAfter(today, parseISO("2025-04-27"))
  },
  {
    name: "Camila",
    date: "06/05",
    time: "21:32",
    weight: "3.950 kg",
    height: "43 cm",
    hairColor: "Black",
    eyeColor: "Castanho",
    hopeMom: "Personality",
    hopeDad: "Ears",
    resemblance: "Mommy",
    advice: "Muita paciência, muito amor, e contar com o amigo",
    normalizedDate: "06-May-2025",
    normalizedTime: "21:32"
  },
  {
    name: "Mari (ACABS, CHI)",
    date: "May 9th",
    time: "14h",
    weight: "3.80 kg",
    height: "51 cm",
    hairColor: "Brown",
    eyeColor: "Brown",
    resemblance: "Mommy",
    advice: "ENJOY!!!",
    normalizedDate: "09-May-2025",
    normalizedTime: "14:00"
  },
  {
    name: "Luiza",
    date: "08/05",
    time: "4:30am",
    weight: "3.300 kg",
    height: "47 cm",
    hairColor: "Preto",
    eyeColor: "Castanho",
    hopeMom: "Dançarina",
    hopeDad: "Senso crítico",
    advice: "Façam nada quando o bebê estiver chorando",
    normalizedDate: "08-May-2025",
    normalizedTime: "04:30"
  },
  {
    name: "Débora e Marcos",
    date: "11/05",
    time: "11:11",
    weight: "3.15 kg",
    height: "46 cm",
    hairColor: "Castanho",
    eyeColor: "Castanho escuro",
    hopeMom: "Nariz",
    hopeDad: "Abelo",
    resemblance: "Daddy",
    advice: "Aproveitem esta nova fase",
    normalizedDate: "11-May-2025",
    normalizedTime: "11:11"
  },
  {
    name: "Anonymous",
    date: "01/05/25",
    time: "06:53",
    weight: "3.200 kg",
    height: "43 cm",
    hairColor: "Black",
    eyeColor: "Dark Brown",
    hopeMom: "Maciez skin",
    hopeDad: "Commisia",
    resemblance: "Daddy",
    advice: "Create good memories! Always be present",
    normalizedDate: "01-May-2025",
    normalizedTime: "06:53"
  },
  {
    name: "Leandro",
    date: "02/05",
    time: "17:21",
    weight: "3.120 kg",
    height: "46 cm",
    hairColor: "Castanho",
    eyeColor: "Castanho",
    hopeMom: "Vibes",
    hopeDad: "Curiosidade",
    resemblance: "Mommy",
    advice: "Troca fralda entre o mão de cada peido!",
    normalizedDate: "02-May-2025",
    normalizedTime: "17:21"
  },
  {
    name: "Joris",
    date: "14 May",
    weight: "350 g",
    height: "50 cm",
    hairColor: "Brown",
    eyeColor: "Brown",
    hopeMom: "Smile",
    resemblance: "Mommy",
    advice: "Go with the flow",
    normalizedDate: "14-May-2025"
  },
  {
    name: "Anonymous",
    date: "4 de maio",
    time: "08:20",
    weight: "3200 g",
    height: "38 cm",
    hairColor: "Castanho",
    eyeColor: "Escuro",
    hopeMom: "Dançarina",
    hopeDad: "Cabelo",
    advice: "Aproveitem todos os momentos!",
    normalizedTime: "08:20"
  },
  {
    name: "Clara",
    date: "01/05",
    time: "11:11",
    weight: "2.875 kg",
    height: "43 cm",
    hairColor: "Black",
    eyeColor: "Brown",
    hopeMom: "Energia",
    hopeDad: "Tom de pele",
    resemblance: "Daddy",
    advice: "Manter seu filho vivo",
    normalizedDate: "01-May-2025",
    normalizedTime: "11:11"
  },
  {
    name: "Carol",
    date: "29/04",
    time: "02:40",
    weight: "3.2 kg",
    height: "38 cm",
    hairColor: "Preto",
    eyeColor: "Castanho",
    hopeMom: "Zé Dengalinha",
    hopeDad: "Fingir que é raiz de tudo",
    resemblance: "Daddy",
    advice: "Não aceite advice de ninguém que não te passou um pix",
    normalizedDate: "29-Apr-2025",
    normalizedTime: "02:40",
    isLost: isAfter(today, parseISO("2025-04-29"))
  },
  {
    name: "Zinza",
    date: "6/5",
    time: "10:05",
    weight: "3.300 kg",
    height: "405 cm",
    hairColor: "Preto",
    eyeColor: "Castanho claro",
    hopeMom: "Dance moves",
    hopeDad: "Hair",
    resemblance: "Daddy",
    advice: "Muito amor!",
    normalizedDate: "06-May-2025",
    normalizedTime: "10:05"
  },
  {
    name: "Anonymous",
    date: "14/8/86",
    time: "20:00",
    weight: "70 kg",
    height: "1.7 m",
    hairColor: "Castanho",
    eyeColor: "Castanho",
    hopeMom: "Atividade",
    hopeDad: "Humor",
    resemblance: "Mommy",
    advice: "Divirtam-se",
    normalizedDate: "14-Aug-2025",
    normalizedTime: "20:00"
  },
  {
    name: "Anonymous",
    date: "2-5",
    time: "8:36",
    weight: "3.250 kg",
    height: "51 cm",
    hairColor: "Brown",
    eyeColor: "Brown",
    resemblance: "Mommy",
    normalizedDate: "02-May-2025",
    normalizedTime: "08:36"
  },
  {
    name: "Anna & Marcelo",
    date: "10.05",
    time: "3:11",
    weight: "3.410 kg",
    height: "49 cm",
    hairColor: "Black",
    eyeColor: "Black",
    hopeMom: "Hair",
    hopeDad: "Personality",
    advice: "Antes: durmam bastante. Depois: enjoy the ride every min",
    normalizedDate: "10-May-2025",
    normalizedTime: "03:11"
  },
  {
    name: "Bife",
    date: "15/04",
    time: "20:54",
    weight: "2.18 kg",
    height: "35.6 cm",
    hairColor: "Castanho",
    eyeColor: "Castanho",
    hopeMom: "Fogo no olh",
    hopeDad: "Mustache",
    resemblance: "Mommy",
    advice: "Levem a bebê pro The Cave todo sábado",
    normalizedDate: "15-Apr-2025",
    normalizedTime: "20:54",
    isLost: isAfter(today, parseISO("2025-04-15"))
  },
  {
    name: "Emilio",
    date: "5/5",
    time: "16:22",
    weight: "3.75 kg",
    height: "40 cm",
    hairColor: "Brown",
    eyeColor: "Brown",
    hopeMom: "Hair",
    hopeDad: "Humor",
    resemblance: "Daddy",
    advice: "SLEEP NOW! BE U",
    normalizedDate: "05-May-2025",
    normalizedTime: "16:22"
  },
  {
    name: "Jéssica e Paulo",
    date: "01-05",
    time: "17:15",
    weight: "2.2 kg",
    height: "49 cm",
    hairColor: "Castanho medio",
    eyeColor: "Castanho medio",
    hopeMom: "Alegria :)",
    hopeDad: "Humor",
    resemblance: "Mommy",
    advice: "Aproveitem cada momento, sejam pacientes, vocês são suficientes!",
    normalizedDate: "01-May-2025",
    normalizedTime: "17:15"
  },
  {
    name: "Anonymous",
    date: "4/12/98",
    time: "20:00",
    weight: "20 kg",
    height: "1.2 m",
    hairColor: "Brown",
    normalizedDate: "04-May-2025",
    normalizedTime: "20:00"
  },
  {
    name: "Iza",
    date: "03/05",
    time: "16:25",
    weight: "3.45 kg",
    height: "42 cm",
    hairColor: "Castanho",
    eyeColor: "Castanho",
    hopeMom: "Personalidade",
    hopeDad: "Conhecimento",
    resemblance: "Daddy",
    advice: "Aproveitem cada momento e isso que importa",
    normalizedDate: "03-May-2025",
    normalizedTime: "16:25"
  },
  {
    name: "Karla & Duda",
    date: "01/5/25",
    time: "09:27",
    weight: "3.150 kg",
    height: "51 cm",
    hairColor: "Black",
    eyeColor: "Black",
    hopeMom: "High energy",
    hopeDad: "Curiosity",
    resemblance: "Daddy",
    advice: "Forma inspira a nós pra dormir amor sem pressa! Aproveitem mais!",
    normalizedDate: "01-May-2025",
    normalizedTime: "09:27"
  },
  {
    name: "Caio",
    date: "01/05",
    time: "17:30",
    weight: "2.6 kg",
    height: "47 cm",
    hairColor: "Brown",
    eyeColor: "Brown",
    hopeMom: "Makei",
    hopeDad: "Charisma",
    resemblance: "Mommy",
    advice: "Vocês já são perfeitos! Amo muito vcs!!",
    normalizedDate: "01-May-2025",
    normalizedTime: "17:30"
  }
];

// Get statistics 
export const getPredictionStats = () => {
  const dateCount: Record<string, number> = {};
  const resemblanceCount: Record<string, number> = { "Mommy": 0, "Daddy": 0, "Other": 0 };
  const traits: { mom: Record<string, number>, dad: Record<string, number> } = { mom: {}, dad: {} };
  const lostCount = mockPredictions.filter(p => p.isLost).length;
  
  mockPredictions.forEach(prediction => {
    // Count dates
    if (prediction.date) {
      dateCount[prediction.date] = (dateCount[prediction.date] || 0) + 1;
    }
    
    // Count resemblance
    if (prediction.resemblance) {
      if (prediction.resemblance.toLowerCase().includes("mom")) {
        resemblanceCount["Mommy"]++;
      } else if (prediction.resemblance.toLowerCase().includes("dad")) {
        resemblanceCount["Daddy"]++;
      } else {
        resemblanceCount["Other"]++;
      }
    }
    
    // Count traits
    if (prediction.hopeMom) {
      traits.mom[prediction.hopeMom] = (traits.mom[prediction.hopeMom] || 0) + 1;
    }
    if (prediction.hopeDad) {
      traits.dad[prediction.hopeDad] = (traits.dad[prediction.hopeDad] || 0) + 1;
    }
  });
  
  return {
    dateCount,
    resemblanceCount,
    traits,
    total: mockPredictions.length,
    lostCount
  };
};
