
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { SubmissionSuccess } from "./prediction-form/SubmissionSuccess";
import { PredictionFormFields } from "./prediction-form/PredictionFormFields";
import { usePredictionForm } from "@/hooks/usePredictionForm";

export function PredictionForm() {
  const { t } = useLocale();
  const {
    formState,
    loading,
    submitted,
    handleChange,
    handleResemblanceChange,
    handleHairColorChange,
    handleEyeColorChange,
    handleSubmit
  } = usePredictionForm();

  return (
    <section id="prediction-form" className="container py-12">
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
              <SubmissionSuccess />
            ) : (
              <PredictionFormFields
                formState={formState}
                loading={loading}
                onSubmit={handleSubmit}
                onChange={handleChange}
                onResemblanceChange={handleResemblanceChange}
                onHairColorChange={handleHairColorChange}
                onEyeColorChange={handleEyeColorChange}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
