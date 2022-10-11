import type { NextPage } from "next";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import Experience from "../threeScripts/Experience/Experience";

const Home: NextPage = () => {
  useEffect(() => {
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
    const experience = new Experience(canvas);
  }, []);
  return (
    <>
      <canvas id="canvas" className={styles.canvas} style={{ position: "relative" }}></canvas>
      <button className="button" id="plus" style={{ width: "100px", height: "50px", display: "flex", zIndex: "10", backgroundColor: "gray", position: "absolute", top: "0%", left: "0%", cursor: "pointer" }}>ボタンプラス</button>
      <button className="button" id="minus" style={{ width: "100px", height: "50px", display: "flex", zIndex: "10", backgroundColor: "gray", position: "absolute", top: "10%", left: "0%", cursor: "pointer" }}>ボタンマイナス</button>
    </>
  );
};

export default Home;
