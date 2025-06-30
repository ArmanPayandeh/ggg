# DecentraMind MVP

این مخزن نمونه‌ای برای اجرای یک نود استنتاج مدل زبانی به همراه رابط کاربری غیرمتمرکز است. پروژه شامل دو ماژول اصلی می‌باشد:

- **llm-node**: پیاده‌سازی نود استنتاج با استفاده از FastAPI و کتابخانه‌های رمزنگاری. این نود پیام‌های رمزنگاری شده را دریافت و پاسخ را به صورت رمز شده برمی‌گرداند.
- **client-dapp**: برنامه‌ی وب (Next.js) که کاربر از طریق آن پیام را رمز کرده و با نود ارتباط برقرار می‌کند.

## ساختار کلی

```text
decentramind-mvp/
├── llm-node/          # کد سرور FastAPI
│   ├── app/
│   │   ├── main.py
│   │   ├── model_runner.py
│   │   ├── crypto_utils.py
│   │   └── keygen.py
│   ├── requirements.txt
│   └── README.md
├── client-dapp/       # رابط کاربری Next.js
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   ├── package.json
│   └── README.md
└── README.md          # همین فایل
```

برای راه‌اندازی هر بخش به README مربوطه مراجعه کنید.
