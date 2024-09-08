import {API_URL} from '@env';
import {HTTPOptions} from './types';

export default class Http {
  private static getURL = (
    url: string,
    options?: {baseURL?: string; isMockedURL?: boolean},
  ) => (options?.baseURL || API_URL).concat(url);

  private static getHeader = async (
    headers = new Headers(),
    hasFiles = false,
  ): Promise<Headers> => {
    const defaultHeaders = new Headers();

    defaultHeaders.append('Accept', 'application/json');

    if (!hasFiles) {
      defaultHeaders.append('Content-Type', 'application/json');
    }

    if (headers) {
      headers.forEach((value: string, key: string) =>
        defaultHeaders.append(key, value),
      );
    }

    return defaultHeaders;
  };

  private static getBody = (body?: unknown, hasFiles = false) =>
    hasFiles ? body : JSON.stringify(body);

  private static handleError = (response: unknown) => {
    if (
      response &&
      typeof response === 'object' &&
      'error_response' in response
    ) {
      const message =
        String(response?.error_response) || 'Something went wrong!';

      throw new Error(message);
    }
  };

  static Get = async <T>(url: string, options?: HTTPOptions) => {
    const result = await fetch(this.getURL(url, options), {
      method: 'GET',
      headers: await this.getHeader(options?.headers),
    });

    const response: T = await result.json();

    this.handleError(response);

    return response;
  };

  static Post = async <T>(
    url: string,
    body?: unknown,
    options?: HTTPOptions,
  ) => {
    const result = await fetch(this.getURL(url, options), {
      method: 'POST',
      headers: await this.getHeader(options?.headers, options?.hasFiles),
      body: this.getBody(body, options?.hasFiles) as BodyInit_,
    });

    const response: T = await result.json();

    this.handleError(response);

    return response;
  };
}
