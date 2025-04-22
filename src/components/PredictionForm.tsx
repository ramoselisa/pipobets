
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

export function PredictionForm() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to a backend
    setSubmitted(true);
    toast({
      title: "Prediction Submitted!",
      description: "Thank you for your baby prediction!",
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
            <CardTitle className="text-2xl">Submit Your Prediction</CardTitle>
            <CardDescription>
              Join the fun and guess when the baby will arrive!
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="bg-secondary rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                  <Popcorn className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl">Thank You!</h3>
                <p className="text-muted-foreground">Your prediction has been submitted.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="Enter your name" required />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Due Date Prediction</Label>
                    <Input id="date" type="date" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time of Birth</Label>
                    <Input id="time" type="time" required />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input id="weight" placeholder="3.5" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="height">Length (cm)</Label>
                    <Input id="height" placeholder="50" required />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="hairColor">Hair Color</Label>
                    <Input id="hairColor" placeholder="Brown" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="eyeColor">Eye Color</Label>
                    <Input id="eyeColor" placeholder="Brown" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="hopeMom">Hope Baby Gets Mom's</Label>
                    <Input id="hopeMom" placeholder="e.g., Smile" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="hopeDad">Hope Baby Gets Dad's</Label>
                    <Input id="hopeDad" placeholder="e.g., Height" />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="resemblance">Baby Will Resemble</Label>
                  <Select>
                    <SelectTrigger id="resemblance">
                      <SelectValue placeholder="Select resemblance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mommy">Mommy</SelectItem>
                      <SelectItem value="daddy">Daddy</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="advice">Advice for the Parents</Label>
                  <Textarea id="advice" placeholder="Any special advice or thoughts?" />
                </div>
                
                <Button type="submit" className="w-full">
                  Submit Prediction
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
