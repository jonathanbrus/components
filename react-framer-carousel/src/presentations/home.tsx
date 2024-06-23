"use client";

import { Carousel } from "@/components/carousel";

export const HomePage: React.FC = (props) => {
  return (
    <div style={{ width: "100dvw", height: "100dvh", display: "grid", placeItems: "center" }}>
      <Carousel />
    </div>
  );
};
