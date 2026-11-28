# Clara's Beauty Parlour

**Live site:** https://piwangs.github.io/clarabeautyparlour/

---

## Customer view vs Admin view

| | **Customers (public)** | **Admin (staff only)** |
|--|------------------------|-------------------------|
| **URL** | `index.html` / site root | `inventory.html` |
| **Who** | Anyone | Staff with PIN |
| **Sees** | Services, prices, gallery, booking, map, WhatsApp | Inventory stock, photo upload, bookings list |
| **Menu** | Services · Book · Find us | Not in main nav — footer “Staff admin” only |
| **Search engines** | Indexed | `noindex` — not for Google |
| **Data** | Reads gallery (optional Sheets); booking → WhatsApp | Full inventory + Drive photo upload |

**Security:** PIN is a practical lock, not bank-grade. Change default `1234` in:

- `js/config.js` → `ADMIN_PIN`
- `index.html` → `inventoryPin`
- `google-apps-script/Code.gs` → `ADMIN_PIN`

Do not share the PIN or post `/inventory.html` on social media.

---

## Google Drive as the database

GitHub Pages has no server. We use:

1. **Google Sheets** — inventory, movements, bookings, gallery metadata  
2. **Google Drive folder** — photo files from admin uploads  

### Setup (once)

1. Create spreadsheet **Clara Beauty Data**
2. **Extensions → Apps Script** → paste `google-apps-script/Code.gs` → Save  
3. **Deploy → New deployment → Web app**  
   - Execute as: **Me**  
   - Who has access: **Anyone**  
4. Copy Web App URL into `js/config.js`:

```js
window.CLARA_CONFIG = {
  SHEETS_API_URL: 'https://script.google.com/macros/s/YOUR_ID/exec',
  USE_SHEETS: true,
  FALLBACK_TO_LOCAL: true,
  ADMIN_PIN: '1234',
  BUSINESS_NAME: "Clara's Beauty Parlour"
};
```

5. Upload all files below to GitHub Pages.

### Storage map

| Data | Where |
|------|--------|
| Stock | Sheet **Inventory** |
| Stock movements | Sheet **Movements** |
| Bookings | Sheet **Bookings** |
| Gallery links | Sheet **Gallery** |
| Image files | Drive folder **Clara Beauty Gallery Photos** |

Without Sheets, admin still works in **localStorage** (one browser only).

---

## Admin photo upload

1. Open `/inventory.html`  
2. PIN unlock  
3. **Photos** tab → select/drop image → title + tag → Upload  
4. With Drive connected, photos appear on the public gallery after refresh  

Use faceless/studio images when possible. Keep files under ~3 MB.

---

## Files to upload to GitHub

```
index.html
inventory.html
js/config.js
js/sheets-api.js
google-apps-script/Code.gs
README.md
```

---

## East African currencies (public)

UGX (base), KES, TZS, RWF, BIF, SSP, ETB, USD — header switcher. Non-UGX rates are indicative.
