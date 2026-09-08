import { ImageResponse } from "next/og";

export const alt = "Sai Koushik — Software Engineer · AI · Backend · Full Stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#090B10",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#F3EFE6",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            border: "2px solid #C6A15B",
            transform: "rotate(45deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              transform: "rotate(-45deg)",
              fontSize: 22,
              color: "#F3EFE6",
            }}
          >
            SK
          </span>
        </div>

        <div
          style={{
            fontSize: 64,
            lineHeight: 1.15,
            maxWidth: 900,
            display: "flex",
          }}
        >
          Engineering intelligence into systems that actually ship.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 6,
            color: "#C6A15B",
          }}
        >
          <span>SAI KOUSHIK — SOFTWARE ENGINEER</span>
          <span>AI · BACKEND · FULL STACK · CLOUD</span>
        </div>
      </div>
    ),
    size
  );
}
