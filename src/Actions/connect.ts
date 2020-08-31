import { ActionI } from "coanmo-plugin-cli";
import * as firebase from 'firebase';

interface Validator {
  name: string,
  rx: RegExp
}

const validators: Validator[] = [
  { name: 'apiKey', rx: /^[-0-9a-z]{39}$/i },
  { name: 'appId', rx: /^\d:\d{12}:web:[0-9a-f]{22}$/ },
  { name: 'authDomain', rx: /^[-0-91-z]+\.firebaseapp\.com$/ },
  { name: 'databaseURL', rx: /^https:\/\/[-0-91-z]+\.firebaseio\.com$/ },
  { name: 'messagingSenderId', rx: /^\d{12}$/ },
  { name: 'projectId', rx: /^[-0-91-z]+$/ },
  { name: 'storageBucket', rx: /^[-0-91-z]+\.appspot\.com$/ },
]
    
export function isInvalid (
  value: boolean | number | string,
  rx: RegExp
): string | false {
  if (typeof value !== 'string')
    return `is type '${typeof value}' not 'string'`;
  if (! rx.test(value))
    return `fails '${rx}'`;
  return false;
}

export const connect: ActionI = {
  name: "connect",
  summary: "Connect to a Firebase app",
  synopsis: `@TODO write synopsis`,
  fn(args, context) {
    const { log, store } = context;
    if (args.length !== 0)
      return `ERROR: 'connect' expected 0 args, but got ${args.length}`;
    
    // Validate `store`.
    const errors = validators.map(
      ({ name, rx }): string | false => {
        const result = isInvalid(store[name], rx);
        return result && `ERROR: 'store.${name}' ${result}`
      }
    ).filter( result => result );
    if (errors.length !== 0) return errors.join('\n');

    // Check that the Firebase library has loaded.
    if (typeof window !== "object")
      return `ERROR: firebase is not an object`;

    const asyncId = (~~(Math.random() * 1e9)).toString(36);

    try {

      // Initialize Firebase, and get a reference to the database service.
      firebase.initializeApp(store);
      const db = firebase.firestore();
      // firebase.setLogLevel('debug');

      // Run an actual operation on the databse, by checking that the ‘things’
      // collection exists.
      db.collection("things")
        .limit(1)
        .get()
        .then((snapshot) => {
          log(`#${asyncId} Firebase initialized ok`);
          if (snapshot.size === 0)
            log(`#${asyncId} Firebase has no ‘things’ collection`);
        })
        .catch(
          (err: Error) => log(`ERROR: #${asyncId} \`connect\` failed:\n  ${err}`)
        );

      return "`connect` results will be marked #" + asyncId;
    } catch (err) {
      return `ERROR: \`connect\` failed:\n  ${err}`;
    }

  }
};
