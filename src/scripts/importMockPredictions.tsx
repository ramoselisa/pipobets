
import { createClient } from '@supabase/supabase-js';
import { format, parse, isValid } from 'date-fns';

const SUPABASE_URL = "https://delemxcvtgxiuxygvvra.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbGVteGN2dGd4aXV4eWd2dnJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNjYwMTUsImV4cCI6MjA2MDk0MjAxNX0.6RSJ_T9lOhikNchU7fMSnv44tlfNrpKsMCOCHPJgSbA";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Data to import
const predictions = [
  {
    name: "Tia Celia",
    date: "27/04",
    time: "3:00",
    weight: "2.900",
    height: "41",
    hairColor: "",
    eyeColor: "",
    hopeMom: "",
    hopeDad: "",
    resemblance: "",
    advice: "",
    normalizedDate: "27-Apr-2025",
    normalizedTime: "03:00"
  },
  {
    name: "Camila",
    date: "06/05",
    time: "21:32",
    weight: "3.950",
    height: "43",
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
    weight: "3.80",
    height: "51",
    hairColor: "Brown",
    eyeColor: "Brown",
    hopeMom: "",
    hopeDad: "",
    resemblance: "Mommy",
    advice: "ENJOY!!!",
    normalizedDate: "09-May-2025",
    normalizedTime: "14:00"
  },
  {
    name: "Luiza",
    date: "08/05",
    time: "4:30am",
    weight: "3.300",
    height: "47",
    hairColor: "Preto",
    eyeColor: "Castanho",
    hopeMom: "Doçura",
    hopeDad: "Senso crítico",
    resemblance: "",
    advice: "Façam nada quando o bebê estiver chorando",
    normalizedDate: "08-May-2025",
    normalizedTime: "04:30"
  },
  {
    name: "Débora e Marcos",
    date: "11/05",
    time: "11:11",
    weight: "3.15",
    height: "46",
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
    name: "(Unnamed)",
    date: "01/05/25",
    time: "06:53",
    weight: "3.200",
    height: "43",
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
    weight: "3.120",
    height: "46",
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
    time: "",
    weight: "350",
    height: "50",
    hairColor: "Brown",
    eyeColor: "Brown",
    hopeMom: "Smile",
    hopeDad: "",
    resemblance: "Mommy",
    advice: "Go with the flow",
    normalizedDate: "14-May-2025",
    normalizedTime: null
  },
  {
    name: "(Unknown)",
    date: "4 de maio",
    time: "08:20",
    weight: "3200",
    height: "38",
    hairColor: "Castanho",
    eyeColor: "Escuro",
    hopeMom: "Doçura",
    hopeDad: "Cabelo",
    resemblance: "",
    advice: "Aproveitem todos os momentos!",
    normalizedDate: "04-May-2025",
    normalizedTime: "08:20"
  },
  {
    name: "Clara",
    date: "01/05",
    time: "11:11",
    weight: "2.875",
    height: "43",
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
    weight: "3.2",
    height: "38",
    hairColor: "Preto",
    eyeColor: "Castanho",
    hopeMom: "Zé Dengalinha",
    hopeDad: "Fingir que é raiz de tudo",
    resemblance: "Daddy",
    advice: "Não aceite advice de ninguém que não te passou um pix",
    normalizedDate: "29-Apr-2025",
    normalizedTime: "02:40"
  },
  {
    name: "Zinza",
    date: "6/5",
    time: "10:05",
    weight: "3.300",
    height: "405",
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
    name: "(Unknown)",
    date: "14/8/86",
    time: "20:00",
    weight: "70",
    height: "1.7",
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
    name: "(Unknown)",
    date: "2-5",
    time: "8:36",
    weight: "3.250",
    height: "51",
    hairColor: "Brown",
    eyeColor: "Brown",
    hopeMom: "",
    hopeDad: "",
    resemblance: "Mommy",
    advice: "",
    normalizedDate: "02-May-2025",
    normalizedTime: "08:36"
  },
  {
    name: "Anna & Marcelo",
    date: "10.05",
    time: "3:11",
    weight: "3.410",
    height: "49",
    hairColor: "Black",
    eyeColor: "Black",
    hopeMom: "Hair",
    hopeDad: "Personality",
    resemblance: "",
    advice: "Antes: durmam bastante. Depois: enjoy the ride every min",
    normalizedDate: "10-May-2025",
    normalizedTime: "03:11"
  },
  {
    name: "Bife",
    date: "15/04",
    time: "20:54",
    weight: "2.18",
    height: "35.6",
    hairColor: "Castanho",
    eyeColor: "Castanho",
    hopeMom: "Fogo no olh",
    hopeDad: "Mustache",
    resemblance: "Mommy",
    advice: "Levem a bebê pro The Cave todo sábado",
    normalizedDate: "15-Apr-2025",
    normalizedTime: "20:54"
  },
  {
    name: "Emilio",
    date: "5/5",
    time: "16:22",
    weight: "3.75",
    height: "40",
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
    weight: "2.2",
    height: "49",
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
    name: "(Unknown)",
    date: "4/12/98",
    time: "20:00",
    weight: "20",
    height: "1.2",
    hairColor: "Brown",
    eyeColor: "",
    hopeMom: "",
    hopeDad: "",
    resemblance: "",
    advice: "",
    normalizedDate: "04-May-2025",
    normalizedTime: "20:00"
  },
  {
    name: "Isca",
    date: "03/05",
    time: "16:25",
    weight: "3.45",
    height: "42",
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
    weight: "3.150",
    height: "51",
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
    weight: "2.6",
    height: "47",
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

// Function to import all predictions
async function importPredictions() {
  // First, delete existing predictions
  const { error: deleteError } = await supabase
    .from("predictions")
    .delete()
    .neq('id', '');

  if (deleteError) {
    console.error("Failed to delete existing predictions:", deleteError);
    return;
  }

  console.log("Deleted existing predictions");

  // Insert new predictions
  for (const pred of predictions) {
    const formattedPred = {
      name: pred.name,
      date: pred.normalizedDate,
      time: pred.normalizedTime,
      weight: pred.weight,
      height: pred.height,
      hair_color: pred.hairColor,
      eye_color: pred.eyeColor,
      hope_mom: pred.hopeMom,
      hope_dad: pred.hopeDad,
      resemblance: pred.resemblance,
      advice: pred.advice,
      normalized_date: pred.normalizedDate,
      normalized_time: pred.normalizedTime,
      is_lost: false,
      approved: true,
      status: 'approved'
    };

    const { error } = await supabase
      .from("predictions")
      .insert([formattedPred]);

    if (error) {
      console.error("Failed to insert prediction:", pred.name, error);
    } else {
      console.log("Inserted prediction for:", pred.name);
    }
  }

  console.log("Finished importing all predictions!");
}

// Run the import
importPredictions();

