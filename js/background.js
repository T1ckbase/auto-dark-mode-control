import { register } from './register.js';

register().then((error) => {
  if (error) console.log(error);
});
