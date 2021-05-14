import { numberOfWords, matchedTimes, mismatchedTimes, incorrectCounter } from './stroop.js';
import { domElements } from './dom-elements.js';

let informationArray = [];

function getRadioButtonChoiceText () {
    const { wordMeaningRadioButton } = domElements.formElements;
    return wordMeaningRadioButton.checked ? "Evaluating Word Meaning" : "Evaluating Word Color";
}

export function createFile () {
    let textFile = null;

    function makeTextFile (text) {
        const data = new Blob ( [text], { type: 'text/plain' } );
        
        if ( textFile !== null ) window.URL.revokeObjectURL(textFile);

        textFile = window.URL.createObjectURL(data);
        return textFile;
    }

    for ( let i = 0; i < matchedTimes.length; i++ ) {
        informationArray.push(`${i+1}.   ${matchedTimes[i]}   ${mismatchedTimes[i]}`);
    }

    domElements.buttons.download.href = makeTextFile(
        `Number of Words: ${numberOfWords*2}\nTask Type: ${getRadioButtonChoiceText()}\nIncorrect Answers: ${incorrectCounter}\n  Matched Mismatched\n${informationArray.join('\n')}`
    );
}