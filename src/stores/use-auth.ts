import { destroyCookie, setCookie } from "nookies";
import { create } from "zustand";

import { api } from "@/src/lib/axios";
import type { User } from "@/src/types/user";

type RegisterProps = Pick<User, "name" | "email"> & {
  password: string;
};

type StoreProps = {
  user: User | null;
  isSignedIn: boolean;
  register(credentials: RegisterProps): void;
  login(email: string, password: string): void;
  signOut(): void;
};

export const useAuth = create<StoreProps>((set) => ({
  isSignedIn: false,
  user: null,

  signOut() {
    destroyCookie(null, "kn-token", { path: "/" });
    set({ isSignedIn: false });
    window.location.href = "/login";
  },

  async login(email, password) {
    const res = await api.post("/auth/login", { email, password });
    const access_token = res.data.token;

    setCookie(null, "kn-token", access_token, {
      /**
       * 3 days token expiration
       */
      maxAge: 60 * 60 * 72,
      path: "/",
    });

    api.defaults.headers.token = access_token;
    set({ isSignedIn: true });
  },

  async register(credentials) {
    const res = await api.post("/auth/register", {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
    });

    const access_token = res.data.access_token;

    setCookie(null, "kn-token", access_token, {
      /**
       * 3 days token expiration
       */
      maxAge: 60 * 60 * 72,
      path: "/",
    });

    api.defaults.headers.token = access_token;
    set({ isSignedIn: true });
  },
}));
