/* =========================================================
   Sunnah Daily Coach — Data Layer
   All hadiths cited are sahih or hasan unless noted.
   References follow the format: Collection, Book#, Hadith#
   ========================================================= */

const SUNNAH_DATA = {

  /* -------------------------------------------------------
     DAILY TIMELINE — ordered by time of day
     timeLabel: rough time window shown to user
     timeSlot : numeric 0-23 used for "active now" logic
  ------------------------------------------------------- */
  dailyPractices: [
    {
      id: "wake_dua",
      title: "Du'a upon Waking",
      arabicTitle: "دعاء الاستيقاظ",
      timeLabel: "Upon waking (before dawn)",
      timeSlot: 4,
      category: "prayer",
      icon: "🌙",
      shortDesc: "Begin your day with the prophetic supplication the moment you open your eyes.",
      steps: [
        "Rub your face gently with your hands.",
        "Recite the waking du'a (see below).",
        "Praise Allah for restoring life after sleep."
      ],
      dua: {
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
        transliteration: "Al-hamdu lillāhi alladhī aḥyānā ba'da mā amātanā wa-ilayhi al-nushūr",
        translation: "All praise is for Allah who gave us life after having taken it from us, and unto Him is the Resurrection."
      },
      source: "Sahih al-Bukhari 6312",
      sourceUrl: "https://sunnah.com/bukhari:6312",
      benefit: "Starting the day consciously with gratitude aligns the heart before any worldly distraction enters."
    },
    {
      id: "miswak",
      title: "Use the Miswak (Siwak)",
      arabicTitle: "السواك",
      timeLabel: "After waking / before prayer",
      timeSlot: 4,
      category: "hygiene",
      icon: "🪥",
      shortDesc: "The Prophet ﷺ never left his home without cleaning his teeth with siwak.",
      steps: [
        "Use a miswak (arak twig) or toothbrush with the intention of following the Sunnah.",
        "Clean teeth before Wudu and each prayer.",
        "Start from the right side."
      ],
      hadith: "\"Were it not for the fact that I did not want to make things too hard for my Ummah, I would have commanded them to use the miswak before every prayer.\"",
      source: "Sahih al-Bukhari 887; Sahih Muslim 252",
      sourceUrl: "https://sunnah.com/bukhari:887",
      benefit: "Purifies the mouth, pleases the Lord, and is a means of expiation."
    },
    {
      id: "wudu",
      title: "Perfect Your Wudu",
      arabicTitle: "الوضوء",
      timeLabel: "Before Fajr prayer",
      timeSlot: 4,
      category: "prayer",
      icon: "💧",
      shortDesc: "Perform wudu according to the Sunnah — it expiates sins between the fingers and toes.",
      steps: [
        "Begin with Bismillah.",
        "Wash hands three times.",
        "Rinse mouth and nostrils three times.",
        "Wash face three times.",
        "Wash right arm to elbow three times, then left.",
        "Wipe head once (front to back, then back to front), then wipe ears.",
        "Wash right foot to ankle three times, then left.",
        "Say the du'a after wudu."
      ],
      dua: {
        arabic: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
        transliteration: "Ash-hadu an lā ilāha illā-llāhu waḥdahu lā sharīka lah, wa-ash-hadu anna Muḥammadan ʿabduhu wa-rasūluh",
        translation: "I testify that none has the right to be worshipped but Allah alone, with no partner, and I testify that Muhammad is His slave and Messenger."
      },
      source: "Sahih Muslim 234; Sunan Abi Dawud 169",
      sourceUrl: "https://sunnah.com/muslim:234",
      benefit: "\"Whoever performs wudu as I have performed it, then prays two rak'ahs… his previous sins will be forgiven.\" [Bukhari 159]"
    },
    {
      id: "fajr_sunnah",
      title: "Two Rak'ahs Before Fajr",
      arabicTitle: "سنة الفجر",
      timeLabel: "Before Fajr iqamah",
      timeSlot: 5,
      category: "prayer",
      icon: "🕌",
      shortDesc: "The two sunnah rak'ahs of Fajr are better than this world and everything in it.",
      steps: [
        "Pray two light rak'ahs before the obligatory Fajr prayer.",
        "Recite Surah al-Kafirun in the first rak'ah and Surah al-Ikhlas in the second (or Surah al-Baqarah 2:136 and 3:64).",
        "Make them short — the Prophet ﷺ would shorten them greatly."
      ],
      hadith: "\"The two rak'ahs of Fajr are better than this world and all it contains.\"",
      source: "Sahih Muslim 725",
      sourceUrl: "https://sunnah.com/muslim:725",
      benefit: "Among the most emphasized voluntary prayers — the Prophet ﷺ never abandoned them even while travelling."
    },
    {
      id: "fajr_prayer",
      title: "Fajr Prayer in Congregation",
      arabicTitle: "صلاة الفجر",
      timeLabel: "Fajr time",
      timeSlot: 5,
      category: "prayer",
      icon: "🌅",
      shortDesc: "Praying Fajr and Isha in congregation equals worship for the whole night.",
      steps: [
        "Go to the masjid (or pray at home if unable).",
        "Pray 2 rak'ahs of obligatory Fajr.",
        "Remain seated after salah reciting morning adhkar."
      ],
      hadith: "\"Whoever prays Fajr is under the protection of Allah.\"",
      source: "Sahih Muslim 657",
      sourceUrl: "https://sunnah.com/muslim:657",
      benefit: "\"One who prays Fajr and Isha in congregation is as if he prayed the whole night.\" [Bukhari 623]"
    },
    {
      id: "morning_adhkar",
      title: "Morning Adhkar",
      arabicTitle: "أذكار الصباح",
      timeLabel: "After Fajr until sunrise",
      timeSlot: 6,
      category: "prayer",
      icon: "📿",
      shortDesc: "Recite the morning remembrances — they are a shield for the entire day.",
      steps: [
        "Remain seated after Fajr prayer.",
        "Recite the morning adhkar (see Adhkar tab for full list).",
        "Conclude with 100× SubhanAllah, Alhamdulillah, and Allahu Akbar or tasbih."
      ],
      hadith: "\"Whoever says in the morning: SubhanAllahi wa bihamdihi 100 times — no one will come on the Day of Resurrection with better deeds than him, except someone who said the same or more.\"",
      source: "Sahih Muslim 2692",
      sourceUrl: "https://sunnah.com/muslim:2692",
      benefit: "Comprehensive spiritual armour for the day ahead."
    },
    {
      id: "sit_sunrise",
      title: "Sit Until Sunrise (for Ishrak)",
      arabicTitle: "الجلوس حتى الشروق",
      timeLabel: "Fajr to ~20 min after sunrise",
      timeSlot: 6,
      category: "prayer",
      icon: "☀️",
      shortDesc: "Remaining in your place of prayer until the sun rises and then praying two rak'ahs equals a full Hajj and Umrah in reward.",
      steps: [
        "After Fajr, remain in your musalla (prayer place) doing dhikr, Qur'an, or du'a.",
        "Do not leave until the sun has fully risen (~15–20 min after sunrise).",
        "Pray two rak'ahs of Salat al-Ishraq (Duha)."
      ],
      hadith: "\"Whoever prays Fajr in congregation, then remains seated making dhikr until the sun rises, then prays two rak'ahs — he will have a reward like that of Hajj and Umrah, complete, complete, complete.\"",
      source: "Jami' al-Tirmidhi 586 (hasan)",
      sourceUrl: "https://sunnah.com/tirmidhi:586",
      benefit: "One of the greatest high-reward, low-effort practices of the morning."
    },
    {
      id: "breakfast_sunnah",
      title: "Sunnah of Eating & Breakfast",
      arabicTitle: "آداب الأكل",
      timeLabel: "Morning meal",
      timeSlot: 7,
      category: "eating",
      icon: "🍯",
      shortDesc: "Eat with your right hand, say Bismillah, and sit on the floor — the prophetic way.",
      steps: [
        "Say Bismillah before eating.",
        "Eat with the right hand.",
        "Eat from what is nearest to you on the plate.",
        "Do not blow on food or drink.",
        "Lick your fingers and the plate before washing them.",
        "Say Alhamdulillah after finishing."
      ],
      dua: {
        arabic: "بِسْمِ اللَّهِ",
        transliteration: "Bismillāh",
        translation: "In the name of Allah."
      },
      afterDua: {
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
        transliteration: "Al-ḥamdu lillāhi alladhī aṭʿamanī hādhā wa-razaqanīhi min ghayri ḥawlin minnī wa-lā quwwah",
        translation: "Praise be to Allah Who fed me this and provided it for me without any power or might from myself."
      },
      source: "Sahih al-Bukhari 5376; Sunan Abi Dawud 3767",
      sourceUrl: "https://sunnah.com/bukhari:5376",
      benefit: "Transforms a mundane act into worship. Eating from the centre of the plate removes blessings."
    },
    {
      id: "duha_prayer",
      title: "Salat al-Duha (Forenoon Prayer)",
      arabicTitle: "صلاة الضحى",
      timeLabel: "Mid-morning (after sunrise rises ~1hr)",
      timeSlot: 9,
      category: "prayer",
      icon: "🌤️",
      shortDesc: "Daily charity on behalf of every joint in your body — fulfilled by two rak'ahs of Duha.",
      steps: [
        "Pray at minimum 2 rak'ahs, up to 8 or 12.",
        "Begin when the sun is well above the horizon.",
        "Stop before the sun reaches its zenith (Dhuhr time)."
      ],
      hadith: "\"Every morning, each of the 360 joints of your body must give a charity. Saying SubhanAllah is a charity… and two rak'ahs of Duha prayer suffices for all of that.\"",
      source: "Sahih Muslim 720",
      sourceUrl: "https://sunnah.com/muslim:720",
      benefit: "Covers the full daily charity obligation and draws immense barakah."
    },
    {
      id: "dhuhr_prayer",
      title: "Dhuhr Prayer + 4 Sunnah",
      arabicTitle: "صلاة الظهر",
      timeLabel: "Early afternoon",
      timeSlot: 13,
      category: "prayer",
      icon: "🕌",
      shortDesc: "Pray the 4 sunnah before Dhuhr — the gates of heaven are open at this time.",
      steps: [
        "Pray 4 sunnah rak'ahs before Dhuhr.",
        "Pray the 4 obligatory rak'ahs.",
        "Pray 2 sunnah rak'ahs after."
      ],
      hadith: "\"Whoever observes the practice of praying four rak'ahs before Dhuhr and four after, Allah will forbid the Fire from touching him.\"",
      source: "Sunan Abi Dawud 1269 (sahih)",
      sourceUrl: "https://sunnah.com/abudawud:1269",
      benefit: "Protection from the Fire and accumulation of tremendous reward."
    },
    {
      id: "qaylulah",
      title: "Qaylulah — Prophetic Nap",
      arabicTitle: "القيلولة",
      timeLabel: "After Dhuhr",
      timeSlot: 13,
      category: "sleep",
      icon: "😴",
      shortDesc: "A brief midday rest — the Prophet ﷺ recommended it to help with night worship.",
      steps: [
        "Take a short nap after Dhuhr (20–30 min).",
        "Lie on your right side.",
        "Set an intention to wake for Asr."
      ],
      hadith: "\"Take the Qaylulah (midday nap), for the shayatin do not take Qaylulah.\"",
      source: "Musnad Abi Ya'la — authenticated by al-Albani in al-Silsilah al-Sahihah 1647",
      sourceUrl: "https://sunnah.com/",
      benefit: "Restores energy, reduces stress, and supports night prayer (Tahajjud)."
    },
    {
      id: "asr_prayer",
      title: "Asr Prayer — Guard It!",
      arabicTitle: "صلاة العصر",
      timeLabel: "Afternoon",
      timeSlot: 15,
      category: "prayer",
      icon: "🕌",
      shortDesc: "The 'middle prayer' — missing it is like losing one's family and wealth.",
      steps: [
        "Pray Asr on time — do not delay.",
        "Pray 4 obligatory rak'ahs.",
        "Begin evening adhkar as the sun begins to set."
      ],
      hadith: "\"Whoever misses the Asr prayer, it is as though he has lost his family and his wealth.\"",
      source: "Sahih al-Bukhari 552",
      sourceUrl: "https://sunnah.com/bukhari:552",
      benefit: "The angels who witnessed you in the morning and evening report your deeds to Allah — be in worship at those transitions."
    },
    {
      id: "evening_adhkar",
      title: "Evening Adhkar",
      arabicTitle: "أذكار المساء",
      timeLabel: "After Asr until Maghrib",
      timeSlot: 16,
      category: "prayer",
      icon: "📿",
      shortDesc: "The evening remembrances seal the day with spiritual protection.",
      steps: [
        "Recite evening adhkar after Asr (see Adhkar tab).",
        "These mirror the morning adhkar and complete the daily shield."
      ],
      source: "Hisnul Muslim; authenticated from Sahih al-Bukhari, Muslim, Abi Dawud, Tirmidhi",
      sourceUrl: "https://sunnah.com/",
      benefit: "Protection from the evil eye, jinn, and all harm until morning."
    },
    {
      id: "maghrib_prayer",
      title: "Maghrib Prayer + 2 Sunnah",
      arabicTitle: "صلاة المغرب",
      timeLabel: "Sunset",
      timeSlot: 18,
      category: "prayer",
      icon: "🌇",
      shortDesc: "Hasten to Maghrib — delay is disliked. Pray the 2 sunnah rak'ahs after.",
      steps: [
        "Break fast (if fasting) immediately at Maghrib with dates and water.",
        "Pray 3 obligatory rak'ahs of Maghrib.",
        "Pray 2 sunnah rak'ahs after."
      ],
      hadith: "\"My Ummah will remain upon goodness as long as they hasten to break fast.\"",
      source: "Sahih al-Bukhari 1957",
      sourceUrl: "https://sunnah.com/bukhari:1957",
      benefit: "Punctuality at Maghrib reflects tawakkul and submission to Allah's timing."
    },
    {
      id: "isha_prayer",
      title: "Isha Prayer + Witr",
      arabicTitle: "صلاة العشاء والوتر",
      timeLabel: "Night",
      timeSlot: 20,
      category: "prayer",
      icon: "🌃",
      shortDesc: "Pray Isha in congregation — equivalent to half the night in worship. End with Witr.",
      steps: [
        "Pray 4 obligatory rak'ahs of Isha.",
        "Pray 2 sunnah rak'ahs after.",
        "Pray Witr (minimum 1 rak'ah) before sleeping — make it the last prayer of the night.",
        "Recite Surah al-A'la, al-Kafirun, and al-Ikhlas/al-Falaq/al-Nas in Witr."
      ],
      hadith: "\"Make Witr the last of your night prayers.\"",
      source: "Sahih al-Bukhari 998",
      sourceUrl: "https://sunnah.com/bukhari:998",
      benefit: "Witr seals the night in worship and is among the most beloved voluntary prayers."
    },
    {
      id: "sleep_sunnah",
      title: "Prophetic Sleep Routine",
      arabicTitle: "آداب النوم",
      timeLabel: "Before sleeping",
      timeSlot: 21,
      category: "sleep",
      icon: "🌙",
      shortDesc: "The Prophet ﷺ had a complete sleep routine — from wudu to final du'a.",
      steps: [
        "Make wudu before sleeping.",
        "Dust off the bed three times with the hem of your garment.",
        "Sleep on your right side.",
        "Place your right hand under your right cheek.",
        "Recite Ayat al-Kursi (2:255) — you will be protected all night.",
        "Recite the final three Surahs (Al-Ikhlas, Al-Falaq, Al-Nas) 3× each — blow into your palms and wipe over your body.",
        "Recite the sleep du'a."
      ],
      dua: {
        arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
        transliteration: "Allāhumma bismika amūtu wa-aḥyā",
        translation: "O Allah, in Your name I die and I live."
      },
      source: "Sahih al-Bukhari 6311; Sahih Muslim 2714",
      sourceUrl: "https://sunnah.com/bukhari:6311",
      benefit: "\"Whoever recites Ayat al-Kursi before sleeping, Allah will appoint a guardian over him and no shaytan will come near him until morning.\" [Bukhari 2311]"
    }
  ],

  /* -------------------------------------------------------
     MORNING ADHKAR (after Fajr until sunrise)
  ------------------------------------------------------- */
  morningAdhkar: [
    {
      id: "ma_ayat_kursi",
      title: "Ayat al-Kursi",
      arabicTitle: "آية الكرسي",
      arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
      transliteration: "Allāhu lā ilāha illā huwa, al-ḥayyu al-qayyūm…",
      translation: "Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence…",
      count: 1,
      source: "Sahih al-Bukhari 2311",
      benefit: "Whoever recites it in the morning will be protected until evening."
    },
    {
      id: "ma_three_quls",
      title: "Three Quls (Al-Ikhlas, Al-Falaq, Al-Nas)",
      arabicTitle: "المعوذتان وسورة الإخلاص",
      arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ…",
      transliteration: "Qul huwa Allāhu aḥad… / Qul aʿūdhu bi-rabbi al-falaq… / Qul aʿūdhu bi-rabbi al-nās…",
      translation: "Say: He is Allah, the One… / Say: I seek refuge in the Lord of daybreak… / Say: I seek refuge in the Lord of mankind…",
      count: 3,
      source: "Sunan Abi Dawud 5082 (sahih)",
      benefit: "Three times in the morning and evening suffices against all harm."
    },
    {
      id: "ma_sayyid_istighfar",
      title: "Sayyid al-Istighfar (Master Supplication of Forgiveness)",
      arabicTitle: "سيد الاستغفار",
      arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
      transliteration: "Allāhumma anta rabbī lā ilāha illā ant, khalaqtanī wa-anā ʿabduk, wa-anā ʿalā ʿahdika wa-waʿdika ma-staṭaʿt, aʿūdhu bika min sharri mā ṣanaʿt, abūʾu laka bi-niʿmatika ʿalayy, wa-abūʾu bi-dhanbī fa-ghfir lī fa-innahu lā yaghfiru al-dhunūba illā ant",
      translation: "O Allah, You are my Lord, none has the right to be worshipped except You. You created me and I am Your servant, and I abide by Your covenant and Your promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favour upon me and I acknowledge my sin. So forgive me, for verily none can forgive sins except You.",
      count: 1,
      source: "Sahih al-Bukhari 6306",
      benefit: "\"Whoever says this in the morning with certainty and dies before evening, he is from the people of Paradise.\" [Bukhari 6306]"
    },
    {
      id: "ma_morning_protection",
      title: "Morning Protection Du'a",
      arabicTitle: "دعاء الصباح",
      arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
      transliteration: "Allāhumma bika aṣbaḥnā, wa-bika amsaynā, wa-bika naḥyā, wa-bika namūtu, wa-ilayka al-nushūr",
      translation: "O Allah, by Your leave we have reached the morning and by Your leave we have reached the evening, by Your leave we live and die, and unto You is the Resurrection.",
      count: 1,
      source: "Jami' al-Tirmidhi 3391 (hasan)",
      benefit: "Affirms complete dependence on Allah at the beginning of the day."
    },
    {
      id: "ma_tasbih",
      title: "SubhanAllah, Alhamdulillah, Allahu Akbar",
      arabicTitle: "التسبيح والتحميد والتكبير",
      arabic: "سُبْحَانَ اللَّهِ — الْحَمْدُ لِلَّهِ — اللَّهُ أَكْبَرُ",
      transliteration: "SubḥānAllāh — Al-ḥamdu lillāh — Allāhu Akbar",
      translation: "Glory be to Allah — Praise be to Allah — Allah is Greatest",
      count: 33,
      source: "Sahih Muslim 597",
      benefit: "\"Two words are light on the tongue, heavy on the scales, beloved to the Most Merciful.\" [Bukhari 6682]"
    },
    {
      id: "ma_dua_afiyah",
      title: "Du'a for Well-being (Afiyah)",
      arabicTitle: "دعاء العافية",
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
      transliteration: "Allāhumma innī asʾaluka al-ʿafwa wa-al-ʿāfiyata fī al-dunyā wa-al-ākhirah",
      translation: "O Allah, I ask You for pardon and well-being in this world and the Hereafter.",
      count: 1,
      source: "Sunan Abi Dawud 5074 (sahih)",
      benefit: "\"No one was ever given a gift better than well-being (ʿāfiyah).\" [Tirmidhi 3512]"
    }
  ],

  /* -------------------------------------------------------
     EVENING ADHKAR (after Asr until Maghrib)
  ------------------------------------------------------- */
  eveningAdhkar: [
    {
      id: "ea_three_quls",
      title: "Three Quls",
      arabicTitle: "المعوذتان وسورة الإخلاص",
      arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ…",
      transliteration: "Qul huwa Allāhu aḥad… / Qul aʿūdhu bi-rabbi al-falaq… / Qul aʿūdhu bi-rabbi al-nās…",
      translation: "Surah Al-Ikhlas, Al-Falaq, Al-Nas — each recited 3 times.",
      count: 3,
      source: "Sunan Abi Dawud 5082",
      benefit: "Complete protection from all harm until morning."
    },
    {
      id: "ea_evening_opener",
      title: "Evening Opener Du'a",
      arabicTitle: "دعاء المساء",
      arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ",
      transliteration: "Allāhumma bika amsaynā, wa-bika aṣbaḥnā, wa-bika naḥyā, wa-bika namūtu, wa-ilayka al-maṣīr",
      translation: "O Allah, by You we enter the evening and by You we enter the morning; by You we live and by You we die, and to You is the Final Return.",
      count: 1,
      source: "Jami' al-Tirmidhi 3391",
      benefit: "Evening mirror of the morning opener — bookends the day with Allah's remembrance."
    },
    {
      id: "ea_sayyid_istighfar",
      title: "Sayyid al-Istighfar",
      arabicTitle: "سيد الاستغفار",
      arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ…",
      transliteration: "Allāhumma anta rabbī lā ilāha illā ant…",
      translation: "O Allah, You are my Lord, none has the right to be worshipped except You…",
      count: 1,
      source: "Sahih al-Bukhari 6306",
      benefit: "\"Whoever says this in the evening with certainty and dies before morning, he is from the people of Paradise.\""
    },
    {
      id: "ea_protection",
      title: "Evening Protection",
      arabicTitle: "دعاء المساء للحفظ",
      arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
      transliteration: "Aʿūdhu bi-kalimāti Allāhi al-tāmmāti min sharri mā khalaq",
      translation: "I seek refuge in the Perfect Words of Allah from the evil of what He has created.",
      count: 3,
      source: "Sahih Muslim 2708",
      benefit: "\"Whoever says this three times in the evening will not be harmed by the sting of any creature that night.\" [Tirmidhi 3604]"
    },
    {
      id: "ea_tasbih",
      title: "Evening Tasbih",
      arabicTitle: "تسبيح المساء",
      arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
      transliteration: "SubḥānAllāhi wa-biḥamdih",
      translation: "Glory be to Allah and praise be to Him.",
      count: 100,
      source: "Sahih Muslim 2692",
      benefit: "Sins are forgiven even if they are as abundant as the foam of the sea."
    }
  ],

  /* -------------------------------------------------------
     SLEEP ADHKAR (before bed)
  ------------------------------------------------------- */
  sleepAdhkar: [
    {
      id: "sa_ayat_kursi",
      title: "Ayat al-Kursi",
      arabicTitle: "آية الكرسي",
      arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ…",
      transliteration: "Allāhu lā ilāha illā huwa al-ḥayyu al-qayyūm…",
      translation: "Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence…",
      count: 1,
      source: "Sahih al-Bukhari 2311",
      benefit: "A guardian from Allah is appointed over you until morning; no shaytan comes near."
    },
    {
      id: "sa_three_quls_bed",
      title: "Three Quls — Blow on Hands",
      arabicTitle: "المعوذتان وسورة الإخلاص قبل النوم",
      arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ… / قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ… / قُلْ أَعُوذُ بِرَبِّ النَّاسِ…",
      transliteration: "Qul huwa Allāhu aḥad… / Qul aʿūdhu bi-rabbi al-falaq… / Qul aʿūdhu bi-rabbi al-nās…",
      translation: "Recite each 3 times, then blow onto your palms and wipe over your face and body.",
      count: 3,
      source: "Sahih al-Bukhari 5017",
      benefit: "The Prophet ﷺ never missed this before sleeping — a comprehensive ruqyah."
    },
    {
      id: "sa_sleep_dua",
      title: "Sleep Du'a",
      arabicTitle: "دعاء النوم",
      arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
      transliteration: "Allāhumma bismika amūtu wa-aḥyā",
      translation: "O Allah, in Your name I die and I live.",
      count: 1,
      source: "Sahih al-Bukhari 6312",
      benefit: "Surrendering the soul to Allah consciously before sleep."
    },
    {
      id: "sa_tasbih_fatima",
      title: "Tasbih of Fatimah",
      arabicTitle: "تسبيح فاطمة",
      arabic: "سُبْحَانَ اللَّهِ — الْحَمْدُ لِلَّهِ — اللَّهُ أَكْبَرُ",
      transliteration: "SubḥānAllāh (33×) — Al-ḥamdu lillāh (33×) — Allāhu Akbar (34×)",
      translation: "Glory be to Allah (33) — Praise be to Allah (33) — Allah is Greatest (34)",
      count: 100,
      source: "Sahih al-Bukhari 3113",
      benefit: "\"This is better for you than a servant.\" [Bukhari 3705] — recommended by the Prophet ﷺ to his own daughter."
    },
    {
      id: "sa_sleep_position",
      title: "Sleep on Your Right Side",
      arabicTitle: "النوم على الجانب الأيمن",
      arabic: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
      transliteration: "Allāhumma qinī ʿadhābaka yawma tabʿathu ʿibādak",
      translation: "O Allah, protect me from Your punishment on the Day You resurrect Your servants.",
      count: 1,
      source: "Sahih al-Bukhari 6320; Sunan Abi Dawud 5045",
      benefit: "Sleeping on the right side (as the Prophet ﷺ did) is medically and spiritually optimal."
    }
  ],

  /* -------------------------------------------------------
     ADDITIONAL EXPLORE PRACTICES (by category)
  ------------------------------------------------------- */
  explorePractices: [
    {
      id: "exp_greeting",
      title: "Spread the Salaam",
      arabicTitle: "إفشاء السلام",
      category: "social",
      icon: "🤝",
      shortDesc: "Greet every Muslim you pass — especially those you don't know.",
      hadith: "\"You will not enter Paradise until you believe, and you will not believe until you love one another. Shall I tell you something that, if you do it, you will love one another? Spread the salaam amongst yourselves.\"",
      source: "Sahih Muslim 54",
      sourceUrl: "https://sunnah.com/muslim:54"
    },
    {
      id: "exp_smile",
      title: "Smile at Your Brother",
      arabicTitle: "التبسم في وجه أخيك",
      category: "social",
      icon: "😊",
      shortDesc: "A smile is sadaqah — free, easy, and beloved to Allah.",
      hadith: "\"Your smiling at your brother's face is charity (sadaqah).\"",
      source: "Jami' al-Tirmidhi 1956 (sahih)",
      sourceUrl: "https://sunnah.com/tirmidhi:1956"
    },
    {
      id: "exp_drinking",
      title: "Sunnah of Drinking",
      arabicTitle: "آداب الشرب",
      category: "eating",
      icon: "🥛",
      shortDesc: "Sit down, say Bismillah, drink in three sips, and say Alhamdulillah.",
      hadith: "\"Do not drink in one gulp like a camel, but drink in two or three gulps, say Bismillah when you start and Alhamdulillah when you finish.\"",
      source: "Jami' al-Tirmidhi 1885 (hasan)",
      sourceUrl: "https://sunnah.com/tirmidhi:1885"
    },
    {
      id: "exp_market_dua",
      title: "Du'a upon Entering the Market",
      arabicTitle: "دعاء دخول السوق",
      category: "social",
      icon: "🏪",
      shortDesc: "Say this du'a upon entering the market — earn a million hasanat in minutes.",
      hadith: "\"Whoever enters the market and says [this du'a] — Allah will write for him one million good deeds, erase one million of his bad deeds, and raise him one million degrees.\"",
      dua: {
        arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ حَيٌّ لَا يَمُوتُ، بِيَدِهِ الْخَيْرُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        transliteration: "Lā ilāha illā Allāhu waḥdahu lā sharīka lah, lahu al-mulku wa-lahu al-ḥamd, yuḥyī wa-yumīt, wa-huwa ḥayyun lā yamūt, bi-yadihi al-khayr, wa-huwa ʿalā kulli shayʾin qadīr",
        translation: "None has the right to be worshipped but Allah alone, with no partner. His is the dominion and His is the praise; He gives life and causes death, and He is Ever-Living and will never die. In His Hand is all good and He is able to do all things."
      },
      source: "Jami' al-Tirmidhi 3428 (hasan)",
      sourceUrl: "https://sunnah.com/tirmidhi:3428"
    },
    {
      id: "exp_quran_daily",
      title: "Daily Qur'an Recitation",
      arabicTitle: "تلاوة القرآن يومياً",
      category: "quran",
      icon: "📖",
      shortDesc: "Do not let a day pass without reciting at least some Qur'an.",
      hadith: "\"Recite the Qur'an, for it will come as an intercessor on the Day of Resurrection for its companions.\"",
      source: "Sahih Muslim 804",
      sourceUrl: "https://sunnah.com/muslim:804"
    },
    {
      id: "exp_friday_kahf",
      title: "Surah al-Kahf on Fridays",
      arabicTitle: "سورة الكهف يوم الجمعة",
      category: "quran",
      icon: "📜",
      shortDesc: "Recite Surah al-Kahf every Friday — it illuminates from one Friday to the next.",
      hadith: "\"Whoever reads Surah al-Kahf on Fridays, light will shine for him between two Fridays.\"",
      source: "Al-Hakim, authenticated — Sahih al-Targhib 736",
      sourceUrl: "https://sunnah.com/"
    },
    {
      id: "exp_wudu_before_sleep",
      title: "Wudu Before Sleep",
      arabicTitle: "الوضوء قبل النوم",
      category: "hygiene",
      icon: "🛁",
      shortDesc: "Be in a state of purity when you sleep — your soul is taken to Allah.",
      hadith: "\"When you go to bed, perform wudu as you would for prayer, then lie down on your right side…\"",
      source: "Sahih al-Bukhari 247",
      sourceUrl: "https://sunnah.com/bukhari:247"
    },
    {
      id: "exp_right_hand",
      title: "Use the Right Hand for Everything Good",
      arabicTitle: "البدء باليمين",
      category: "hygiene",
      icon: "🤲",
      shortDesc: "Enter with the right foot, eat with the right hand, start from the right side.",
      hadith: "\"The Prophet ﷺ liked to start from the right side in all his affairs — putting on shoes, combing his hair, and performing purification.\"",
      source: "Sahih al-Bukhari 168",
      sourceUrl: "https://sunnah.com/bukhari:168"
    },
    {
      id: "exp_sadaqah",
      title: "Give Sadaqah Daily",
      arabicTitle: "الصدقة اليومية",
      category: "social",
      icon: "💝",
      shortDesc: "Even a kind word, a smile, or helping someone cross the road is charity.",
      hadith: "\"Every day the sun rises, charity is due on every joint of a person's body.\"",
      source: "Sahih Muslim 1009",
      sourceUrl: "https://sunnah.com/muslim:1009"
    },
    {
      id: "exp_visit_sick",
      title: "Visit the Sick",
      arabicTitle: "عيادة المريض",
      category: "social",
      icon: "🏥",
      shortDesc: "Visiting a sick Muslim is a communal obligation and earns immense reward.",
      hadith: "\"When a Muslim visits his sick Muslim brother, he continues to be in the harvest of Paradise until he returns.\"",
      source: "Sahih Muslim 2568",
      sourceUrl: "https://sunnah.com/muslim:2568"
    }
  ]
};
