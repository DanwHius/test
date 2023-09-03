const fromText=document.querySelector(".from-text"),
toText=document.querySelector(".to-text"),
translateBtn=document.querySelector("button"),
exchangeIcon=document.querySelector(".exchange")
selectTag=document.querySelectorAll("select");
icons=document.querySelectorAll(".row i");

selectTag.forEach((tag,id) => {
    for(const country_code in countries){
        let selected;
        if(id==0 && country_code=="en-GB"){
            selected="selected";
        }else if(id==1 && country_code=="vi-VN"){
            selected="selected";
        }
        let option=`<option value="${country_code}"${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend",option);
        
    }
});
exchangeIcon.addEventListener("click",()=>{
    let tempText=fromText.value;
    tempLang=selectTag[0].value;
    fromText.value=toText.value;
    selectTag[0].value=selectTag[1].value;
    toText.value=tempText;
    selectTag[1].value=tempLang;

});
translateBtn.addEventListener("click",()=>{
    let text=fromText.value,
    translateFrom=selectTag[0].value,
    translateTo=selectTag[1].value;
    if(!text)return;
    toText.setAttribute("placeholder","Translating...");
    let apiURL=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiURL).then(res=> res.json()).then(data=>{
        console.log(data);
        toText.value=data.responseData.translatedText;
        toText.setAttribute("placeholder","Translating...");
    });
});

icons.forEach(icon=>{
    icon.addEventListener("click",({target})=>{
        if(target.classList.contains("fa-copy")){
            if(target.id=="from"){
                navigator.clipboard.writeText(fromText.value);
            }else{
                navigator.clipboard.writeText(toText.value);
            }
        }else{
            let ulterance;
            if(target.id=="from"){
                ulterance=new SpeechSynthesisUtterance(fromText.value)
                ulterance.lang=selectTag[0].value;
            }else{
                ulterance=new SpeechSynthesisUtterance(toText.value)
                ulterance.lang=selectTag[1].value;
            }
            speechSynthesis.speak(ulterance);
        }
    })
})