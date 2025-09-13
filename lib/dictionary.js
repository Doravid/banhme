let words = [
    {
        "vn": "Chào",
        "eng": "Hi"
    },
    {
        "vn": "Tôi",
        "eng": "I"
    },
    {
        "vn": "Bạn",
        "eng": "You"
    }
]



function dictionary() {
    let dictionary = document.getElementById("actual_word_list");

    for (let i = 0; i < words.length; i++) {
        const newWord = document.createElement('div');
        newWord.classList.add("word");

        const newVn = document.createElement('p');
        newVn.textContent = words[i].vn;
        newVn.classList.add("wordVn");

        // const newEng = document.createElement('p');
        // newEng.textContent = words[i].eng;
        // newEng.classList.add("wordEng");

        // Create an input field for the English translation
        const newEngInput = document.createElement('input');
        newEngInput.type = 'text';
        // newEngInput.placeholder = 'Type English translation...';
        newEngInput.classList.add("wordEngInput");

        newEngInput.addEventListener('blur', function () {
            if (newEngInput.value.trim().toLowerCase() === words[i].eng.toLowerCase()) {
                newEngInput.style.borderColor = 'green';
            } else {
                newEngInput.style.borderColor = 'red';
            }
        });

        newWord.appendChild(newVn);
        // newWord.appendChild(newEng);
        newWord.appendChild(newEngInput);

        dictionary.appendChild(newWord);
    }
}




