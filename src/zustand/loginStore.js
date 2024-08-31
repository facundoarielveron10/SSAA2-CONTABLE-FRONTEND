// ZUSTAND
import { create } from "zustand";
import { persist } from "zustand/middleware";

// UTILS
import { errorResponse } from "../utils/error";

// AXIOS
import clientAxios from "../config/ClientAxios";

export const useLoginStore = create(
    persist(
        (set) => ({
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
                } catch (error) {
                    set({
                        successSubmitted: false,
                        errorSubmitting: errorResponse(error),
                        isSubmitting: false,
                    });
                }
            },
        }),
        {
            name: "user",
            partialize: (state) => ({ jwt: state.jwt, user: state.user }),
        }
    )
);
