import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToUtcMidnight(date: Date): string {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  ).toISOString();
}

export function getYouTubeThumbnail(
  url: string,
  quality: "default" | "mq" | "hq" | "sd" | "maxres" = "hq"
): string | null {
  try {
    const parsedUrl = new URL(url);

    let videoId = "";

    // Handle youtu.be/<id>
    if (parsedUrl.hostname === "youtu.be") {
      videoId = parsedUrl.pathname.slice(1); // remove the "/"
    }

    // Handle youtube.com/watch?v=<id>
    if (parsedUrl.hostname.includes("youtube.com")) {
      if (parsedUrl.pathname === "/watch") {
        videoId = parsedUrl.searchParams.get("v") ?? "";
      } else if (parsedUrl.pathname.startsWith("/shorts/")) {
        videoId = parsedUrl.pathname.split("/shorts/")[1];
      }
    }

    if (!videoId || videoId.length !== 11) return null;

    const qualityMap = {
      default: "default",
      mq: "mqdefault",
      hq: "hqdefault",
      sd: "sddefault",
      maxres: "maxresdefault",
    };

    return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
  } catch {
    return null;
  }
}
