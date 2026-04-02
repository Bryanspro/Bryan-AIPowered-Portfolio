import json
import os

translations = {
    "en": {
        "a11yTitle": "Accessibility",
        "a11yReset": "Reset All",
        "a11yFontSize": "Increase Text Size",
        "a11yLineHeight": "Increase Line Height",
        "a11yTextSpacing": "Wider Text Spacing",
        "a11yHighContrast": "High Contrast",
        "a11yDyslexiaFont": "Dyslexia-Friendly Font",
        "a11yReduceMotion": "Reduce Animations",
        "a11yHighlightLinks": "Highlight Links",
        "a11yBiggerCursor": "Bigger Cursor",
        "a11yTextAlign": "Align Text Left",
        "a11yLowSaturation": "Low Saturation",
        "a11yOpenSettings": "Open accessibility settings",
        "a11yCloseSettings": "Close accessibility settings"
    },
    "es": {
        "a11yTitle": "Accesibilidad",
        "a11yReset": "Restablecer todo",
        "a11yFontSize": "Aumentar texto",
        "a11yLineHeight": "Aumentar altura de línea",
        "a11yTextSpacing": "Espaciado de texto",
        "a11yHighContrast": "Alto contraste",
        "a11yDyslexiaFont": "Fuente para dislexia",
        "a11yReduceMotion": "Reducir animaciones",
        "a11yHighlightLinks": "Resaltar enlaces",
        "a11yBiggerCursor": "Cursor más grande",
        "a11yTextAlign": "Alinear texto a la izquierda",
        "a11yLowSaturation": "Baja saturación",
        "a11yOpenSettings": "Abrir opciones de accesibilidad",
        "a11yCloseSettings": "Cerrar accesibilidad"
    },
    "pt": {
        "a11yTitle": "Acessibilidade",
        "a11yReset": "Redefinir tudo",
        "a11yFontSize": "Aumentar texto",
        "a11yLineHeight": "Aumentar altura da linha",
        "a11yTextSpacing": "Espaçamento de texto",
        "a11yHighContrast": "Alto contraste",
        "a11yDyslexiaFont": "Fonte para dislexia",
        "a11yReduceMotion": "Reduzir animações",
        "a11yHighlightLinks": "Destacar links",
        "a11yBiggerCursor": "Cursor maior",
        "a11yTextAlign": "Alinhar texto à esquerda",
        "a11yLowSaturation": "Baixa saturação",
        "a11yOpenSettings": "Abrir opções de acessibilidade",
        "a11yCloseSettings": "Fechar acessibilidade"
    },
    "de": {
        "a11yTitle": "Barrierefreiheit",
        "a11yReset": "Alles zurücksetzen",
        "a11yFontSize": "Text vergrößern",
        "a11yLineHeight": "Zeilenabstand",
        "a11yTextSpacing": "Textabstand",
        "a11yHighContrast": "Hoher Kontrast",
        "a11yDyslexiaFont": "Legasthenie-Schrift",
        "a11yReduceMotion": "Animationen reduzieren",
        "a11yHighlightLinks": "Links hervorheben",
        "a11yBiggerCursor": "Größerer Cursor",
        "a11yTextAlign": "Text linksbündig",
        "a11yLowSaturation": "Geringe Sättigung",
        "a11yOpenSettings": "Barrierefreiheit öffnen",
        "a11yCloseSettings": "Barrierefreiheit schließen"
    },
    "fr": {
        "a11yTitle": "Accessibilité",
        "a11yReset": "Tout réinitialiser",
        "a11yFontSize": "Agrandir le texte",
        "a11yLineHeight": "Hauteur de ligne",
        "a11yTextSpacing": "Espacement du texte",
        "a11yHighContrast": "Contraste élevé",
        "a11yDyslexiaFont": "Police pour dyslexie",
        "a11yReduceMotion": "Réduire les animations",
        "a11yHighlightLinks": "Surligner les liens",
        "a11yBiggerCursor": "Curseur plus grand",
        "a11yTextAlign": "Aligner le texte à gauche",
        "a11yLowSaturation": "Faible saturation",
        "a11yOpenSettings": "Ouvrir l'accessibilité",
        "a11yCloseSettings": "Fermer l'accessibilité"
    },
    "ja": {
        "a11yTitle": "アクセシビリティ",
        "a11yReset": "すべてリセット",
        "a11yFontSize": "テキストを拡大",
        "a11yLineHeight": "行間を広げる",
        "a11yTextSpacing": "文字間隔を広げる",
        "a11yHighContrast": "ハイコントラスト",
        "a11yDyslexiaFont": "ディスレクシア対応フォント",
        "a11yReduceMotion": "アニメーションを減らす",
        "a11yHighlightLinks": "リンクを強調表示",
        "a11yBiggerCursor": "カーソルを大きくする",
        "a11yTextAlign": "テキストを左揃え",
        "a11yLowSaturation": "低彩度",
        "a11yOpenSettings": "アクセシビリティを開く",
        "a11yCloseSettings": "アクセシビリティを閉じる"
    },
    "ko": {
        "a11yTitle": "접근성",
        "a11yReset": "모두 초기화",
        "a11yFontSize": "텍스트 크기 증가",
        "a11yLineHeight": "줄 간격 증가",
        "a11yTextSpacing": "텍스트 간격 넓히기",
        "a11yHighContrast": "고대비",
        "a11yDyslexiaFont": "난독증 친화적 글꼴",
        "a11yReduceMotion": "애니메이션 줄이기",
        "a11yHighlightLinks": "링크 강조",
        "a11yBiggerCursor": "큰 커서",
        "a11yTextAlign": "텍스트 왼쪽 맞춤",
        "a11yLowSaturation": "낮은 채도",
        "a11yOpenSettings": "접근성 설정 열기",
        "a11yCloseSettings": "접근성 설정 닫기"
    },
    "zh": {
        "a11yTitle": "无障碍",
        "a11yReset": "重置全部",
        "a11yFontSize": "增大字体",
        "a11yLineHeight": "增加行高",
        "a11yTextSpacing": "加宽字距",
        "a11yHighContrast": "高对比度",
        "a11yDyslexiaFont": "阅读障碍友好字体",
        "a11yReduceMotion": "减少动画",
        "a11yHighlightLinks": "高亮链接",
        "a11yBiggerCursor": "更大的光标",
        "a11yTextAlign": "左对齐文本",
        "a11yLowSaturation": "低饱和度",
        "a11yOpenSettings": "打开无障碍设置",
        "a11yCloseSettings": "关闭无障碍设置"
    },
    "ar": {
        "a11yTitle": "إمكانية الوصول",
        "a11yReset": "إعادة ضبط",
        "a11yFontSize": "تكبير النص",
        "a11yLineHeight": "زيادة ارتفاع السطر",
        "a11yTextSpacing": "تباعد النص",
        "a11yHighContrast": "تباين عالٍ",
        "a11yDyslexiaFont": "خط عسر القراءة",
        "a11yReduceMotion": "تقليل الحركة",
        "a11yHighlightLinks": "تمييز الروابط",
        "a11yBiggerCursor": "مؤشر أكبر",
        "a11yTextAlign": "محاذاة لليسار",
        "a11yLowSaturation": "تشبع منخفض",
        "a11yOpenSettings": "فتح إمكانية الوصول",
        "a11yCloseSettings": "إغلاق الإعدادات"
    },
    "hi": {
        "a11yTitle": "पहुंच-योग्यता",
        "a11yReset": "सभी रीसेट करें",
        "a11yFontSize": "टेक्स्ट बढ़ाएँ",
        "a11yLineHeight": "पंक्ति की ऊंचाई",
        "a11yTextSpacing": "टेक्स्ट रिक्ति",
        "a11yHighContrast": "उच्च कंट्रास्ट",
        "a11yDyslexiaFont": "डिस्लेक्सिया फ़ॉन्ट",
        "a11yReduceMotion": "एनिमेशन कम करें",
        "a11yHighlightLinks": "लिंक हाइलाइट करें",
        "a11yBiggerCursor": "बड़ा कर्सर",
        "a11yTextAlign": "बाएँ संरेखित करें",
        "a11yLowSaturation": "कम संतृप्ति",
        "a11yOpenSettings": "सेटिंग खोलें",
        "a11yCloseSettings": "सेटिंग बंद करें"
    },
    "he": {
        "a11yTitle": "נגישות",
        "a11yReset": "אפס הכל",
        "a11yFontSize": "הגדל טקסט",
        "a11yLineHeight": "גובה שורה",
        "a11yTextSpacing": "ריווח טקסט",
        "a11yHighContrast": "ניגודיות גבוהה",
        "a11yDyslexiaFont": "גופן ידידותי לדיסלקציה",
        "a11yReduceMotion": "הפחת אנימציות",
        "a11yHighlightLinks": "הדגש קישורים",
        "a11yBiggerCursor": "סמן גדול",
        "a11yTextAlign": "יישור טקסט לשמאל",
        "a11yLowSaturation": "רוויה נמוכה",
        "a11yOpenSettings": "פתח הגדרות",
        "a11yCloseSettings": "סגור הגדרות"
    }
}

for lang, data in translations.items():
    file_path = f"locales/{lang}.json"
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            locale_data = json.load(f)
        
        locale_data.update(data)
        
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(locale_data, f, indent=2, ensure_ascii=False)
            print(f"Updated {lang}.json")
    else:
        print(f"File {file_path} not found")
