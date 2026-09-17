import Image from "next/image";
import type { Project } from "@/content/projects";

/**
 * A project either has a screenshot of something publicly reachable, or it gets
 * a drawn diagram. There is deliberately no third state: an empty grey box on a
 * portfolio reads as an unfinished portfolio.
 */
export function ProjectVisual({ project, priority }: { project: Project; priority?: boolean }) {
  if (project.visual === "diagram") {
    return <ProjectDiagram id={project.id} />;
  }

  return (
    <Image
      src={`/projects/${project.id}.webp`}
      alt={`${project.name} — ${project.hook}`}
      width={1600}
      height={1000}
      priority={priority}
      sizes="(max-width: 768px) 100vw, 55vw"
      className="h-full w-full object-cover object-top"
    />
  );
}

/** Drawn stand-ins for work with no public UI to screenshot. */
function ProjectDiagram({ id }: { id: string }) {
  if (id === "ai-cctv") return <CctvDiagram />;
  return <LatticePanel />;
}

/**
 * The CCTV product in one frame: a shop aisle, a tracked subject, a detection
 * box, and the alert leaving for WhatsApp.
 */
function CctvDiagram() {
  return (
    <svg
      viewBox="0 0 800 500"
      className="h-full w-full bg-surface"
      role="img"
      aria-label="A detection box drawn around a figure at a shop shelf, with an alert sent to WhatsApp"
    >
      <defs>
        <pattern id="cctv-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="rgba(242,239,232,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="800" height="500" fill="url(#cctv-grid)" />

      {/* Shelving */}
      <g stroke="rgba(242,239,232,0.22)" strokeWidth="2" fill="none">
        <rect x="70" y="120" width="230" height="300" />
        <path d="M70 200h230M70 280h230M70 360h230" />
        <rect x="500" y="120" width="230" height="300" />
        <path d="M500 200h230M500 280h230M500 360h230" />
      </g>

      {/* Stock on the shelves */}
      <g fill="rgba(242,239,232,0.14)">
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <rect
              key={`l${row}-${col}`}
              x={84 + col * 54}
              y={160 + row * 80}
              width="38"
              height="30"
            />
          )),
        )}
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <rect
              key={`r${row}-${col}`}
              x={514 + col * 54}
              y={160 + row * 80}
              width="38"
              height="30"
            />
          )),
        )}
      </g>

      {/* Subject */}
      <g fill="rgba(242,239,232,0.5)">
        <circle cx="400" cy="215" r="26" />
        <path d="M368 258h64l14 120h-92z" />
        <path d="M372 378h24v46h-24zM404 378h24v46h-24z" />
      </g>

      {/* Detection box */}
      <g>
        <rect
          x="336"
          y="176"
          width="128"
          height="262"
          fill="rgba(229,18,59,0.07)"
          stroke="#e5123b"
          strokeWidth="2.5"
        />
        {/* Corner brackets */}
        <g stroke="#e5123b" strokeWidth="5" fill="none" strokeLinecap="square">
          <path d="M336 200v-24h24M440 176h24v24M464 414v24h-24M360 438h-24v-24" />
        </g>
        <rect x="336" y="146" width="150" height="24" fill="#e5123b" />
        <text
          x="344"
          y="163"
          fill="#ffffff"
          fontSize="13"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.06em"
        >
          THEFT 0.91
        </text>
      </g>

      {/* Alert path */}
      <g>
        <path
          d="M486 158C560 120 620 96 700 82"
          fill="none"
          stroke="#e5123b"
          strokeWidth="2"
          strokeDasharray="6 7"
        />
        <rect x="628" y="34" width="142" height="52" fill="#131315" stroke="#e5123b" strokeWidth="2" />
        <text
          x="648"
          y="56"
          fill="#f2efe8"
          fontSize="13"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
        >
          WhatsApp
        </text>
        <text x="648" y="74" fill="#8a877f" fontSize="11" fontFamily="system-ui, sans-serif">
          alert to owner
        </text>
      </g>

      {/* Pipeline caption */}
      <text
        x="40"
        y="476"
        fill="#8a877f"
        fontSize="12"
        fontWeight="600"
        letterSpacing="0.16em"
        fontFamily="system-ui, sans-serif"
      >
        CCTV FEED → YOLOv11 (ROBOFLOW) → TWILIO
      </text>
    </svg>
  );
}

/** Generic geometric panel, in case a future diagram project has no drawing yet. */
function LatticePanel() {
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full bg-surface" role="presentation">
      <rect width="800" height="500" fill="#131315" />
      <g stroke="rgba(242,239,232,0.16)" fill="none">
        {Array.from({ length: 9 }).map((_, i) => (
          <circle key={i} cx="400" cy="250" r={30 + i * 26} />
        ))}
      </g>
    </svg>
  );
}
