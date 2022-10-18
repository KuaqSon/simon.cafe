/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable arrow-body-style */
import axios, { AxiosError, AxiosResponse } from 'axios';
import getConfig from 'next/config';
import { stringify } from 'querystring';
import { ICafe } from 'src/interfaces/cafe';
import { IPaginatorResponse } from 'src/interfaces/common';
import * as AuthService from 'src/services/auth-service';
import request from 'src/utils/request';

const { publicRuntimeConfig } = getConfig();

const makeRequest = async (reqFunc: Function, errorFunc?: Function): Promise<AxiosResponse> => {
  let resp = null;
  try {
    resp = await reqFunc();
    return resp;
  } catch (error) {
    const { response } = error as AxiosError;

    if (publicRuntimeConfig.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    if (errorFunc) {
      return errorFunc(response);
    }

    if (response?.status === 401) {
      AuthService.logOut();
      window.location.href = '/account/login';
    }

    if (axios.isAxiosError(error)) {
      return response as AxiosResponse;
    }

    return Promise.resolve({ status: 500, statusText: 'something went wrong please try again!' } as AxiosResponse);
  }
};

export const loginApi = async (params: any): Promise<AxiosResponse> => {
  return await makeRequest(() => request.post('/api/auth/login', params));
};

export const registerApi = async (params: any): Promise<AxiosResponse> => {
  return await makeRequest(() => request.post('/api/auth/signup', params));
};

export const getCurrentUserApi = async (): Promise<AxiosResponse> => {
  return await makeRequest(
    () => request.get('/api/user/current-user'),
    () => {
      // This is mean we not handle auto logout for this api when meet 401 code
    }
  );
};

export const getListCafesApi = async (params: any): Promise<AxiosResponse<IPaginatorResponse<ICafe>>> => {
  return await makeRequest(() => request.get(`api/cafe?${stringify(params)}`));
};
