"use client";

import SupernovaCanvas from "@/components/supernova";
import BlurFade from "@/components/magicui/blur-fade";

export default function SupernovaPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] py-section-md">
      <section className="mb-section-lg">
        <div className="space-y-content-lg">
          <BlurFade delay={0.1}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Cosmic Supernova
                </h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A 3D visualization of a starfield.
                </p>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.3}>
            <div className="relative w-full h-[500px] mx-auto">
              <SupernovaCanvas isInteractive={true} />
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}