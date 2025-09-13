// import words from '../data/words';
const words = [
    {
        vn: "Chào",
        eng: "Hi"
    },
    {
        vn: "Tôi",
        eng: "I"
    },
    {
        vn: "Bạn",
        eng: "You"
    }
]

let dictionary = document.getElementById( "dictionary2" );
console.log("hi")
console.log("dictionary", dictionary);

for ( let i = 0; i < words.length; i++ ) {

    const newWord = document.createElement('div');
    const newVn = document.createElement('p');
    newVn.textContent = words[i].vn;
    // newVn.textContent = "hi";
    const newEng = document.createElement('p');
    newEng.textContent = words[i].eng;

    newWord.appendChild(newVn);
    newWord.appendChild(newEng);

    console.log( newWord );

    dictionary.appendChild(newWord);
}