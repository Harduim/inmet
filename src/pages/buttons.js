import React from "react";
import { useQuery } from "react-query";
import Plot from "react-plotly.js";
import { useParams, useNavigate } from "react-router-dom";

export function HomeButton() {
  let navigate = useNavigate();

  return (
    <section style={{textAlign: "center"}}>
      <button type="button" onClick={() => navigate("/scatter/A310")}>
        Go Scatter A310
      </button>
      <button type="button" onClick={() => navigate("/bar/A310")}>
        Go Bar A310
      </button>
      <button type="button" onClick={() => navigate("/animation")}>
        Go Animation
      </button>
      <button type="button" onClick={() => navigate("/animationFetch")}>
        Go Animation Fetch
      </button>
      <button type="button" onClick={() => navigate("/pageTest")}>
        Go Page Test
      </button>
    </section>
  );
}
