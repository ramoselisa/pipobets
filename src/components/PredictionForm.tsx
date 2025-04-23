
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileSpreadsheet, Popcorn } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useLocale } from "@/i18n/useLocale";
import { supabase } from "@/integrations/supabase/client";

function normalizeDate(dateStr: string) {
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

function normalizeTime(timeStr: string) {
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

export function PredictionForm() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const { t } = useLocale();
  const [formState, setFormState] = useState({
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
  });
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Compute normalized fields
    const normalized_date = normalizeDate(formState.date);
    const normalized_time = normalizeTime(formState.time);

    // Prepare payload to match database schema
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
      approved: false
    };

    console.log("Submitting prediction with normalized data:", {
      normalized_date,
      normalized_time,
      payload
    });

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
    setTimeout(() => setSubmitted(false), 3000);

    // Reset form after submit
    setFormState({
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
    });
  };

  return (
    <section className="container py-12">
      <div className="mx-auto max-w-2xl">
        <Card className="border-2 border-primary/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <FileSpreadsheet className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">{t("submitPrediction")}</CardTitle>
            <CardDescription>
              {t("joinTheFun")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="bg-secondary rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                  <Popcorn className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl">{t("thankYou")}</h3>
                <p className="text-muted-foreground">{t("thankYouMsg")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">{t("yourName")}</Label>
                  <Input id="name" placeholder={t("enterYourName")} required value={formState.name} onChange={handleChange} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">{t("dueDatePrediction")}</Label>
                    <Input id="date" type="date" required value={formState.date} onChange={handleChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">{t("timeOfBirth")}</Label>
                    <Input id="time" type="time" required value={formState.time} onChange={handleChange} />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="weight">{t("weight")}</Label>
                    <Input id="weight" placeholder="3.5" required value={formState.weight} onChange={handleChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="height">{t("length")}</Label>
                    <Input id="height" placeholder="50" required value={formState.height} onChange={handleChange} />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="hairColor">{t("hairColor")}</Label>
                    <Input id="hairColor" placeholder={t("hairColor")} value={formState.hairColor} onChange={handleChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="eyeColor">{t("eyeColor")}</Label>
                    <Input id="eyeColor" placeholder={t("eyeColor")} value={formState.eyeColor} onChange={handleChange} />
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="hopeMom">{t("hopeBabyGetsMoms")}</Label>
                    <Input id="hopeMom" placeholder={t("hopeBabyGetsMoms")} value={formState.hopeMom} onChange={handleChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="hopeDad">{t("hopeBabyGetsDads")}</Label>
                    <Input id="hopeDad" placeholder={t("hopeBabyGetsDads")} value={formState.hopeDad} onChange={handleChange} />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="resemblance">{t("babyWillResemble")}</Label>
                  <Select value={formState.resemblance} onValueChange={handleResemblanceChange}>
                    <SelectTrigger id="resemblance">
                      <SelectValue placeholder={t("resemblance.select")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mommy">{t("resemblance.mommy")}</SelectItem>
                      <SelectItem value="daddy">{t("resemblance.daddy")}</SelectItem>
                      <SelectItem value="other">{t("resemblance.other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="advice">{t("adviceForParents")}</Label>
                  <Textarea id="advice" placeholder={t("advicePlaceholder")} value={formState.advice} onChange={handleChange} />
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? t("submitting") || "Submitting..." : t("submitBtn")}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
