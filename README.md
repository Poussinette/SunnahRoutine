# Sunnah Daily Coach

A web app that coaches you through the day by following the Sunnah of Prophet Muhammad ﷺ, based exclusively on authentic (sahih/hasan) hadith narrations.

## Features

- **Daily Timeline** — 13 Sunnah practices ordered from Fajr to sleep, with check-off tracking that resets each day
- **Time-aware hero banner** — highlights the practice closest to the current hour
- **Adhkar Tab** — full morning, evening, and sleep remembrances with tap counters
- **Explore Tab** — browse all practices by category (Prayer, Eating, Hygiene, Social, Sleep, Qur'an)
- **Practice modals** — Arabic text, transliteration, translation, du'a, steps, and source reference for every practice
- **Offline-capable** — no server, no dependencies, just open `index.html` in a browser

## Getting Started

```
git clone <repo-url>
cd SunnahRoutine
# Open index.html in your browser
```

No build step, no npm install. Pure HTML, CSS, and JavaScript.

## Hadith Sources

All practices are sourced from the major authenticated hadith collections:

| Collection | Author |
|---|---|
| Sahih al-Bukhari | Imam al-Bukhari (d. 256 AH) |
| Sahih Muslim | Imam Muslim (d. 261 AH) |
| Sunan Abi Dawud | Imam Abu Dawud (d. 275 AH) |
| Jami' al-Tirmidhi | Imam al-Tirmidhi (d. 279 AH) |
| Sunan al-Nasa'i | Imam al-Nasa'i (d. 303 AH) |
| Sunan Ibn Majah | Imam Ibn Majah (d. 273 AH) |
| Musnad Ahmad | Imam Ahmad ibn Hanbal (d. 241 AH) |
| Hisnul Muslim | Sa'id al-Qahtani |

Each practice card links to [Sunnah.com](https://sunnah.com) for independent verification.

## Project Structure

```
SunnahRoutine/
├── index.html   # App shell and markup
├── styles.css   # All styling
├── data.js      # Hadith data, du'as, adhkar, and practice metadata
└── app.js       # Application logic, rendering, state management
```

## Disclaimer

This app is a reminder tool, not a fatwa or religious authority. For rulings and detailed fiqh, consult qualified scholars. Prayer times are not calculated — use a dedicated prayer-time app for your location.

---

> قُلْ إِن كُنتُمْ تُحِبُّونَ اللَّهَ فَاتَّبِعُونِي يُحْبِبْكُمُ اللَّهُ
>
> *"Say: If you love Allah, follow me — Allah will love you."* — Qur'an 3:31
