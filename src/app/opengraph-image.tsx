import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { MARK_PATH, MARK_VIEWBOX } from "@/components/logo-path";
import { site } from "@/lib/site";

export const alt = `${site.legalName} — ${site.eyebrow}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "src/assets/fonts");

export default async function OpengraphImage() {
  const [cinzel, montserrat] = await Promise.all([
    readFile(join(fontDir, "Cinzel-SemiBold.ttf")),
    readFile(join(fontDir, "Montserrat-Light.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #061320 0%, #0A1D2F 50%, #13323F 100%)",
          position: "relative",
        }}
      >
        {/* Gold bloom */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 350,
            width: 500,
            height: 400,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.0) 70%)",
          }}
        />

        <svg width={168} height={145} viewBox={MARK_VIEWBOX}>
          <path d={MARK_PATH} fill="#D4AF37" />
        </svg>

        <div
          style={{
            marginTop: 40,
            fontFamily: "Cinzel",
            fontSize: 78,
            letterSpacing: 10,
            color: "#E7C86B",
            textTransform: "uppercase",
          }}
        >
          Ma Revia
        </div>

        <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
          <div style={{ width: 60, height: 1, background: "#8A7331" }} />
          <div
            style={{
              margin: "0 22px",
              fontFamily: "Montserrat",
              fontSize: 22,
              letterSpacing: 14,
              color: "#D4AF37",
              textTransform: "uppercase",
            }}
          >
            Marine
          </div>
          <div style={{ width: 60, height: 1, background: "#8A7331" }} />
        </div>

        <div
          style={{
            marginTop: 52,
            fontFamily: "Montserrat",
            fontSize: 21,
            letterSpacing: 9,
            color: "#C8B69A",
            textTransform: "uppercase",
          }}
        >
          {site.eyebrow}
        </div>

        <div
          style={{
            marginTop: 26,
            fontFamily: "Montserrat",
            fontSize: 24,
            color: "#54797A",
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cinzel", data: cinzel, style: "normal", weight: 600 },
        { name: "Montserrat", data: montserrat, style: "normal", weight: 300 },
      ],
    },
  );
}
