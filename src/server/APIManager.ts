import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:3005/';

export default class APIManager {
  /**
   * Triggers a request to the given path with the appropriate prefix
   * @param path String the end point of the API we want to reach
   * @return Promise The result from axios
   */
  static getFromServer(path: string) {
    return axios.get(baseURL + path);
  }

  static postOnServer(path: string, body: any) {
    return axios.post(baseURL + path, body);
  }
}
