import axios, { AxiosStatic } from 'axios';

const API_PREFIX = '/api';

class APIManager {
  restClient: AxiosStatic;
  currentCSRFToken: string | undefined;
  static sharedInstance: APIManager;

  constructor() {
    this.restClient = axios;
    this.restClient.defaults.headers.post.Accept = 'application/json';
    this.currentCSRFToken =
      document.querySelector('[name=csrf-token]')?.innerHTML;
    this.restClient.interceptors.request.use((config) => {
      config.headers!.xsrfHeaderName = 'X-CSRF-TOKEN';
      config.headers!['X-CSRF-TOKEN'] = this.currentCSRFToken!;
      return config;
    });
    this.restClient.interceptors.response.use((response) => {
      const newCSRFToken = response.headers['x-csrf-token'];
      this.setCSRFToken(newCSRFToken);
      return response;
    });
    this.setCSRFToken(this.currentCSRFToken);
  }

  static get Instance(): APIManager {
    if (!this.sharedInstance) {
      this.sharedInstance = new this();
    }
    return this.sharedInstance;
  }

  setCSRFToken(csrfToken: string | undefined) {
    this.restClient.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken!;
  }

  async get(path: string, data: object | undefined = {}) {
    return this.restClient.get(`${API_PREFIX}${path}?${encodeData(data)}`);
  }

  async post(path: string, data: object | undefined = {}) {
    return this.restClient.post(`${API_PREFIX}${path}`, data);
  }

  async patch(path: string, data: object | undefined = {}) {
    return this.restClient.patch(`${API_PREFIX}${path}`, data);
  }

  async put(path: string, data: object | undefined = {}) {
    return this.restClient.put(`${API_PREFIX}${path}`, data);
  }

  async delete(path: string, data: object | undefined = {}) {
    return this.restClient.delete(`${API_PREFIX}${path}`, data);
  }
}

function encodeData(data: { [key: string]: any } = {}) {
  return Object.keys(data)
    .map((key) => `${key}=${encodeURIComponent(data[key])}`)
    .join('&');
}

export default APIManager;
