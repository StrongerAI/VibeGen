import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Highlighter, Feather, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col paint-splash-bg">
      {/* Hero Section */}
      <section className="w-full flex items-center justify-center text-center min-h-screen">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-8xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent transition-transform duration-300 hover:scale-105 cursor-pointer">
              VibeGen
            </h1>
            <p className="mt-4 text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto">
              Your vibes, visualized.
            </p>
            <p className="mt-16 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your text prompts into breathtaking images with the power of AI. Effortless, fast, and stunningly creative.
            </p>
            <div className="mt-12 flex justify-center gap-4">
              <Button asChild size="lg" className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/40">
                <Link href="/generate">
                  Start Creating <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 lg:py-24 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-headline font-bold">How It Works</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Create stunning art in three simple steps.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Card className="text-center border-border/20 bg-card/50 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <BrainCircuit className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4 font-headline text-xl">1. Describe Your Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Write a detailed prompt describing the image you want to create. The more specific, the better!
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-border/20 bg-card/50 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Feather className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4 font-headline text-xl">2. Generate Your Art</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our AI will interpret your text and generate a unique piece of art in seconds.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-border/20 bg-card/50 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Highlighter className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4 font-headline text-xl">3. Enhance & Download</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Love your creation? Enhance its resolution for crisp detail and download it to use anywhere.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="w-full py-20 lg:py-24">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-headline font-bold">From Words to Wonders</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              See what's possible with VibeGen.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="grid gap-4">
                  <div>
                      <Image data-ai-hint="fantasy landscape" width={500} height={800} className="h-auto max-w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" src="https://placehold.co/500x800.png" alt="A fantasy landscape"/>
                  </div>
                  <div>
                      <Image data-ai-hint="cyberpunk city" width={500} height={500} className="h-auto max-w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" src="https://placehold.co/500x500.png" alt="A cyberpunk city"/>
                  </div>
              </div>
              <div className="grid gap-4">
                  <div>
                      <Image data-ai-hint="abstract art" width={500} height={500} className="h-auto max-w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" src="https://placehold.co/500x500.png" alt="Abstract art"/>
                  </div>
                  <div>
                      <Image data-ai-hint="portrait photo" width={500} height={800} className="h-auto max-w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" src="https://placehold.co/500x800.png" alt="A portrait"/>
                  </div>
              </div>
              <div className="grid gap-4">
                  <div>
                      <Image data-ai-hint="wildlife photography" width={500} height={800} className="h-auto max-w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" src="https://placehold.co/500x800.png" alt="Wildlife photography"/>
                  </div>
                  <div>
                      <Image data-ai-hint="product design" width={500} height={500} className="h-auto max-w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" src="https://placehold.co/500x500.png" alt="A futuristic product"/>
                  </div>
              </div>
              <div className="grid gap-4">
                  <div>
                      <Image data-ai-hint="space nebula" width={500} height={500} className="h-auto max-w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" src="https://placehold.co/500x500.png" alt="A space nebula"/>
                  </div>
                  <div>
                       <Image data-ai-hint="underwater scene" width={500} height={800} className="h-auto max-w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" src="https://placehold.co/500x800.png" alt="An underwater scene"/>
                  </div>
              </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full py-20 lg:py-24 bg-muted/20">
        <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-headline font-bold">Ready to Create?</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Join thousands of creators turning their imagination into reality. Your next masterpiece is just a prompt away.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/40">
              <Link href="/generate">
                Start Generating Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
