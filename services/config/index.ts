import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { QueryClient } from "react-query";

// import { badRequestHandler } from './error-handler'

let redirectUnauth = false;

interface ApiParams extends Omit<AxiosRequestConfig, "auth"> {
  auth?: boolean;
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  "ngrok-skip-browser-warning"?: string;
}

const api = async (params?: ApiParams): Promise<AxiosInstance> => {
  try {
    const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    if (!baseApiUrl) {
      throw new Error(
        "NEXT_PUBLIC_BASE_API_URL is not found in environment variables"
      );
    }

    const options: CustomAxiosRequestConfig = {
      baseURL: baseApiUrl,
      headers: {
        "ngrok-skip-browser-warning": "true",
        // dummy token
      },
    };

    const session = await getSession();

    if (session && (session as any).accessToken) {
      if (!params || (params && params.auth === false)) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${(session as any).accessToken}`,
        };
      }
    }

    const instance = axios.create({
      ...options,
    });

    return Promise.resolve(instance);
  } catch (err) {
    return Promise.reject(err);
  }
};

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error: any) => {
        const { code } = error as { response?: any; code?: string };
        switch (code) {
          case "ERR_NETWORK":
            console.error(
              "Network error, either one of this is happening: you dont have internet connection / cors error / backend is deploying"
            );
            break;

          case "ERR_BAD_REQUEST":
            break;

          case "UNAUTHORIZED":
            // badRequestHandler(errors)
            signOut({
              callbackUrl: "/signin",
              redirect: true,
            });
            break;
        }
      },
    },
    queries: {
      refetchOnWindowFocus: false,
      onError: (error: any) => {
        const { response } = error as {
          response?: { data?: { statusCode?: number } };
        };
        if (response?.data) {
          switch (response.data?.statusCode) {
            case 401:
              console.error("Unauthorized");
              if (!redirectUnauth) {
                redirectUnauth = true;
                // toast.error('Session expired, redirect page to Login')
                signOut({
                  callbackUrl: "/signin",
                  redirect: true,
                });
              }
              break;

            case 402:
              console.error("Payment Required");
              if (!redirectUnauth) {
                redirectUnauth = true;
                // toast.error('Session expired, redirect page to Login')
                signOut({
                  callbackUrl: "/signin",
                  redirect: true,
                });
              }
              break;
          }
        }
      },
    },
  },
});

export { api, queryClient };
