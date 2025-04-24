
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function ReceiveBirthCard() {
  const { t } = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Updated validation schema to make address and zip_code optional
  const BirthCardSchema = z.object({
    full_name: z.string().min(2, { message: t("fullName") + " " + t("isRequired") }),
    email: z.string().email({ message: t("email") + " " + t("isInvalid") }),
    address: z.string().optional(),
    zip_code: z.string().regex(/^[0-9A-Za-z\s-]{4,10}$/, { message: t("zipCodeInvalid") }).optional(),
    card_type: z.enum(['digital', 'physical'], {
      required_error: t("cardTypeRequired")
    })
  });

  type BirthCardFormData = z.infer<typeof BirthCardSchema>;

  const { 
    register, 
    handleSubmit, 
    reset,
    watch,
    formState: { errors } 
  } = useForm<BirthCardFormData>({
    resolver: zodResolver(BirthCardSchema),
    defaultValues: {
      card_type: 'digital'
    }
  });

  const cardType = watch('card_type');

  const onSubmit = async (data: BirthCardFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('birth_card_requests')
        .insert({
          full_name: data.full_name,
          email: data.email,
          address: data.address || null,
          zip_code: data.zip_code || null,
          card_type: data.card_type
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

            <div className="space-y-3">
              <Label>{t("cardType")}</Label>
              <RadioGroup 
                defaultValue="digital"
                {...register('card_type')}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="digital" id="digital" />
                  <Label htmlFor="digital">{t("digitalCard")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="physical" id="physical" />
                  <Label htmlFor="physical">{t("physicalCard")}</Label>
                </div>
              </RadioGroup>
              {errors.card_type && <p className="text-red-500 text-sm">{errors.card_type.message}</p>}
            </div>

            {cardType === 'physical' && (
              <>
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
              </>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? t("submitting") : t("submit")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
