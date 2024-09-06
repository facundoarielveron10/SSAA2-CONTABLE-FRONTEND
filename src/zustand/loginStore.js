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
            darkMode: true,
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
                const { user } = get();
                return user?.actions?.includes(action) ? true : false;
            },
            editActions: (idRole, actions) => {
                const { user } = get();
                if (user?.role?._id === idRole) {
                    set((state) => ({
                        user: {
                            ...state.user,
                            actions: actions,
                        },
                    }));
                }
            },
            toggleDarkMode: (checked) => {
                set({
                    darkMode: checked,
                });

                const theme = checked ? "dark" : "light";
                document.body.setAttribute("theme", theme);
            },
            initializeTheme: () => {
                const { darkMode } = get();
                const theme = darkMode ? "dark" : "light";
                document.body.setAttribute("theme", theme);
            },
        }),
        {
            name: "user",
            partialize: (state) => ({
                jwt: state.jwt,
                user: state.user,
                darkMode: state.darkMode,
            }),
        }
    )
);
