@echo off
chcp 65001 >nul
title 🔁 YavuzSite Otomatik Deploy Aracı
cd /d "C:\Users\yvzta\OneDrive\Masaüstü\yavuzsite"

echo.
echo 🚀 YavuzSite otomatik güncelleme başlatılıyor...
echo ----------------------------------------------
timeout /t 1 >nul

:: 🔧 Git kullanıcı yapılandırması kontrol et
git config user.name >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚙️ Git kullanıcı ayarları yapılandırılıyor...
    git config user.name "Yavuz Tas"
    git config user.email "yavuztas@users.noreply.github.com"
    echo ✅ Git yapılandırması tamamlandı.
)

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