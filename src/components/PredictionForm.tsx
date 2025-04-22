
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

export function PredictionForm() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const { t } = useLocale();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to a backend
    setSubmitted(true);
    toast({
      title: t("predictionSubmitted"),
      description: t("thankYouForPrediction"),
    });
    setTimeout(() => setSubmitted(false), 3000);
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
                  <Input id="name" placeholder={t("enterYourName")} required />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">{t("dueDatePrediction")}</Label>
                    <Input id="date" type="date" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">{t("timeOfBirth")}</Label>
                    <Input id="time" type="time" required />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="weight">{t("weight")}</Label>
                    <Input id="weight" placeholder="3.5" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="height">{t("length")}</Label>
                    <Input id="height" placeholder="50" required />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="hairColor">{t("hairColor")}</Label>
                    <Input id="hairColor" placeholder={t("hairColor")} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="eyeColor">{t("eyeColor")}</Label>
                    <Input id="eyeColor" placeholder={t("eyeColor")} />
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="hopeMom">{t("hopeBabyGetsMoms")}</Label>
                    <Input id="hopeMom" placeholder={t("hopeBabyGetsMoms")} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="hopeDad">{t("hopeBabyGetsDads")}</Label>
                    <Input id="hopeDad" placeholder={t("hopeBabyGetsDads")} />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="resemblance">{t("babyWillResemble")}</Label>
                  <Select>
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
                  <Textarea id="advice" placeholder={t("advicePlaceholder")} />
                </div>
                
                <Button type="submit" className="w-full">
                  {t("submitBtn")}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
