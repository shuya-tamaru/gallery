import type { NextPage } from "next";
import { useEffect } from "react";
import * as THREE from "three";
import styles from "../styles/Home.module.css";
import Experience from "../threeScripts/Experience/Experience";

const Home: NextPage = () => {
  useEffect(() => {
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
    const experience = new Experience(canvas);
  }, []);
  return <canvas id="canvas" className={styles.canvas}></canvas>;
};

export default Home;
