import shuffle from '../utils/shuffle';

const defaultWordList = () => {
  const words = [
    'I',
    'see',
    'my',
    'like',
    'we',
    'the',
    'an',
    'a',
    'and',
    'me',
    'to',
    'am',
    'go',
    'be',
    'you',
    'with',
    'by',
    'at',
    'him',
    'is',
    'in',
    'for',
    'have',
    'can',
    'this',
    'play',
    'was',
    'are',
    'had',
    'said',
    'he',
    'that',
    'she',
    'as',
    'of',
    'no',
    'but',
    'up',
    'yes',
    'good',
    'it',
    'look',
    'not',
    'little',
    'her',
    'all',
    'do',
    'his',
    'they'
  ];

  return shuffle(words);
};

export default defaultWordList();
