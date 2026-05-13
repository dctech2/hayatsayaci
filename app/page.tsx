"use client";

import { useEffect, useState } from "react";

import {
  Clock,
  DollarSign,
  Phone,
  Percent,
  CalendarDays,
  Smartphone,
  Moon,
  Timer,
  HeartPulse,
  Cake,
  Sparkles,
  CalendarCheck,
  Share2,
  Brain,
  AlertTriangle,
  Activity,
} from "lucide-react";

const cards = [
  {
    id: "time",
    title: "Zaman",
    icon: Clock,
    color: "from-red-500 to-red-700",
  },
  {
    id: "money",
    title: "Para",
    icon: DollarSign,
    color: "from-green-500 to-green-700",
  },
  {
    id: "life",
    title: "Yaşam",
    icon: CalendarDays,
    color: "from-blue-500 to-blue-700",
  },
  {
    id: "percent",
    title: "%",
    icon: Percent,
    color: "from-purple-500 to-purple-700",
  },
  {
    id: "phone",
    title: "Telefon",
    icon: Phone,
    color: "from-yellow-400 to-yellow-600",
  },
  {
    id: "social",
    title: "Sosyal",
    icon: Smartphone,
    color: "from-pink-500 to-pink-700",
  },
  {
    id: "sleep",
    title: "Uyku",
    icon: Moon,
    color: "from-indigo-500 to-indigo-700",
  },
  {
    id: "second",
    title: "Saniye",
    icon: Timer,
    color: "from-cyan-500 to-cyan-700",
  },
  {
    id: "heart",
    title: "Kalp",
    icon: HeartPulse,
    color: "from-rose-500 to-rose-700",
  },
  {
    id: "birth",
    title: "Doğum",
    icon: Cake,
    color: "from-emerald-500 to-emerald-700",
  },
  {
    id: "zodiac",
    title: "Burç",
    icon: Sparkles,
    color: "from-orange-500 to-orange-700",
  },
  {
    id: "day",
    title: "Gün",
    icon: CalendarCheck,
    color: "from-teal-500 to-teal-700",
  },
];

export default function Home() {
  const [active, setActive] = useState("time");

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BG EFFECT */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(255,0,100,0.15),transparent_40%)] pointer-events-none" />

      {/* HEADER */}
      <div className="text-center pt-10 pb-8 relative z-10">
        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-gray-300 to-gray-600 bg-clip-text text-transparent">
          Hayat Analizi AI 🚀
        </h1>

        <p className="text-gray-400 mt-4">
          Hayatının görünmeyen istatistiklerini keşfet
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 pb-12 flex flex-col lg:flex-row gap-8 relative z-10 items-start">
        {/* LEFT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">

          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                onClick={() => setActive(card.id)}
                className={`
                  h-40 rounded-3xl
                  bg-gradient-to-br ${card.color}
                  flex flex-col items-center justify-center
                  cursor-pointer
                  transition-all duration-300
                  hover:scale-105 hover:-translate-y-2
                  hover:shadow-[0_0_60px_rgba(255,255,255,0.18)]
                  border
                  ${
                    active === card.id
                      ? "border-white scale-105"
                      : "border-white/10"
                  }
                `}
              >
                <Icon size={42} />

                <p className="mt-4 text-xl font-bold">
                  {card.title}
                </p>
              </div>
            );
          })}

        </div>

        {/* RIGHT PANEL */}
        <div className="w-full lg:w-[420px] sticky top-6 bg-white/5 border border-white/10 rounded-[30px] p-6 backdrop-blur-xl min-h-[750px] shadow-[0_0_50px_rgba(255,255,255,0.06)]">

          {active === "time" && <TimePanel />}

          {active !== "time" && (
            <Coming />
          )}

        </div>

      </div>
    </main>
  );
}

/* TIME PANEL */

