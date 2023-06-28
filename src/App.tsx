import React, { useEffect, useRef, useState } from 'react';
import './App.css';



function App() {
  const [data,setData] = useState<string[]>([])
  const [dataEng,setDataEng] = useState<string[]>([])
  const [click,setClick] = useState<boolean>(false)

  const inputRef   = useRef<HTMLButtonElement | null>(null) 


  async function send() {

    if (click === true){
      return
    }
    setClick(true)
  
    var d = new Date();
    var dayZ = d.getDate();
    var mouthZ = d.getMonth() + 1
    console.log(dayZ)
    console.log(mouthZ)
    try {
      let response = await fetch(`http://numbersapi.com/${mouthZ}/${dayZ}/date?json`)
      let result = await response.json()
      console.log('hhe',result)
      setDataEng([...dataEng,result.text])
      if(dataEng.includes(result.text)  ){
        console.log('такой уже естьтакой уже естьтакой уже есть')
        send()
        return;
      }else{
      
      let resTrans = translate(result.text)
      console.log('ruus',resTrans)
      console.log('rr',result)
      }
      
    } catch (error) {
      
    }finally{
      const kek = ()=>{
        setClick(false)
      }
      setTimeout(kek,200)

    }
    
  }

  async function send2() {

    var d = new Date();
    var dayZ = d.getDate();
    var mouthZ = d.getMonth() + 1
    console.log(dayZ)
    console.log(mouthZ)

    let response = await fetch(`http://numbersapi.com/${mouthZ}/${dayZ}/date?json`)
    let result = await response.json()
    console.log('hhe',result)
    setDataEng([...dataEng,result.text])
    if(dataEng.includes(result.text)  ){
      console.log('такой уже естьтакой уже естьтакой уже есть')
      send()
      return;
    }else{
    
    let resTrans = translate(result.text)
    console.log('ruus',resTrans)
    console.log('rr',result)
    }
    
    
  }

  useEffect(()=>{
      send()  
      const kek1 = ()=>{
        inputRef.current?.click() 
      }
      setTimeout(kek1,500)
      
      const kek = ()=>{
        inputRef.current?.click() 
      }
      setTimeout(kek,1000)
  },[])
  
  
  

  


  function translate(result:string){
    var sourceText = result
    var sourceLang = 'en';
    var targetLang = 'ru';
    console.log(sourceText);
    
    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="+ sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
    console.log(url);
    
    async function mde() {
      let response = await fetch(url);
      let result = await response.json();
      const resultData : string = result[0][0][0]
      console.log('vaa',resultData);
      if(data.includes(resultData) ){
        send()
      }else{
        setData([...data,resultData])
      }
     
    }
    mde()
  }
 
  
  

  return (
    <div className="App">
      <div>{[...new Set(data)].map((item)=>{
        return(
          <div className='itemStyle' key={item}>{item}</div>
        )
      })}
      </div>

      {data.length < 11&&
        <button className='tik' onClick={send}>Тык</button>
      }
      <button ref={inputRef} className='tik zero' onClick={send2}>Тык</button>
    </div>
  );
}

export default App;
