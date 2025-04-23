
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
  // Normalize to ISO YYYY-MM-DD (assume input is YYYY-MM-DD)
  const date = dateStr ? new Date(dateStr) : null;
  return date ? date.toISOString().split("T")[0] : null;
}

function normalizeTime(timeStr: string) {
  // Normalize to "HH:mm" (assume input is "HH:mm")
  if (!timeStr) return null;
  return timeStr.length === 5 ? timeStr : null;
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
      gender: null, // You may add a UI field for this if needed later
      hair_color: formState.hairColor || null,
      eye_color: formState.eyeColor || null,
      hope_mom: formState.hopeMom || null,
      hope_dad: formState.hopeDad || null,
      resemblance: formState.resemblance || null,
      advice: formState.advice || null,
      normalized_date,
      normalized_time,
      is_lost: false
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
