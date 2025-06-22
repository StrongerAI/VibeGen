import ImageGenerator from "@/components/image-generator";

export default function GeneratePage() {
  return (
    <main className="flex flex-col items-center justify-center p-4 md:p-8 min-h-full dark-splash-bg">
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-7xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          Image Generator
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Turn your most imaginative ideas into stunning visuals. Just type a prompt and let our AI bring your vision to life.
        </p>
      </div>
      <ImageGenerator />
    </main>
  );
}
