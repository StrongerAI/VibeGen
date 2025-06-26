'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useAuth } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/ month",
    description: "Get started and see the magic.",
    features: [
      "10 image generations per month",
      "Standard resolution images",
      "Community support",
    ],
    cta: "Get Started",
    primary: false,
  },
  {
    name: "Pro",
    price: "$15",
    period: "/ month",
    description: "For creators who need more power.",
    features: [
      "200 image generations per month",
      "High resolution images",
      "Resolution enhancement tool",
      "Priority support",
    ],
    cta: "Go Pro",
    primary: true,
  },
  {
    name: "Visionary",
    price: "$49",
    period: "/ month",
    description: "Unleash your full creative potential.",
    features: [
      "Unlimited image generations",
      "Highest resolution images",
      "Advanced AI tuning options",
      "Dedicated support",
    ],
    cta: "Get Visionary",
    primary: false,
  },
];

export default function PricingPage() {
  const { user, handleSignIn } = useAuth();
  const router = useRouter();

  const handlePlanClick = (planName: string) => {
    if (user) {
      if (planName === 'Free') {
        router.push('/generate');
      } else {
        alert(`You have chosen the ${planName} plan. Payment integration is coming soon!`);
      }
    } else {
      handleSignIn();
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-4xl font-headline font-extrabold text-white sm:text-5xl">
          Choose Your Plan
        </h2>
        <p className="mt-4 text-xl text-muted-foreground">
          Unlock your creative potential with the perfect plan for your needs.
        </p>
      </div>
      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 ${plan.primary ? 'border-primary border-2 ring-2 ring-primary/50' : 'border-border/20'}`}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-headline">{plan.name}</CardTitle>
              <div className="mt-4 flex items-baseline justify-center">
                <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                <span className="ml-1 text-xl font-semibold text-muted-foreground">{plan.period}</span>
              </div>
              <CardDescription className="mt-2">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-accent" />
                    </div>
                    <p className="ml-3 text-base text-white">{feature}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant={plan.primary ? 'default' : 'secondary'} 
                size="lg"
                onClick={() => handlePlanClick(plan.name)}
              >
                {user ? plan.cta : "Sign In to Choose"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
