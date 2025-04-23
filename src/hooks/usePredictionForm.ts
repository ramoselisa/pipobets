
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocale } from "@/i18n/useLocale";
import { supabase } from "@/integrations/supabase/client";

export type PredictionFormState = {
  name: string;
  date: string;
  time: string;
  weight: string;
  height: string;
  hairColor: string;
  eyeColor: string;
  hopeMom: string;
  hopeDad: string;
  resemblance: string;
  advice: string;
};

const initialFormState: PredictionFormState = {
  name: "",
  date: "",
  time: "",
  weight: "",
  height: "",
  hairColor: "",
  eyeColor: "",
  hopeMom: "",
  hopeDad: "",
  resemblance: "",
  advice: ""
};

export function usePredictionForm() {
  const [formState, setFormState] = useState<PredictionFormState>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const { t } = useLocale();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleResemblanceChange = (value: string) => {
    setFormState((prev) => ({
      ...prev,
      resemblance: value
    }));
  };

  const resetForm = () => {
    setFormState(initialFormState);
    setSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const normalized_date = normalizeDate(formState.date);
    const normalized_time = normalizeTime(formState.time);

    const payload = {
      name: formState.name,
      date: formState.date,
      time: formState.time || null,
      weight: formState.weight,
      height: formState.height,
      gender: null,
      hair_color: formState.hairColor || null,
      eye_color: formState.eyeColor || null,
      hope_mom: formState.hopeMom || null,
      hope_dad: formState.hopeDad || null,
      resemblance: formState.resemblance || null,
      advice: formState.advice || null,
      normalized_date,
      normalized_time,
      is_lost: false,
      approved: false,
      status: 'pending'
    };

    const { error } = await supabase.from("predictions").insert([payload]);
    setLoading(false);

    if (error) {
      toast({
        title: t("submissionFailed") || "Submission failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setSubmitted(true);
    toast({
      title: t("predictionSubmitted"),
      description: t("thankYouForPrediction"),
    });
    setTimeout(resetForm, 3000);
  };

  return {
    formState,
    loading,
    submitted,
    handleChange,
    handleResemblanceChange,
    handleSubmit
  };
}

function normalizeDate(dateStr: string) {
  if (!dateStr) return null;
  
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error("Error normalizing date:", error);
    return null;
  }
}

function normalizeTime(timeStr: string) {
  if (!timeStr) return null;
  
  try {
    const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
    if (!timeRegex.test(timeStr)) return null;
    
    const [hours, minutes] = timeStr.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  } catch (error) {
    console.error("Error normalizing time:", error);
    return null;
  }
}
