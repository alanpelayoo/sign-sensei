import React, { useEffect, useState, useRef } from 'react'
import axios from "axios";
import styles from './Chat.module.css';

// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import TypingText from './TypingText';
import Button from 'react-bootstrap/Button';

import CustomWebcam from './CustomWebcam';

function Chat() {
  const welcomeMessage = "Hey there, I'm Sei - your Sign Sensei assistant! I'm here to help you master American Sign Language, one sign at a time. Just flash those fingers and we'll get started!";

  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(0);
  const [counts, setCounts] = useState(0);
  const [showCam, setShowCam] = useState(false);

  const [letter,setLetter] = useState({value:null, instruction:null} );

  const chatBodyRef = useRef(null);

  const handleSkip = () => {
    //jump to state 5
    setState(prevState => prevState + 1);
    setLoading(false);
  }

  const hadleCamButton = () => {
    setShowCam(true)
  }

  const onClose = () => {
    setShowCam(false);
    setState(prevState => prevState + 1);
    setLoading(false);
  }

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const queryLocalApi = async () => {
    //query local api and update basic messages.
    const response = await axios.post(
      '/api/chat', 
      { 
        input: userInput,
        state: state,
        letter: letter
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    )
    return response;
  }

  const  handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = { user: true, text: userInput };
    setMessages((prevMessage) => [...prevMessage, newMessage, { user: false, text: "loading" }]);
    setLoading(true);
    try {
      const response = await queryLocalApi();
      if (state ===0){
        const botResponse = {
          user: false,
          text: response.data.message.content
        };
        setMessages((prevMessage) => {
          prevMessage[prevMessage.length - 1] = botResponse;
          return  [...prevMessage]
        })
        setLetter({value: response.data.message.letter, instruction:response.data.message.content});
        //shift state
        if (response.data.message.letter){
          setState(prevState => prevState + 1);
        }
      }else if (state ===2){
        setCounts(prevCounts => prevCounts + 1);
        const botResponse = {
          user: false,
          text: response.data.message.content
        };
        setMessages((prevMessage) => {
          prevMessage[prevMessage.length - 1] = botResponse;
          return  [...prevMessage]
        })
        //shift state
        if (response.data.message.jump || counts > 1){
          setState(prevState => prevState + 1);
          setCounts(0)
        }
      }
      

    } catch (error) {
      console.log(error)
      const botResponse = {
        user: false,
        text: "Oops! Something went wrong.",
      };

      //substitute loading
      setMessages((prevMessage) => {
        prevMessage[prevMessage.length - 1] = { user: false, text: 'Srr can you send again' };
        return  [...prevMessage]
      })
    }
    setUserInput('')
    setLoading(false)
  };

  const askUser = async () => {
    //ask if user if he has questions about this letter.
    setLoading(true);
    setMessages((prevMessage) => [...prevMessage,{ user: false, text: "loading" }]);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const botResponse = {
      user: false,
      text: 'Before jumping to real time detection do you have any questions about this letter?'
  };
    setMessages((prevMessage) => {
      prevMessage[prevMessage.length - 1] = botResponse;
      return  [...prevMessage]
    })
    setLoading(false);
  };

  const  addImage = async () => {
    //ask if user if he has questions about this letter.
    setLoading(true);
    setMessages((prevMessage) => [...prevMessage,{ user: false, text: "loading" }]);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const botResponse = {
      user: false,
      text: 'This is how it should look like'
    };
    setMessages((prevMessage) => {
      prevMessage[prevMessage.length - 1] = botResponse;
      return  [...prevMessage]
    })
    const botResponse2 = {
      user: false,
      text: 'image',
      letter:letter.value
    };
    setMessages((prevMessage) => {
      prevMessage[prevMessage.length - 1] = botResponse;
      return  [...prevMessage, botResponse2]
    })
    setLoading(false);
  };

  useEffect(() => {
    // Smooth scroll logic
    const smoothScroll = () => {
      if (chatBodyRef.current) {
        const current = chatBodyRef.current;
        const targetScrollTop = current.scrollHeight - current.clientHeight;
        if (Math.abs(current.scrollTop - targetScrollTop) < 5) {
          current.scrollTop = targetScrollTop;
        } else {
          current.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth',
          });
        }
      }
    };
    
    smoothScroll();
    
    const handleStateChange = async () => {
      if (state === 1 && !loading) {
          //add image 
          await addImage();
          await askUser();
          setState(prevState => prevState + 1);
          
      }else if (state === 2 && !loading ){
        console.log("state 2, answering questions")
      }
      else if (state === 3 && !loading ){
        //transitory state
        setLoading(true);
        setMessages((prevMessage) => [...prevMessage,{ user: false, text: "loading" }]);
        await new Promise(resolve => setTimeout(resolve, 2000));
        const botResponse = {
          user: false,
          text: `Yay! It's time for evaluation, and all you need is your built-in camera (if not click the skip button). But first, make sure you're all set to sign the letter '${letter.value}' Are you ready to rock and roll? Go ahead and hit 'start' when you're good to go!`
        };

        setMessages((prevMessage) => {
          prevMessage[prevMessage.length - 1] = botResponse;
          return  [...prevMessage]
        })
        setLoading(false);
        setState(prevState => prevState + 1);
      }else if (state === 4 && !loading) {
        setLoading(true);
      }else if (state === 5 && !loading) {
        setLoading(true);
        setMessages((prevMessage) => [...prevMessage,{ user: false, text: "loading" }]);
        await new Promise(resolve => setTimeout(resolve, 2000));
        const botResponse = {
          user: false,
          text: `Nice work on letter ${letter.value} 👌, now you are a master, which letter do you want to learn now?`
        };

        setMessages((prevMessage) => {
          prevMessage[prevMessage.length - 1] = botResponse;
          return  [...prevMessage]
        })
        setLoading(false);
        setLetter({value:null, instruction:null});
        setState(0);
      }
    };
    handleStateChange()
  
    // Effect cleanup (if necessary)
    return () => {
      // Clean up side-effects here
    };
  }, [messages, state, loading]); 


  return (
    <div className={styles.chat}>
      <div className={styles.fullHeightDiv} ref={chatBodyRef}>
        <div className={styles.seiMessage}>
          <p>{welcomeMessage}</p>
        </div>
        <div className={styles.seiMessage}>
          <p>Which letter do you want to learn?</p>
        </div>
        {messages.map((message, index) => (
          message.user ? (
            <div className={styles.userMessage} key={index}>
              <p>
                {message.text}
              </p>
            </div>
            
          ) : (
            <div className={styles.seiMessage} key={index}>
              {message.text === "loading" ? (
                <div className={styles.loader}><div></div><div></div><div></div><div></div></div>
              ) : (
                message.text === "image" ? (
                  <img src={`/letters/${message.letter}.svg`} alt="Logo" className={styles.letterImage} />
                ) : (
                  <p>{message.text}</p>  
                )
              )}
            </div>
          )
        ))}
        {state === 4 ? (
          <div className={styles.buttonsC}>
            <Button variant="outline-dark" onClick={hadleCamButton}>Start</Button>{' '}
            <Button variant="outline-primary" onClick={handleSkip}>Skip</Button>{' '}
          </div>    
        ) : (
          null
        )}  
      </div>
      <form className={styles.shortDiv} onSubmit={handleSubmit}>
        <div className={styles.chatLogo}><h3>Sei</h3></div>
        <input 
          type="text" 
          placeholder="Talk to Sei..." 
          className={styles.inputText}
          value={userInput}
          onChange={handleChange}
          disabled={loading}
        />
        <button className={styles.iconDiv} type="submit"><FontAwesomeIcon icon={faArrowRight} /></button>
      </form>
      {showCam && <CustomWebcam letter={letter.value} onClose={onClose}/>}
    </div>
  )
}

export default Chat

