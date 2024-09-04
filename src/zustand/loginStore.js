// ZUSTAND
import { create } from "zustand";
import { persist } from "zustand/middleware";

// UTILS
import { errorResponse } from "../utils/error";

// AXIOS
import clientAxios from "../config/ClientAxios";

// COOKIES
import Cookies from "js-cookie";

export const useLoginStore = create(
    persist(
        (set, get) => ({
            jwt: "",
            user: {},
            isSubmitting: false,
            successSubmitted: false,
            errorSubmitting: undefined,
            submitLogin: async (email, password) => {
                try {
                    set({ isSubmitting: true });
                    const { data } = await clientAxios.post("/user/login", {
                        email,
                        password,
                    });
                    set({
                        jwt: data.jwt,
                        user: data.user,
                        isSubmitting: false,
                        successSubmitted: true,
                    });
                    Cookies.set("AUTH_TOKEN", data.jwt);
                } catch (error) {
                    set({
                        successSubmitted: false,
                        errorSubmitting: errorResponse(error),
                        isSubmitting: false,
                    });
                }
            },
            logout: () => {
                try {
                    set({
                        jwt: "",
                        user: {},
                        isSubmitting: false,
                        successSubmitted: false,
                        errorSubmitting: undefined,
                    });
                    Cookies.remove("AUTH_TOKEN");
                    window.location.assign("/login");
                } catch (error) {
                    set({
                        successSubmitted: false,
                        errorSubmitting: errorResponse(error),
                        isSubmitting: false,
                    });
                }
            },
            canExecute: (action) => {
                return get()?.user?.actions?.includes(action) ? true : false;
            },
            editActions: (idRole, actions) => {
                if (get()?.user?.role?._id === idRole) {
                    set((state) => ({
                        user: {
                            ...state.user,
                            actions: actions,
                        },
                    }));
                }
            },
        }),
        {
            name: "user",
            partialize: (state) => ({ jwt: state.jwt, user: state.user }),
        }
    )
);
