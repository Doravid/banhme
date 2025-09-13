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
    let dictionary = document.getElementById("dictionary");

    for (let i = 0; i < words.length; i++) {
        const newWord = document.createElement('div');
        newWord.classList.add("word");

        const newVn = document.createElement('p');
        newVn.textContent = words[i].vn;
        newVn.classList.add("wordVn");

        const newEng = document.createElement('p');
        newEng.textContent = words[i].eng;
        newEng.classList.add("wordEng");

        newWord.appendChild(newVn);
        newWord.appendChild(newEng);

        dictionary.appendChild(newWord);
    }
}


