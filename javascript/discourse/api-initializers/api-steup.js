import { apiInitializer } from "discourse/lib/api";
import I18n from "I18n";

async function applyHighlight(element) {
  const highlights = element.querySelectorAll("mark");
  if (!highlights.length) {
    return;
  }
}

// Helper function to get raw text without translation
function getRawText(text) {
  return text.replace(/\[.*?\]/g, '');
}

export default apiInitializer("0.11.1", (api) => {
  const { iconNode } = require("discourse-common/lib/icon-library");
  const currentLocale = I18n.currentLocale();

  // Localization setup - keep only the button titles in translations
  I18n.translations[currentLocale].js.underline_button_title = settings.underline_button;
  I18n.translations[currentLocale].js.strikethrough_button_title = settings.strikethrough_button;
  I18n.translations[currentLocale].js.highlight_button_title = settings.highlighter_button;

  I18n.translations[currentLocale].js.composer.highlighter_text = settings.highlighter_text;
  I18n.translations[currentLocale].js.composer.underline_text = settings.underline_text;
  I18n.translations[currentLocale].js.composer.strikethrough_text = settings.strikethrough_text;

  // Toolbar Button Definitions
  api.onToolbarCreate(toolbar => {
      toolbar.addButton({
          id: "underline_button",
          group: "fontStyles",
          icon: "underline",
          shortcut: "U",
          preventFocus: true,
          trimLeading: true,
          perform: e => e.applySurround('[u]', '[/u]', 'underline_text')
      });
  });
  api.onToolbarCreate(toolbar => {
      toolbar.addButton({
          id: "strikethrough_button",
          group: "fontStyles",
          icon: "strikethrough",
          shortcut: "S",
          preventFocus: true,
          trimLeading: true,
  		perform: e => e.applySurround('~~', '~~', 'strikethrough_text')
      });
  });

  api.onToolbarCreate(toolbar => {
      toolbar.addButton({
          id: "highlight_button",
          group: "fontStyles",
          icon: "highlighter",
          shortcut: "H",
          preventFocus: true,
          trimLeading: true,
          perform: e => e.applySurround('<mark>', '</mark>', 'highlight_text')
      });
  });
});
