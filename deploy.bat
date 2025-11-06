@echo off
title 🔁 YavuzSite Otomatik Deploy Aracı
cd /d "C:\Users\yvzta\OneDrive\Masaüstü\yavuzsite"

echo.
echo 🚀 YavuzSite otomatik güncelleme başlatılıyor...
echo ----------------------------------------------
timeout /t 1 >nul

:: 🔍 Git durumu kontrol et
git status
echo.
echo 💾 Dosyalar kontrol edildi.

:: 📦 Node modülleri mevcut mu?
if not exist "node_modules" (
    echo 📦 node_modules klasörü eksik! Kurulum başlatılıyor...
    npm install
)

:: 🧱 Build işlemi
echo.
echo 🏗️ Proje build ediliyor...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Build işlemi başarısız! Kodları kontrol et.
    pause
    exit /b
)

echo ✅ Build tamamlandı.

:: 🔄 Git push
echo.
git add .
git commit -m "auto update %date% %time%"
git push -u origin main

if %errorlevel% neq 0 (
    echo ❌ Git push sırasında hata oluştu!
    pause
    exit /b
)

echo ✅ Güncelleme GitHub'a yüklendi.
echo 🌍 Vercel otomatik olarak yeni sürümü yayına alacak.
echo ----------------------------------------------

pause
exit