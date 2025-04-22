
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileSpreadsheet, Popcorn } from "lucide-react";

export function PredictionForm() {
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to a backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };
  
  return (
    <section className="container py-12">
      <div className="mx-auto max-w-md">
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
                
                <div className="grid gap-2">
                  <Label htmlFor="date">Due Date Prediction</Label>
                  <Input id="date" type="date" required />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="weight">Weight (lbs)</Label>
                    <Input id="weight" placeholder="7.5" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="height">Height (inches)</Label>
                    <Input id="height" placeholder="20" required />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="gender">Gender Prediction</Label>
                  <Select>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="boy">Boy</SelectItem>
                      <SelectItem value="girl">Girl</SelectItem>
                      <SelectItem value="surprise">Surprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="note">Note (Optional)</Label>
                  <Textarea id="note" placeholder="Any special thoughts or reasoning?" />
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
