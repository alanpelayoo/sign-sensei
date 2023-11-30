import React, { useState, useEffect, useRef } from 'react'
import styles from './CustomWebcam.module.css';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import Webcam from "react-webcam";

import axios from 'axios';
import signLanguageMessages from '../utils/signLanguageMessages.json';


function CustomWebcam({letter, onClose}) {
  const [buttonS, setButtonS] = useState(true);
  const [buttonR, setButtonR] = useState(false);
  const [instructionsT, setInstructionsT] = useState(signLanguageMessages[letter]);
  const [countdown, setCountdown] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const webcamRef = useRef(null);
  
  const handleReset = () => {
    setCapturedImage(null);
    setButtonR(false);
    setInstructionsT("Ok, let's do this again");
    setButtonS(true);
  }

  const handleStart = () => {
    setInstructionsT("")
    setButtonS(false)
    setCountdown(5)
  }

  const handleImage = async (imageC) =>{
    console.log('handeling')
    setInstructionsT("Nice photo 📷 we are processing it!")
    setLoading(true)
    try {
      const response = await axios.post('https://sign-sensei-599cc9371017.herokuapp.com/predict2', {
        //image sent in base64
        letter: letter,
        imageSrc: imageC
      });

      setInstructionsT(response.data.content);
    } catch (error) {
      console.error('Error fetching data:', error);
      setInstructionsT("Seems like we've encountered a technical snag. Fear not, let's have another go!");
    } finally {
      setLoading(false);  // Reset the loading state
      setButtonR(true);
    }
  }

  useEffect(() => {

    let timer;

    if (countdown > 0) {
      setInstructionsT(countdown)
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      setCountdown(null);
      handleImage(imageSrc)
    }

    return () => clearTimeout(timer);
  }, [countdown]);
  return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.icons}>
                <button onClick={onClose} className={styles.button}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            {capturedImage ? <img src={capturedImage} alt="Captured" />:<Webcam ref={webcamRef} screenshotFormat="image/jpeg" className={styles.cam}/> }
            <div className={styles.indications}>
              {countdown ? <p className={styles.counting}>{instructionsT}</p>:<p>{instructionsT}</p>}
              {buttonS && <button onClick={handleStart}><span>Start</span></button>}
              {buttonR && <button onClick={handleReset}><span>Retry</span></button>}
              {loading && <div className={styles.loader}><div></div><div></div><div></div><div></div></div>}
              
            </div>
        </div>
    </div>
  )
}

export default CustomWebcam