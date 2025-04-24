
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto py-12 px-4">
        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden mb-12 shadow-xl">
          <img 
            src="/lovable-uploads/388cdf18-59b4-4cd1-ab26-5694db09efec.png" 
            alt="Baby shower gifts and happy moments" 
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* English Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <span>🇬🇧</span> Thank You
          </h2>
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <p>
              We are still smiling from all the love we felt during our baby shower. 💛
            </p>
            <p>
              To all our dear friends in Amsterdam — thank you for making this such a beautiful and emotional moment in our lives. Every hug, every kind word, every gift and surprise you prepared made us feel truly loved and supported.
            </p>
            <p>
              We feel incredibly lucky to be surrounded by such generous and caring people. Our little one is already so loved, and we are so grateful to welcome them into the world with a community like this.
            </p>
            <p>
              If you couldn't make it but would still like to send a little something, feel free to send a gift card from Amazon Netherlands.
            </p>
            <p>
              Just use the button below — and don't forget to send it to <span className="font-semibold">elisansr@gmail.com</span> 💌
            </p>
            <p className="font-medium">
              With love,<br />
              Elisa & Enrique 🧡
            </p>
          </div>
        </section>

        {/* Portuguese Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <span>🇧🇷</span> Obrigado
          </h2>
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <p>
              Ainda estamos sorrindo de tanto amor que sentimos durante o nosso chá de bebê. 💛
            </p>
            <p>
              A todos os nossos queridos amigos de Amsterdam — obrigada por fazerem deste momento algo tão bonito e emocionante em nossas vidas. Cada abraço, palavra carinhosa, presente e surpresa que vocês prepararam nos fez sentir imensamente amados e acolhidos.
            </p>
            <p>
              Nos sentimos muito sortudos por ter ao nosso redor pessoas tão generosas e carinhosas. Nosso bebê já é muito amado, e somos muito gratos por poder recebê-lo no mundo com uma comunidade assim.
            </p>
            <p>
              Se você não pôde estar presente mas quer enviar algo, sinta-se à vontade para nos mandar um vale-presente da Amazon Holanda.
            </p>
            <p>
              É só clicar no botão abaixo — e não esqueça de enviar para <span className="font-semibold">elisansr@gmail.com</span> 💌
            </p>
            <p className="font-medium">
              Com amor,<br />
              Elisa & Enrique 🧡
            </p>
          </div>
        </section>

        {/* Gift Card CTA */}
        <div className="text-center space-y-6 py-8 max-w-xl mx-auto">
          <p className="text-lg font-medium">📩 elisansr@gmail.com</p>
          <Button
            size="lg"
            asChild
            className="w-full md:w-auto"
          >
            <a
              href="https://www.amazon.nl/b/?ie=UTF8&node=16241984031&tag=nltxtgostdde-21"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <Gift />
              <span>🎁 Gifts for the Baby – Send a Gift Card</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
