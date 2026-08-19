"use client";

import { useState } from "react";
import styles from "./portfolio.module.css";
import LoadingScreen from "./LoadingScreen";
import PortfolioHero from "./PortfolioHero";
import SelectedWorks from "./SelectedWorks";
import Explorations from "./Explorations";
import PortfolioStats from "./PortfolioStats";
import PortfolioFooter from "./PortfolioFooter";

export default function VikashPortfolio() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.root}>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <PortfolioHero />
      <SelectedWorks />
      <Explorations />
      <PortfolioStats />
      <PortfolioFooter />
    </div>
  );
}
