import type { Metadata } from "next";
import { LastShuttle } from "@/components/LastShuttle";
import "./last-shuttle.css";

const title = "Last Shuttle — An Interactive Sci-Fi Story";
const description =
  "An evacuation, a locked laboratory, and a colleague asking for help. Your choices decide who makes it out.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/last-shuttle/f_exterior.png", width: 1280, height: 720, alt: "Halden Station" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/last-shuttle/f_exterior.png"],
  },
};

export default function LastShuttlePage() {
  return <LastShuttle payoffs={{ cabin: "/last-shuttle/h_cabin.mp4", capsule: "/last-shuttle/h_capsule.mp4" }} />;
}
