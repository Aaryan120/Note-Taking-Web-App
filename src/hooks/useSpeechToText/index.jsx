import React, { useEffect, useRef, useState } from 'react'



const useSpeechToText = (options) => {
    const [isListening,setIsListening] = useState(false);
    const [transcript,setTranscript] = useState('');
    const recognitionRef = useRef(null);
    // const [timer,setTimer] = useState(0);
    
    useEffect(() =>{
        if(!('webkitSpeechRecognition' in window)){
            console.error("Web Speech Api is not supported");
            return;
        }
        recognitionRef.current = new window.webkitSpeechRecognition();
        const recognition = recognitionRef.current
        recognition.interimResults = options.interimResults || true;
        recognition.lang = options.lang || "en-US";
        recognition.continuous = options.continuous || true;

        if("webkitSpeechGrammarList" in window){
            const grammar = "#JSGF V1.0; grammar punctuation; public <punc> = . | , | ? | ! | ; | : ;"
            const speechRecognitionList = new window.webkitSpeechGrammarList();
            speechRecognitionList.addFromString(grammar,1);
            recognition.grammars = speechRecognitionList;
        }


        recognition.onresult = (event) =>{
            let text = '';
            for(let i = 0;i < event.results.length;++i){
                text += event.results[i][0].transcript;
            }
            console.log("PRINTING TEXT",text);
            setTranscript(text);
        }



        recognition.onerror = (event) =>{
            if (event.error === "no-speech") {
                console.log("No speech detected. Please speak clearly.");
            } else {
                console.error("Speech Recognition error: ", event.error);
            }
        }


        recognition.onend = (event) =>{
            setIsListening(false);
            // setTranscript('');
        }


        return () =>{
            recognition.stop();
        }
    },[])
    
    const startListening = () =>{
        if(recognitionRef.current && !isListening){
            recognitionRef.current.start() ;
            setIsListening(true);
            setTranscript("");
            setTimeout(() =>{
                if(isListening){
                    stopListening();
                }
            },60000);
        }
    }
    

    
    const stopListening = () =>{
        if(recognitionRef.current && isListening){
            recognitionRef.current.stop() ;
            setIsListening(false);
        }
    }


  return {
    isListening,
    transcript,
    startListening,
    stopListening,
  }
}

export default useSpeechToText