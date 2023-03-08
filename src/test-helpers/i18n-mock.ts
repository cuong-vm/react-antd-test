/**
 * Handles i18n locales by simply returning the locale key
 */
export const mockI18n = () => {
  jest.mock('react-i18next', () => ({
    useTranslation: () => ({
      t: (key: string) => key,
      i18n: {
        changeLanguage: () =>
          new Promise(() => {
            /** empty function */
          }),
      },
    }),
  }))
}
