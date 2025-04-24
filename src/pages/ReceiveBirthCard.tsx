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
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage
} from "@/components/ui/form";

export default function ReceiveBirthCard() {
  const { t } = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  const form = useForm<BirthCardFormData>({
    resolver: zodResolver(BirthCardSchema),
    defaultValues: {
      card_type: 'digital',
      address: '',
      zip_code: ''
    }
  });

  const cardType = form.watch('card_type');

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
      form.reset();
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("fullName")}</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("email")}</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="card_type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>{t("cardType")}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("address")}</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zip_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("zipCode")}</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t("submitting") : t("submit")}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
