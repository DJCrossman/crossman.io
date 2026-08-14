import { existsSync } from "node:fs";
import path from "node:path";

/**
 * The original video files live outside the repo until David drops them in
 * (see public/videos/README.md). Pages are statically generated, so this
 * build-time check simply omits video sections whose files are absent —
 * no broken <video> tags or 404s in the meantime.
 */
export function videoFileExists(src: string): boolean {
  return existsSync(path.join(process.cwd(), "public", src));
}
