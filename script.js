let btn=document.querySelector("#btn")
let content=document.querySelector("#content") //access
let voice=document.querySelector("#voice") //access

// for speaking
function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text); //object created
  //by using this function we can decide(language,voice ,pitch etc)
  text_speak.rate=1
  text_speak.pitch=1
  text_speak.volume=1
  text_speak.lang="hi-GB"
  //  hindi
  window.speechSynthesis.speak(text_speak)
}

function wishMe() {
  let day = new Date()
  let hours = day.getHours()
  if (hours >= 0 && hours < 12) {
    speak("Good morning")
  } else if (hours >= 12 && hours < 16) {
    speak("Good Afternoon")
  } else {
    speak("Good Evening")
  }
}
window.addEventListener('load', () => {
  wishMe()
})
//record what we speak and convert to api
let speechRecognition =window.SpeechRecognition || window.window.webkitSpeechRecognition
let recognition = new speechRecognition()
 recognition.onresult = (event) => {
let currentIndex = event.resultIndex
let transcript = event.results[currentIndex][0].transcript
  content.innerText=transcript
  takeCommand(transcript.toLowerCase())
}
btn.addEventListener('click', () => {
  recognition.start()
  btn.style.display="none"
  voice.style.display="block"
})

function takeCommand(message) {
    btn.style.display="flex"
     voice.style.display="none"
if (message.includes("hello") || message.includes("hey" )) {
    speak("hello,what can i help you ?")    
} 
else if(message.includes("who are you")) {
    speak("I am virtual assistant , created by saumya mam")  
}
else if(message.includes("open youtube")) {
    speak("opening youtube...")
    window.open("https://www.youtube.com/","_blank") 
}
else if(message.includes("open google") || message.includes("google")) {
    speak("Opening Google...")
    window.open("https://www.google.com/", "_blank")
}

else if(message.includes("open instagram")) {
    speak("opening instagram..")
    window.open("https://www.instagram.com/","_blank") 
}
else if(message.includes("open facebook")) {
    speak("opening facebook..")
    window.open("https://www.facebook.com/","_blank") 
}
else if(message.includes("open calculator")) {
    speak("opening calculator..")
    window.open("calculator://") 
}
else if(message.includes("open whatsapp")) {
    speak("opening whatsapp..")
    window.open("whatsapp://") 
}
else if(message.includes("time")) {
    let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
    speak(time)
}
else if(message.includes("date")) {
    let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
    speak(date)
}
else if(message.includes("weather")) {
    speak("please tell me the city name")
    recognition.start()
    recognition.onresult = (event) => {
        let currentIndex = event.resultIndex
        let transcript = event.results[currentIndex][0].transcript
        content.innerText=transcript
        let city = transcript.toLowerCase().replace("weather in", "").trim()
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    let weatherInfo = `The weather in ${city} is ${data.weather[0].description} with a temperature of ${data.main.temp}°C.`
                    speak(weatherInfo)
                } else {
                    speak("Sorry, I couldn't find the weather information for that city.")
                }
            })
            .catch(error => {
                speak("There was an error fetching the weather data.")
            })
    }
}
else if(message.includes("open chatgpt") || message.includes("open chat gpt")) {
    speak("opening chatgpt..")
    window.open("https://chat.openai.com/chat","_blank") 
}
else{
   let finalText= "this is what i found on internet regarding" + message.replace("saya","") || message.replace("soya","")
    speak(finalText)
    window.open('https://www.google.com/search?q=${message}',"_blank")
}
}
