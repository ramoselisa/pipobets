
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { useLocale } from "@/i18n/useLocale";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Validation schema for birth card request
const BirthCardSchema = z.object({
  full_name: z.string().min(2, { message: "Nome completo é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  address: z.string().min(5, { message: "Endereço é obrigatório" }),
  zip_code: z.string().regex(/^\d{5}-\d{3}$/, { message: "CEP inválido (formato: 12345-678)" })
});

type BirthCardFormData = z.infer<typeof BirthCardSchema>;

export default function ReceiveBirthCard() {
  const { t } = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm<BirthCardFormData>({
    resolver: zodResolver(BirthCardSchema)
  });

  const onSubmit = async (data: BirthCardFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('birth_card_requests')
        .insert({
          full_name: data.full_name,
          email: data.email,
          address: data.address,
          zip_code: data.zip_code
        });

      if (error) throw error;

      toast.success(t("birthCardRequestSubmitted"));
      reset();
    } catch (error) {
      console.error('Birth Card Request Error:', error);
      toast.error(t("birthCardRequestFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-12">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{t("requestBirthCard")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input 
                {...register('full_name')}
                placeholder={t("fullName")} 
                disabled={isSubmitting}
              />
              {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name.message}</p>}
            </div>
            <div>
              <Input 
                {...register('email')}
                type="email"
                placeholder={t("email")} 
                disabled={isSubmitting}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <Input 
                {...register('address')}
                placeholder={t("address")} 
                disabled={isSubmitting}
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            </div>
            <div>
              <Input 
                {...register('zip_code')}
                placeholder={t("zipCode")} 
                disabled={isSubmitting}
              />
              {errors.zip_code && <p className="text-red-500 text-sm">{errors.zip_code.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? t("submitting") : t("submit")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
