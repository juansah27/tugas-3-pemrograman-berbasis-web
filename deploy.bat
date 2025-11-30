@echo off
echo ========================================
echo Deploy SITTA ke GitHub Pages
echo ========================================
echo.

echo Step 1: Update remote repository...
git remote remove origin
git remote add origin https://github.com/juansah27/tugas-3-pemrograman-berbasis-web.git

echo.
echo Step 2: Push ke GitHub...
git branch -M main
git push -u origin main

echo.
echo ========================================
echo Selesai!
echo ========================================
echo.
echo Langkah selanjutnya:
echo 1. Buka https://github.com/juansah27/tugas-3-pemrograman-berbasis-web
echo 2. Settings ^> Pages
echo 3. Source: main branch, / (root)
echo 4. Save
echo.
echo Aplikasi akan tersedia di:
echo https://juansah27.github.io/tugas-3-pemrograman-berbasis-web/
echo.
pause

