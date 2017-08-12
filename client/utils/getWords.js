import defaultWords from '../config/defaultSightWords';

export default function getWords(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(defaultWords), 1000);
  });
}
