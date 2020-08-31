import { ActionI } from "coanmo-plugin-cli";

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
    if (args.length !== 0)
      return `ERROR: 'connect' expected 0 args, but got ${args.length}`;
    
    // Validate `store`.
    const { store } = context;
    const errors = validators.map(
      ({ name, rx }): string | false => {
        const result = isInvalid(store[name], rx);
        return result && `ERROR: 'store.${name}' ${result}`
      }
    ).filter( result => result );
    if (errors.length !== 0) return errors.join('\n');

    return `@TODO connect to the Firestore`;
  }
};
