import axios from "axios";

const baseUrl = "https://testmilly.ecopiavaluechain.com";

class HTTPService {
  static getHeaderAndURL = () => {
    let headers = {
      ContentType: "application/json",
      Accept: "application/json",
      "Accept-Language": "en",
    };
    return headers;
  };

  static get = (endpoint) => {
    const headers = this.getHeaderAndURL();
    return axios.get(baseUrl + endpoint, {
      headers: headers,
    });
  };

  static post = (queryString, requestBody) => {
    const headers = this.getHeaderAndURL();
    return axios.post(baseUrl + queryString, requestBody, {
      headers: headers,
    });
  };

  static put = (queryString, requestBody) => {
    const headers = this.getHeaderAndURL();
    return axios.put(baseUrl + queryString, requestBody, {
      headers: headers,
    });
  };

  static fileUpload = (queryString, requestBody) => {
    return axios.post(baseUrl + queryString, requestBody, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };
}

export default HTTPService;
