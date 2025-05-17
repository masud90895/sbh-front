import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../axios/service';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL! }),
	tagTypes: ['property',"user"], // ata update ar por call korar jonno
  	endpoints: () => ({})
});
