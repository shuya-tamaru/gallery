import type { NextPage } from "next";
import * as THREE from "three";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return <canvas id="canvas" className={styles.canvas}></canvas>;
};

export default Home;
