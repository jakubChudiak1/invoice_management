import { apiSlice } from "../redux/features/apiSlice";
import { Language } from "../types/language";

const languageApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getLanguages: build.query<Language[], void>({
      query: () => "/languages",
      providesTags: ["Languages"],
    }),
  }),
});
export const { useGetLanguagesQuery } = languageApi;
