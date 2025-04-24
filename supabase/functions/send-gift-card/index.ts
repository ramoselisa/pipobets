
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GiftCardRequest {
  fullName: string;
  email: string;
  address: string;
  zipCode: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, email, address, zipCode }: GiftCardRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "Pipo Gift Cards <onboarding@resend.dev>",
      to: [email],
      subject: "Your Pipo Gift Card Request Confirmation",
      html: `
        <h1>Thank you for requesting a gift card, ${fullName}!</h1>
        <p>We have received your request and will send a beautiful gift card to:</p>
        <p>${fullName}<br>${address}<br>${zipCode}</p>
        <p>Best regards,<br>The Pipo Team</p>
      `,
    });

    console.log("Gift card confirmation email sent:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error("Error in send-gift-card function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

serve(handler);
