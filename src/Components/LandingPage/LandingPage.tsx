import React from "react";
import { Intro } from "./Intro/Intro";
import { Benefits } from "./Benefits/Benefits";
import { Team } from "./Team/Team";
import { Start } from "./Start/Start";
import { Footer } from "../Footer/Footer";

export const LandingPage = () => (
  <div>
    <Intro/>
    <Benefits/>
    <Team/>
    <Start/>
    <Footer/>
  </div>
);