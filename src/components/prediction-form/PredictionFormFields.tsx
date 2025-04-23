
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLocale } from "@/i18n/useLocale";
import { useTranslatedValues } from "@/hooks/useTranslatedValues";
import type { PredictionFormState } from "@/hooks/usePredictionForm";

interface PredictionFormFieldsProps {
  formState: PredictionFormState;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onResemblanceChange: (value: string) => void;
  onHairColorChange: (value: string) => void;
  onEyeColorChange: (value: string) => void;
}

export function PredictionFormFields({
  formState,
  loading,
  onSubmit,
  onChange,
  onResemblanceChange,
  onHairColorChange,
  onEyeColorChange
}: PredictionFormFieldsProps) {
  const { t } = useLocale();
  const { 
    getHairColorOptions, 
    getEyeColorOptions, 
    getResemblanceOptions 
  } = useTranslatedValues();

  const hairColorOptions = getHairColorOptions();
  const eyeColorOptions = getEyeColorOptions();
  const resemblanceOptions = getResemblanceOptions();

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="name">{t("yourName")}</Label>
        <Input 
          id="name" 
          placeholder={t("enterYourName")} 
          required 
          value={formState.name} 
          onChange={onChange} 
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="date">{t("dueDatePrediction")}</Label>
          <Input 
            id="date" 
            type="date" 
            required 
            value={formState.date} 
            onChange={onChange} 
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="time">{t("timeOfBirth")}</Label>
          <Input 
            id="time" 
            type="time" 
            required 
            value={formState.time} 
            onChange={onChange} 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="weight">{t("weight")}</Label>
          <Input 
            id="weight" 
            placeholder="3.5" 
            required 
            value={formState.weight} 
            onChange={onChange} 
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="height">{t("length")}</Label>
          <Input 
            id="height" 
            placeholder="50" 
            required 
            value={formState.height} 
            onChange={onChange} 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="hairColor">{t("hairColor")}</Label>
          <Select value={formState.hairColor} onValueChange={onHairColorChange}>
            <SelectTrigger id="hairColor">
              <SelectValue placeholder={t("hairColor")} />
            </SelectTrigger>
            <SelectContent>
              {hairColorOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="eyeColor">{t("eyeColor")}</Label>
          <Select value={formState.eyeColor} onValueChange={onEyeColorChange}>
            <SelectTrigger id="eyeColor">
              <SelectValue placeholder={t("eyeColor")} />
            </SelectTrigger>
            <SelectContent>
              {eyeColorOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="hopeMom">{t("hopeBabyGetsMoms")}</Label>
          <Input 
            id="hopeMom" 
            placeholder={t("hopeBabyGetsMoms")} 
            value={formState.hopeMom} 
            onChange={onChange} 
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="hopeDad">{t("hopeBabyGetsDads")}</Label>
          <Input 
            id="hopeDad" 
            placeholder={t("hopeBabyGetsDads")} 
            value={formState.hopeDad} 
            onChange={onChange} 
          />
        </div>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="resemblance">{t("babyWillResemble")}</Label>
        <Select value={formState.resemblance} onValueChange={onResemblanceChange}>
          <SelectTrigger id="resemblance">
            <SelectValue placeholder={t("resemblance.select")} />
          </SelectTrigger>
          <SelectContent>
            {resemblanceOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="advice">{t("adviceForParents")}</Label>
        <Textarea 
          id="advice" 
          placeholder={t("advicePlaceholder")} 
          value={formState.advice} 
          onChange={onChange} 
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? t("submitting") || "Submitting..." : t("submitBtn")}
      </Button>
    </form>
  );
}
