import React from 'react';
import './styles/home.css'; 

import { useState, useEffect } from "react";
import headerImg from "./assets/img/header-img.svg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

const Home = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ " Let's Get Started!" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="home">
      <div className="grid-container">
        <div className="content">
          <TrackVisibility>
            {({ isVisible }) =>
            <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
              <span className="tagline">SmartSightAI</span>
              <h1>{`Ready to Dive into a World of Artificial Intelligence?`} <span className="txt-rotate" dataPeriod="1000" ><span className="wrap">{text}</span></span></h1>
                <p>SmartSightAI is a computer vision system that can identify and process objects that computers see like humans!</p>
                <button onClick={() => console.log('connect')}>Let’s Connect <ArrowRightCircle size={25} /></button>
            </div>}
          </TrackVisibility>
        </div>
        <div className="image">
          <TrackVisibility>
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                <img src={headerImg} alt="Header Img"/>
              </div>}
          </TrackVisibility>
        </div>
      </div>
    </section>
  )
}
export default Home;
