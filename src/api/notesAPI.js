import axios from 'axios';

export default axios.create({
  baseURL: 'https://europe-west3-glaz-notes-269221.cloudfunctions.net/api',
});