function TimePanel() {
  const [hours, setHours] = useState("");
  const [age, setAge] = useState("");

  const [seconds, setSeconds] = useState(0);

  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculate = () => {
    const h = Number(hours);
    const a = Number(age);

    if (!h || !a) return;

    const yearlyLostDays = Math.round((h * 365) / 24);

    const yearlyLostHours = h * 365;

    const projectedLostYears = (
      (yearlyLostDays * a) /
      365
    ).toFixed(1);

    const lifeScore = Math.max(
      0,
      100 - yearlyLostDays
    );

    let risk = "";
    let ai = "";
    let advice = "";

    if (yearlyLostDays < 15) {
      risk = "Düşük Risk";
      ai =
        "Zaman kullanımın şu an kontrol altında görünüyor.";
      advice =
        "Bu alışkanlığı azaltırsan ciddi avantaj elde edebilirsin.";
    } else if (yearlyLostDays < 40) {
      risk = "Orta Risk";
      ai =
        "Bu alışkanlık hayatının önemli kısmını tüketiyor.";
      advice =
        "Günde sadece 1 saat azaltman bile yılda haftalar kazandırabilir.";
    } else {
      risk = "Yüksek Risk";
      ai =
        "Bu alışkanlık zamanını sessizce tüketiyor olabilir.";
      advice =
        "Bu düzende devam edersen yıllarını kaybedebilirsin.";
    }

    const possibilities = [
      "1 yabancı dil öğrenebilirdin 🌍",
      "Kendi işini kurabilirdin 💼",
      "Yüzlerce kitap okuyabilirdin 📚",
      "Yazılım öğrenebilirdin 💻",
      "Profesyonel spor seviyesine yaklaşabilirdin 💪",
      "Dünyayı gezebilirdin ✈️",
    ];

    const random =
      possibilities[
        Math.floor(
          Math.random() * possibilities.length
        )
      ];

    setResult({
      yearlyLostDays,
      yearlyLostHours,
      projectedLostYears,
      lifeScore,
      risk,
      ai,
      advice,
      random,
    });
  };

  const share = async () => {
    if (!result) return;

    await navigator.share?.({
      title: "Hayat Analizi AI",
      text: `Yılda ${result.yearlyLostDays} gün kaybediyorum 😳`,
      url: window.location.href,
    });
  };

  return (
    <div>

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-2">
        <Brain className="text-red-400" />

        <h2 className="text-4xl font-black">
          Zaman AI Analizi
        </h2>
      </div>

      <p className="text-gray-400 mb-8">
        Yapay zeka destekli zaman analizi sistemi.
      </p>

      {/* INPUTS */}
      <div className="space-y-4">

        <input
          type="number"
          placeholder="Günde kaç saatini boşa harcıyorsun?"
          value={hours}
          onChange={(e) =>
            setHours(e.target.value)
          }
          className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 outline-none focus:border-red-500 transition-all"
        />

        <input
          type="number"
          placeholder="Kaç yaşındasın?"
          value={age}
          onChange={(e) =>
            setAge(e.target.value)
          }
          className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 outline-none focus:border-red-500 transition-all"
        />

        <button
          onClick={calculate}
          className="w-full bg-white text-black rounded-2xl p-4 font-black hover:scale-105 transition-all"
        >
          AI Analizini Başlat
        </button>

      </div>

      {/* LIVE COUNTER */}
      <div className="mt-6 bg-white/5 border border-white/10 rounded-3xl p-5">

        <p className="text-gray-400 text-sm">
          Canlı süre sayacı
        </p>

        <h1 className="text-5xl font-black text-cyan-400 mt-2">
          {seconds}s
        </h1>

      </div>

      {/* RESULTS */}
      {result && (
        <div className="mt-8 space-y-6 animate-in fade-in duration-500">

          {/* MAIN */}
          <div className="rounded-3xl bg-gradient-to-br from-red-500/20 to-red-900/20 border border-red-500/20 p-6 text-center">

            <h1 className="text-8xl font-black text-red-500">
              {result.yearlyLostDays}
            </h1>

            <p className="text-gray-300 mt-2">
              yılda kaybedilen gün
            </p>

            <div className="mt-6 flex justify-center">

              <div className="bg-red-500/20 border border-red-500/20 px-4 py-2 rounded-full flex items-center gap-2">
                <AlertTriangle size={18} />

                <span className="font-semibold">
                  {result.risk}
                </span>
              </div>

            </div>

          </div>

          {/* LIFE SCORE */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5">

            <div className="flex items-center gap-3 mb-4">
              <Activity className="text-green-400" />

              <h3 className="text-xl font-bold">
                Yaşam Skoru
              </h3>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400">
                Genel skor
              </span>

              <span className="text-4xl font-black text-green-400">
                {result.lifeScore}/100
              </span>
            </div>

            <div className="mt-4 h-4 bg-white/10 rounded-full overflow-hidden">

              <div
                className="h-full bg-green-400 rounded-full"
                style={{
                  width: `${result.lifeScore}%`,
                }}
              />

            </div>

          </div>

          {/* AI ANALYSIS */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5">

            <h3 className="text-xl font-bold mb-4">
              AI Yorumu 🤖
            </h3>

            <p className="text-gray-300 leading-8">
              {result.ai}
            </p>

          </div>

          {/* ADVICE */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-5">

            <h3 className="text-xl font-bold mb-4 text-yellow-400">
              AI Tavsiyesi
            </h3>

            <p className="text-yellow-200 leading-8">
              {result.advice}
            </p>

          </div>

          {/* PROJECTION */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5">

            <h3 className="text-xl font-bold mb-4">
              Hayat Projeksiyonu
            </h3>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span className="text-gray-400">
                  Yıllık kayıp saat
                </span>

                <span className="font-bold">
                  {result.yearlyLostHours}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">
                  Tahmini ömür kaybı
                </span>

                <span className="font-bold text-red-400">
                  {result.projectedLostYears} yıl
                </span>
              </div>

            </div>

          </div>

          {/* POSSIBILITY */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-5">

            <h3 className="text-xl font-bold mb-4 text-green-400">
              Bu sürede şunu yapabilirdin
            </h3>

            <p className="text-green-200 text-lg">
              {result.random}
            </p>

          </div>

          {/* SHARE */}
          <button
            onClick={share}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-4 flex items-center justify-center gap-3 font-bold hover:scale-105 transition-all"
          >
            <Share2 />

            Sonucu Paylaş
          </button>

        </div>
      )}

    </div>
  );
}

function Coming() {
  return (
    <div className="h-full flex items-center justify-center text-center">

      <div>
        <h2 className="text-4xl font-black">
          Yakında Aktif 🚀
        </h2>

        <p className="text-gray-400 mt-4">
          Yeni analiz sistemleri hazırlanıyor
        </p>
      </div>

    </div>
  );
}