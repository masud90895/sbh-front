/* eslint-disable @typescript-eslint/no-explicit-any */

import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";
import axiosInstance from "./interceptor";

export const axiosBaseQuery =
  (
    {
      baseUrl,
      headers: baseHeaders,
    }: { baseUrl: string; headers?: Record<string, string> } = {
      baseUrl: "",
    }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      contentType?: string;
      headers?: Record<string, string>;
    },
    unknown,
    unknown
  > =>
  async ({
    url,
    method,
    data,
    params,
    contentType,
    headers: requestHeaders,
  }) => {
    try {
      const result: any = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          "Content-Type": contentType || "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
          ...baseHeaders,
          ...requestHeaders,
        },
        withCredentials: true,
      });
      // console.log(result);
      return Promise.resolve({
        data: result.data,
        meta: result.meta,
        error: result.message,
      });
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
