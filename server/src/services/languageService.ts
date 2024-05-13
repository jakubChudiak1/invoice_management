import { db } from "@src/db/db";

class LanguageService {
  public getLanguages = async () => {
    const languages = await db
      .selectFrom("languages")
      .select(["language_id", "name as language_name"])
      .execute();
    return languages;
  };
}
export default LanguageService;
