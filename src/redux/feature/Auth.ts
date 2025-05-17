import { api } from "../api/api";

interface RegisterResponse {
    status: "success" | "error" | "info";
    message: string;
    data: {
        email: string;
        otp_expires_at: string;
        otp_expires_in?: number;  // Optional field for "already sent" case
    }
}

interface LoginRequest {
    email: string;
}

interface VerifyRequest {
    email: string;
    otp: number;
}

interface User {
    id: number;
    name: string;
    phone: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
}

interface VerifyResponse {
    status: string;
    message: string;
    data: {
        access_token: string;
        token_type: string;
        expires_at: string;
        user: User;
    }
}

const userSlice=api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<RegisterResponse, LoginRequest>({
            query: (data) => ({
                url: '/user/lookup',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['user'],
        }),
        register: builder.mutation<RegisterResponse, {
            name: string;
            email: string;
            phone: string;
        }>({
            query: (data) => ({
                url: '/user/lookup',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['user'],
        }),
        // verify
        verify: builder.mutation<VerifyResponse, VerifyRequest>({
            query: (data) => ({
                url: '/user/verify',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['user'],
        }),
    }),
})

export const { useLoginMutation, useRegisterMutation, useVerifyMutation } = userSlice;