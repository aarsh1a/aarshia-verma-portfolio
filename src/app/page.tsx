"use client";

import dynamic from "next/dynamic";
import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import { LandingHero } from "@/components/landing-hero";
import { PostItSection } from "@/components/post-it-section";
import { Analytics } from "@vercel/analytics/next"

const TechStack = dynamic(() => import("@/components/tech-stack").then(mod => mod.TechStack), { ssr: false });
const ChessStack = dynamic(() => import("@/components/chess-stack").then(mod => mod.ChessStack), { ssr: false });
const TimelineItem = dynamic(() => import("@/components/resume-card").then(mod => mod.TimelineItem), { ssr: false });
const ProjectCard = dynamic(() => import("@/components/project-card").then(mod => mod.ProjectCard), { ssr: false });
const CommonplaceBook = dynamic(() => import("@/components/commonplace-book").then(mod => mod.CommonplaceBook), { ssr: false });

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <main className="flex flex-col min-h-[100dvh] py-section-md">
        <LandingHero />

        <section id="work" className="mb-section-lg">
          <div className="space-y-12">
            <BlurFade delay={BLUR_FADE_DELAY * 17}>
              <h2 className="text-xl font-bold">experience</h2>
            </BlurFade>
            <div className="space-y-0">
              {DATA.technicalExperience.map((work, id) => (
                <BlurFade key={work.company} delay={BLUR_FADE_DELAY * 18 + id * 0.05}>
                  <TimelineItem
                    logoUrl={work.logoUrl}
                    altText={work.company}
                    title={work.company}
                    subtitle={work.title}
                    badges={work.badges}
                    period={`${work.start} - ${work.end ?? "Present"}`}
                    bullets={work.bullets}
                    tldr={"tldr" in work ? (work as any).tldr : undefined}
                    isLast={id === DATA.technicalExperience.length - 1}
                  />
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        <section id="tech-stack" className="mb-section-md">
          <ChessStack delay={BLUR_FADE_DELAY * 21} />
        </section>

        <section id="about-me" className="mb-8">
          <div className="space-y-4">
            <BlurFade delay={BLUR_FADE_DELAY * 22}>
              <p className="text-muted-foreground md:text-lg leading-relaxed text-center max-w-3xl mx-auto">
                i&apos;m particularly drawn to areas where computation intersects with analysis, modeling, or research, and i tend to use projects as a way to explore concepts rather than just as finished endpoints.
              </p>
            </BlurFade>
            <PostItSection delay={BLUR_FADE_DELAY * 23} />
          </div>
        </section>

        <section id="projects" className="mb-8">
          <div className="space-y-4">
            <BlurFade delay={BLUR_FADE_DELAY * 25}>
              <p className="text-muted-foreground md:text-lg leading-relaxed text-center max-w-3xl mx-auto">
                notes.
              </p>
            </BlurFade>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
              {DATA.projects.map((project, id) => (
                <BlurFade
                  key={project.title}
                  delay={BLUR_FADE_DELAY * 25 + id * 0.05}
                >
                  <ProjectCard
                    href={project.href}
                    key={project.title}
                    title={project.title}
                    description={project.description}
                    dates={project.dates}
                    tags={project.technologies}
                    image={project.image}
                    video={project.video}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        <section id="research" className="mb-section-lg">
          <CommonplaceBook delay={BLUR_FADE_DELAY * 27} />
        </section>
      </main>
    </div>
  );
}


