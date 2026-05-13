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
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="text-center pt-10 pb-8">
        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
          Hayat Analizi 🚀
        </h1>

        <p className="text-gray-400 mt-4">
          Hayatının gerçek verilerini keşfet
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 pb-12 grid lg:grid-cols-[1.2fr_0.8fr] gap-8">

        {/* SOL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

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
                  hover:shadow-[0_0_50px_rgba(255,255,255,0.15)]
                  shadow-2xl
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

        {/* SAĞ PANEL */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl min-h-[700px] shadow-[0_0_40px_rgba(255,255,255,0.05)]">

          {active === "time" && <TimePanel />}

          {active !== "time" && (
            <Coming title="Yakında Aktif 🚀" />
          )}

        </div>
      </div>
    </main>
  );
}

function TimePanel() {
  const [hours, setHours] = useState("");
  const [age, setAge] = useState("");

  const [result, setResult] = useState<any>(null);

  const [liveSeconds, setLiveSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculate = () => {
    const h = Number(hours);
    const a = Number(age);

    if (!h || !a) return;

    const lostDays = Math.round((h * 365) / 24);

    const lostYears = (
      (lostDays * a) /
      365
    ).toFixed(1);

    const yearlyHours = h * 365;

    let ai = "";

    if (lostDays < 20) {
      ai =
        "Zaman kaybın düşük ama yıllar içinde büyüyor.";
    } else if (lostDays < 50) {
      ai =
        "Hayatının ciddi bir kısmını fark etmeden kaybediyorsun.";
    } else {
      ai =
        "Bu alışkanlık hayatından yıllar çalabilir.";
    }

    const possibilities = [
      "1 yabancı dil öğrenebilirdin 🌍",
      "Kendi işini kurabilirdin 💼",
      "Yüzlerce kitap okuyabilirdin 📚",
      "Yazılım öğrenebilirdin 💻",
      "Vücudunu tamamen değiştirebilirdin 💪",
    ];

    const random =
      possibilities[
        Math.floor(
          Math.random() * possibilities.length
        )
      ];

    setResult({
      lostDays,
      lostYears,
      yearlyHours,
      ai,
      random,
    });
  };

  const share = async () => {
    if (!result) return;

    const text = `Yılda ${result.lostDays} günümü kaybediyorum 😳`;

    await navigator.share?.({
      title: "Hayat Analizi",
      text,
      url: window.location.href,
    });
  };

  return (
    <div>

      <h2 className="text-4xl font-black mb-2">
        Zaman Analizi ⏳
      </h2>

      <p className="text-gray-400 mb-8">
        Zamanının gerçekte ne kadarını kaybettiğini öğren.
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
          className="w-full bg-white text-black font-black rounded-2xl p-4 hover:scale-105 transition-all"
        >
          Analizi Başlat
        </button>

      </div>

      {/* LIVE COUNTER */}
      <div className="mt-8 bg-white/5 rounded-2xl p-4 border border-white/10">

        <p className="text-gray-400 text-sm">
          Sayfada geçirilen canlı süre
        </p>

        <h1 className="text-4xl font-black mt-2 text-cyan-400">
          {liveSeconds} sn
        </h1>

      </div>

      {/* RESULT */}
      {result && (
        <div className="mt-8 space-y-6 animate-in fade-in duration-500">

          {/* BIG RESULT */}
          <div className="bg-gradient-to-br from-red-500/20 to-red-900/20 border border-red-500/20 rounded-3xl p-6 text-center">

            <h1 className="text-7xl font-black text-red-500">
              {result.lostDays}
            </h1>

            <p className="text-gray-300 mt-2">
              yılda kaybedilen gün
            </p>

            <p className="mt-6 text-xl text-red-300 font-semibold">
              Hayatının yaklaşık{" "}
              {result.lostYears} yılı
              kaybolabilir.
            </p>

          </div>

          {/* AI */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5">

            <h3 className="font-bold text-lg mb-3">
              Yapay Zeka Yorumu 🤖
            </h3>

            <p className="text-gray-300 leading-7">
              {result.ai}
            </p>

          </div>

          {/* POSSIBILITY */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-5">

            <h3 className="font-bold text-lg mb-3 text-green-400">
              Bu sürede şunu yapabilirdin:
            </h3>

            <p className="text-green-300 text-lg">
              {result.random}
            </p>

          </div>

          {/* GRAPH */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5">

            <h3 className="font-bold text-lg mb-6">
              Yıllık Kayıp Grafiği 📊
            </h3>

            <div className="space-y-3">

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Zaman Kaybı</span>
                  <span>
                    {result.yearlyHours} saat
                  </span>
                </div>

                <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{
                      width: `${Math.min(
                        result.lostDays,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

            </div>

          </div>

          {/* SHARE */}
          <button
            onClick={share}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-4 font-bold hover:scale-105 transition-all"
          >
            <Share2 size={20} />

            Sonucu Paylaş
          </button>

        </div>
      )}

    </div>
  );
}

function Coming({
  title,
}: {
  title: string;
}) {
  return (
    <div className="h-full flex items-center justify-center text-center">

      <div>
        <h2 className="text-4xl font-black">
          {title}
        </h2>

        <p className="text-gray-400 mt-4">
          Yakında aktif olacak
        </p>
      </div>

    </div>
  );
}