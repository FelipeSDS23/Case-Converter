const textArea = document.getElementById("textarea");
const optionsList = document.querySelector("#options-list");
const textLength = document.querySelector("#text-length");

try {
    optionsList.addEventListener("click", function (e) {
        const el = e.target;
        const text = textArea.value;
        let editedText = "";
    
        if (!text || el.hasAttribute("options")) {
            return;
        }
        if (el.hasAttribute("btnSentenceCapitalized")) {
            const points = [".", "?", "!", "\n"];
    
            editedText = text.toLowerCase();

            for (let i = 0; i < points.length; i++) {
                editedText = sentenceCase(editedText, points[i]);
            }
            
        }
        if (el.hasAttribute("btnFirstCapitalized")) {
            editedText = text.toLowerCase();
            editedText = editedText[0].toUpperCase() + editedText.substring(1, editedText.length);
        }
        if (el.hasAttribute("btnUppercase")) {
            editedText = text.toLowerCase();
        }
        if (el.hasAttribute("btnLowercase")) {
            editedText = text.toUpperCase();
        }
        if (el.hasAttribute("btnAllCapitalized")) {
            subStr = text.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
                return a.toUpperCase();
            })
            editedText = subStr;
        }
        textArea.value = editedText;
    })
    
    function sentenceCase(txt, dot) {
        let fullTxt = txt;
        let txtEdited = "";
    
        while (fullTxt.length) {
            let sentence = fullTxt.substring(0, fullTxt.indexOf(dot) + 1)
            if (!fullTxt.includes(dot)) {
                sentence = fullTxt.substring(0, fullTxt.length);
                fullTxt = "";
            } else {
                fullTxt = fullTxt.substring(fullTxt.indexOf(dot) + 1, fullTxt.length);
            }
            let i = 0;
    
            while (sentence[i] === " " || sentence[i] === "\n" || sentence[i] === dot) {
                i++;
            }
    
            if (sentence === "." || sentence === "?" || sentence === "!" || sentence === "\n") {
                txtEdited += sentence;
                continue;
            }
            
            sentence = sentence.replace(sentence[i], sentence[i].toUpperCase())
            txtEdited += sentence;
        }
        return txtEdited;
    }

} catch (e) {
    console.log(`Ocorreu um erro: ${e}`);
}


textArea.addEventListener("input", checkLength);

function checkLength() {
    textLength.textContent = textArea.value.length;
}
