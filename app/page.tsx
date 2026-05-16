"use client";

import React, { useEffect, useMemo, useState } from "react";

import {
  Brain,
  Calendar,
  Clock3,
  Activity,
  TrendingUp,
  HeartPulse,
  Sparkles,
  AlertTriangle,
  Share2,
  Sun,
  Moon,
} from "lucide-react";

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [birthDate, setBirthDate] = useState("");
  const [dailyLostHours, setDailyLostHours] = useState("");
  const [secondsAlive, setSecondsAlive] = useState(0);
  const [animatedPercent, setAnimatedPercent] = useState(0);

  const d = (dk: string, lt: string) => (isDark ? dk : lt);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!birthDate) return;
      const birth = new Date(birthDate);
      const diff = (Date.now() - birth.getTime()) / 1000;
      setSecondsAlive(Math.floor(diff));
    }, 1000);
    return () => clearInterval(interval);
  }, [birthDate]);

  const analysis = useMemo(() => {

    if (!birthDate) return null;
    const birth = new Date(birthDate);
    if (birth >= new Date()) return null;

    const now = new Date();
    const ageMs = now.getTime() - birth.getTime();
    const livedDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));
    const livedYears = (livedDays / 365).toFixed(1);
    const averageLifeDays = 75 * 365;
    const lifePercent = Math.min(100, Math.round((livedDays / averageLifeDays) * 100));
    const remainingDays = Math.max(0, averageLifeDays - livedDays);
    const lostHours = Number(dailyLostHours || 0);
    const yearlyLostDays = Math.round((lostHours * 365) / 24);
    const projectedLostYears = (
      (yearlyLostDays * Math.max(1, 75 - Number(livedYears))) / 365
    ).toFixed(1);

    let risk = "";
    let ai = "";
    let aura = "";

    if (lifePercent < 25) {
      aura = "Hayatının başlangıç seviyesindesin 🚀";
    } else if (lifePercent < 50) {
      aura = "Hayatının en kritik dönemindesin ⚡";
    } else if (lifePercent < 75) {
      aura = "Zaman artık daha değerli hale geliyor ⏳";
    } else {
      aura = "Hayat zamanını dikkatli kullanman gereken dönemdesin 🌙";
    }

    if (yearlyLostDays < 15) {
      risk = "Düşük Risk";
      ai = "Zaman kullanımın şu an dengeli görünüyor.";
    } else if (yearlyLostDays < 40) {
      risk = "Orta Risk";
      ai = "Bazı alışkanlıkların hayat enerjini tüketiyor olabilir.";
    } else {
      risk = "Yüksek Risk";
      ai = "Bu tempo devam ederse yıllarını kaybedebilirsin.";
    }

    const score = Math.max(0, 100 - yearlyLostDays);

    return {
      livedDays,
      livedYears,
      lifePercent,
      remainingDays,
      yearlyLostDays,
      projectedLostYears,
      risk,
      ai,
      aura,
      score,
    };
  }, [birthDate, dailyLostHours]);

  useEffect(() => {
    if (!analysis) { setAnimatedPercent(0); return; }
    setAnimatedPercent(0);
    const t = setTimeout(() => setAnimatedPercent(analysis.lifePercent), 700);
    return () => clearTimeout(t);
  }, [analysis]);

  const share = async () => {
    if (!analysis) return;
    const text = `😳 Hayatımın %${analysis.lifePercent}'ini yaşadım!`;
    if (navigator.share) {
      await navigator.share({ title: "Hayat Analizi AI", text, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(`${text} ${window.location.href}`);
      alert("Bağlantı panoya kopyalandı!");
    }
  };

  return (
    <main className={`min-h-screen ${d("bg-black text-white", "bg-gray-50 text-gray-900")} overflow-hidden relative transition-colors duration-300`}>

      {/* BACKGROUND */}
      <div className={`absolute top-0 left-0 w-[700px] h-[700px] ${d("bg-pink-500/10", "bg-pink-400/15")} blur-[150px] rounded-full`} />
      <div className={`absolute bottom-0 right-0 w-[700px] h-[700px] ${d("bg-cyan-500/10", "bg-cyan-400/15")} blur-[150px] rounded-full`} />

      {/* HEADER */}
      <div className="relative z-10 pt-12 px-6">

        {/* THEME TOGGLE */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-3 rounded-2xl border transition-all duration-300 ${d("bg-white/5 border-white/10 hover:bg-white/10 text-yellow-300", "bg-white border-gray-200 hover:bg-gray-100 text-gray-600 shadow-sm")}`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="text-center">
        <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-full ${d("bg-white/5 border-white/10", "bg-white border-gray-200 shadow-sm")} border backdrop-blur-xl`}>
          <Sparkles className="text-pink-400" />
          <span className={`text-sm ${d("text-gray-300", "text-gray-600")}`}>
            AI destekli yaşam simülasyonu
          </span>
        </div>

        <h1 className={`mt-8 text-4xl sm:text-6xl md:text-7xl font-black bg-gradient-to-r ${d("from-white via-gray-300 to-gray-600", "from-gray-900 via-gray-700 to-gray-500")} bg-clip-text text-transparent`}>
          Hayat Analizi AI
        </h1>

        <p className={`mt-6 ${d("text-gray-400", "text-gray-500")} text-lg max-w-2xl mx-auto`}>
          Hayatının görünmeyen istatistiklerini,
          zaman kullanımını ve yaşam projeksiyonunu keşfet.
        </p>

        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-[1fr_430px] gap-8 items-start">

        {/* LEFT */}
        <div className="space-y-8">

          {/* HERO */}
          <div className={`relative overflow-hidden rounded-[36px] border ${d("border-white/10 bg-white/5", "border-gray-200 bg-white shadow-sm")} p-8 backdrop-blur-2xl`}>
            <div className={`absolute top-0 right-0 w-60 h-60 ${d("bg-pink-500/10", "bg-pink-400/10")} blur-[100px] rounded-full`} />

            <div className="relative z-10">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-3xl ${d("bg-pink-500/10 border-pink-500/20", "bg-pink-50 border-pink-200")} border`}>
                  <Brain size={40} className="text-pink-400" />
                </div>
                <div>
                  <h2 className="text-4xl font-black">Yaşam Yüzdesi AI</h2>
                  <p className={`${d("text-gray-400", "text-gray-500")} mt-2`}>
                    Yapay zeka destekli yaşam analizi
                  </p>
                </div>
              </div>

              {/* INPUTS */}
              <div className="mt-10 grid md:grid-cols-2 gap-4">
                <input
                  type="date"
                  value={birthDate}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className={`${d("bg-black/40 border-white/10 text-white", "bg-gray-50 border-gray-300 text-gray-900")} border rounded-2xl p-4 outline-none focus:border-pink-500 transition-all`}
                />
                <input
                  type="number"
                  placeholder="Günde kaç saat boşa gidiyor?"
                  value={dailyLostHours}
                  min={0}
                  max={24}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 0 && val <= 24) setDailyLostHours(e.target.value);
                  }}
                  className={`${d("bg-black/40 border-white/10 text-white placeholder:text-gray-500", "bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400")} border rounded-2xl p-4 outline-none focus:border-pink-500 transition-all`}
                />
              </div>

              <p className={`mt-4 text-xs ${d("text-gray-500", "text-gray-400")}`}>
                * Hesaplamalar TÜİK verilerine göre Türkiye ortalama insan ömrü olan <span className="font-semibold">75 yıl</span> baz alınarak yapılmaktadır.
              </p>
            </div>
          </div>

          {/* STATS */}
          {analysis && (
            <React.Fragment key={birthDate}>
              {/* MAIN STAT */}
              <div
                className={`anim-pop rounded-[36px] bg-gradient-to-br ${d("from-pink-500/20 to-purple-900/20 border-pink-500/20", "from-pink-50 to-purple-50 border-pink-200")} border p-8 sm:p-10 text-center`}
                style={{ animationDelay: "0ms" }}
              >
                <p className={`${d("text-gray-300", "text-gray-600")} text-lg`}>
                  Hayatının yaşanan kısmı
                </p>
                <h1 className={`text-[72px] sm:text-[120px] leading-none font-black bg-gradient-to-b ${d("from-white to-gray-500", "from-gray-900 to-gray-400")} bg-clip-text text-transparent mt-4`}>
                  %{analysis.lifePercent}
                </h1>
                <p className={`${d("text-pink-300", "text-pink-600")} text-xl mt-6 font-semibold`}>
                  {analysis.aura}
                </p>
              </div>

              {/* MINI CARDS */}
              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                <MiniCard isDark={isDark} delay={150} icon={<Calendar />} title="Yaşanan Gün" value={analysis.livedDays.toLocaleString()} />
                <MiniCard isDark={isDark} delay={230} icon={<Clock3 />} title="Yaş" value={`${analysis.livedYears}`} />
                <MiniCard isDark={isDark} delay={310} icon={<TrendingUp />} title="Kalan Gün" value={analysis.remainingDays.toLocaleString()} />
                <MiniCard isDark={isDark} delay={390} icon={<HeartPulse />} title="Yaşam Skoru" value={`${analysis.score}/100`} />
              </div>

              {/* LIVE */}
              <div
                className={`anim-slide rounded-[36px] border ${d("border-cyan-500/20 bg-cyan-500/10", "border-cyan-200 bg-cyan-50")} p-8`}
                style={{ animationDelay: "480ms" }}
              >
                <p className={`${d("text-cyan-300", "text-cyan-700")} text-lg`}>
                  Canlı yaşam sayacı
                </p>
                <h1 className={`mt-4 text-4xl sm:text-6xl font-black ${d("text-cyan-400", "text-cyan-600")} break-all`}>
                  {secondsAlive.toLocaleString()}
                </h1>
                <p className={`${d("text-gray-400", "text-gray-500")} mt-3`}>
                  saniyedir hayattasın
                </p>
              </div>

              {/* PROGRESS */}
              <div
                className={`anim-slide rounded-[36px] border ${d("border-white/10 bg-white/5", "border-gray-200 bg-white shadow-sm")} p-8`}
                style={{ animationDelay: "580ms" }}
              >
                <div className="flex justify-between mb-5">
                  <span className={d("text-gray-400", "text-gray-500")}>
                    Hayat ilerleme seviyesi
                  </span>
                  <span className="font-bold">%{analysis.lifePercent}</span>
                </div>
                <div className={`h-6 rounded-full ${d("bg-white/10", "bg-gray-200")} overflow-hidden`}>
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-[1200ms] ease-out"
                    style={{ width: `${animatedPercent}%` }}
                  />
                </div>
              </div>

              {/* AI ANALYSIS */}
              <div
                className="grid xl:grid-cols-2 gap-6 anim-slide"
                style={{ animationDelay: "700ms" }}
              >
                <div className={`rounded-[36px] border ${d("border-white/10 bg-white/5", "border-gray-200 bg-white shadow-sm")} p-8`}>
                  <div className="flex items-center gap-3 mb-5">
                    <Brain className="text-pink-400" />
                    <h3 className="text-2xl font-black">AI Yorumu</h3>
                  </div>
                  <p className={`${d("text-gray-300", "text-gray-600")} leading-8 text-lg`}>
                    {analysis.ai}
                  </p>
                </div>

                <div className={`rounded-[36px] border ${d("border-red-500/20 bg-red-500/10", "border-red-200 bg-red-50")} p-8`}>
                  <div className="flex items-center gap-3 mb-5">
                    <AlertTriangle className="text-red-400" />
                    <h3 className={`text-2xl font-black ${d("text-red-300", "text-red-700")}`}>
                      Risk Analizi
                    </h3>
                  </div>
                  <p className={`${d("text-red-200", "text-red-600")} text-2xl font-bold`}>
                    {analysis.risk}
                  </p>
                  <p className={`${d("text-red-200/70", "text-red-500")} mt-4 leading-7`}>
                    Bu alışkanlık devam ederse yaklaşık {analysis.projectedLostYears} yıl kaybedebilirsin.
                  </p>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="sticky top-6 space-y-6">

          {/* SHARE */}
          <button
            onClick={share}
            className="w-full rounded-[28px] bg-gradient-to-r from-pink-500 to-purple-600 p-5 font-bold flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300 shadow-[0_20px_80px_rgba(255,0,120,0.25)] text-white"
          >
            <Share2 />
            Sonucu Paylaş
          </button>

          {/* AI PANEL */}
          <div className={`rounded-[36px] border ${d("border-white/10 bg-white/5", "border-gray-200 bg-white shadow-sm")} p-8 backdrop-blur-2xl`}>
            <div className="flex items-center gap-3 mb-5">
              <Activity className="text-green-400" />
              <h3 className="text-2xl font-black">AI Önerileri</h3>
            </div>
            <div className="space-y-4">
              <Suggestion isDark={isDark} text="Günde 1 saat kazanırsan yılda yaklaşık 15 gün geri alabilirsin." />
              <Suggestion isDark={isDark} text="Telefon kullanımını azaltmak yaşam skorunu yükseltebilir." />
              <Suggestion isDark={isDark} text="En verimli saatlerini dikkat dağıtıcı şeylerden koru." />
              <Suggestion isDark={isDark} text="Zamanını bilinçli yönetmek uzun vadede hayat kaliteni artırır." />
            </div>
          </div>

          {/* FUTURE */}
          <div className={`rounded-[36px] border ${d("border-white/10 bg-gradient-to-br from-white/10 to-white/5", "border-gray-200 bg-gradient-to-br from-gray-100 to-gray-50")} p-8`}>
            <h3 className="text-2xl font-black">Yakında 🚀</h3>
            <div className={`mt-6 space-y-4 ${d("text-gray-300", "text-gray-600")}`}>
              <p>• Gerçek AI sohbet sistemi</p>
              <p>• Kişilik analizi</p>
              <p>• Yaşam haritası</p>
              <p>• Günlük zaman takibi</p>
              <p>• AI yaşam koçu</p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

/* MINI CARD */

function MiniCard({
  isDark,
  delay,
  icon,
  title,
  value,
}: {
  isDark: boolean;
  delay?: number;
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div
      className={`anim-slide rounded-[30px] border ${isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-white shadow-sm"} p-6 backdrop-blur-2xl hover:scale-[1.03] transition-all duration-300`}
      style={delay !== undefined ? { animationDelay: `${delay}ms` } : undefined}
    >
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-2xl ${isDark ? "bg-white/10" : "bg-gray-100"}`}>
          {icon}
        </div>
        <span className={`${isDark ? "text-gray-400" : "text-gray-500"} text-sm`}>
          {title}
        </span>
      </div>
      <h3 className="mt-8 text-4xl font-black">{value}</h3>
    </div>
  );
}

/* SUGGESTION */

function Suggestion({
  isDark,
  text,
}: {
  isDark: boolean;
  text: string;
}) {
  return (
    <div className={`rounded-2xl border ${isDark ? "border-white/10 bg-black/20 text-gray-300" : "border-gray-200 bg-gray-50 text-gray-700"} p-4 leading-7`}>
      {text}
    </div>
  );
}
