import { defineI18nUI } from 'fumadocs-ui/i18n';
import { i18n } from '~/lib/i18n';

export const i18nUi = defineI18nUI(i18n, {
  translations: {
    en: {
      displayName: 'English',
    },
    'zh-tw': {
      displayName: '繁體中文',
      search: '搜尋',
      searchNoResult: '找不到結果',
      toc: '本頁目錄',
      tocNoHeadings: '此頁沒有標題',
      lastUpdate: '最後更新',
      chooseLanguage: '選擇語言',
      nextPage: '下一頁',
      previousPage: '上一頁',
      chooseTheme: '主題',
      editOnGithub: '在 GitHub 上編輯',
    },
  },
});
