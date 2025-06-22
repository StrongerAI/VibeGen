import ImageGenerator from "@/components/image-generator";
import Image from "next/image";

export default function GeneratePage() {
  return (
    <main className="flex flex-col items-center p-4 md:p-8 min-h-screen dark-splash-bg">
      <div className="text-center my-8 md:my-16">
        <h1 className="text-5xl md:text-7xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          Image Generator
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Turn your most imaginative ideas into stunning visuals. Just type a prompt and let our AI bring your vision to life.
        </p>
      </div>
      <ImageGenerator />

      <section className="w-full max-w-5xl mt-24 mb-16">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-headline font-bold">Inspiration Gallery</h2>
            <p className="mt-4 text-lg text-muted-foreground">
                Stuck for ideas? Here's what others are creating.
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
                <Image data-ai-hint="glowing jellyfish" width={400} height={400} className="w-full h-full object-cover" src="https://placehold.co/400x400.png" alt="A glowing jellyfish in the deep ocean" />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-sm font-body">"A glowing jellyfish in the deep ocean, surrounded by bioluminescent plankton, cinematic lighting..."</p>
                </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
                <Image data-ai-hint="futuristic city" width={400} height={400} className="w-full h-full object-cover" src="https://placehold.co/400x400.png" alt="A futuristic city at night" />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-sm font-body">"A futuristic cyberpunk city at night, with flying cars, neon signs, and towering skyscrapers, Blade Runner style..."</p>
                </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
                <Image data-ai-hint="enchanted forest" width={400} height={400} className="w-full h-full object-cover" src="https://placehold.co/400x400.png" alt="An enchanted forest" />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-sm font-body">"An enchanted forest with magical creatures, glowing mushrooms, and a mystical river, fantasy art..."</p>
                </div>
            </div>
        </div>
      </section>
    </main>
  );
}
