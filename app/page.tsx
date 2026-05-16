"use client";

import { useEffect, useMemo, useState } from "react";

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
} from "lucide-react";

export default function Home() {
  const [birthDate, setBirthDate] = useState("");
  const [dailyLostHours, setDailyLostHours] =
    useState("");

  const [secondsAlive, setSecondsAlive] =
    useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!birthDate) return;

      const birth = new Date(birthDate);

      const diff =
        (Date.now() - birth.getTime()) / 1000;

      setSecondsAlive(Math.floor(diff));
    }, 1000);

    return () => clearInterval(interval);
  }, [birthDate]);

  const analysis = useMemo(() => {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    if (birth >= new Date()) return null;

    const now = new Date();

    const ageMs =
      now.getTime() - birth.getTime();

    const livedDays = Math.floor(
      ageMs / (1000 * 60 * 60 * 24)
    );

    const livedYears = (
      livedDays / 365
    ).toFixed(1);

    const averageLifeDays = 75 * 365;

    const lifePercent = Math.min(
      100,
      Math.round(
        (livedDays / averageLifeDays) * 100
      )
    );

    const remainingDays = Math.max(
      0,
      averageLifeDays - livedDays
    );

    const lostHours =
      Number(dailyLostHours || 0);

    const yearlyLostDays = Math.round(
      (lostHours * 365) / 24
    );

    const projectedLostYears = (
      (yearlyLostDays *
        Math.max(1, 75 - Number(livedYears))) /
      365
    ).toFixed(1);

    let risk = "";
    let ai = "";
    let aura = "";

    if (lifePercent < 25) {
      aura = "Hayatının başlangıç seviyesindesin 🚀";
    } else if (lifePercent < 50) {
      aura =
        "Hayatının en kritik dönemindesin ⚡";
    } else if (lifePercent < 75) {
      aura =
        "Zaman artık daha değerli hale geliyor ⏳";
    } else {
      aura =
        "Hayat zamanını dikkatli kullanman gereken dönemdesin 🌙";
    }

    if (yearlyLostDays < 15) {
      risk = "Düşük Risk";
      ai =
        "Zaman kullanımın şu an dengeli görünüyor.";
    } else if (yearlyLostDays < 40) {
      risk = "Orta Risk";
      ai =
        "Bazı alışkanlıkların hayat enerjini tüketiyor olabilir.";
    } else {
      risk = "Yüksek Risk";
      ai =
        "Bu tempo devam ederse yıllarını kaybedebilirsin.";
    }

    const score = Math.max(
      0,
      100 - yearlyLostDays
    );

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

  const share = async () => {
    if (!analysis) return;

    const text = `😳 Hayatımın %${analysis.lifePercent}'ini yaşadım!`;

    if (navigator.share) {
      await navigator.share({
        title: "Hayat Analizi AI",
        text,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(
        `${text} ${window.location.href}`
      );
      alert("Bağlantı panoya kopyalandı!");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-pink-500/10 blur-[150px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-cyan-500/10 blur-[150px] rounded-full" />

      {/* HEADER */}
      <div className="relative z-10 text-center pt-12 px-6">

        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">

          <Sparkles className="text-pink-400" />

          <span className="text-sm text-gray-300">
            AI destekli yaşam simülasyonu
          </span>

        </div>

        <h1 className="mt-8 text-6xl md:text-7xl font-black bg-gradient-to-r from-white via-gray-300 to-gray-600 bg-clip-text text-transparent">
          Hayat Analizi AI
        </h1>

        <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
          Hayatının görünmeyen istatistiklerini,
          zaman kullanımını ve yaşam projeksiyonunu keşfet.
        </p>

      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-[1fr_430px] gap-8 items-start">

        {/* LEFT */}
        <div className="space-y-8">

          {/* HERO */}
          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

            <div className="absolute top-0 right-0 w-60 h-60 bg-pink-500/10 blur-[100px] rounded-full" />

            <div className="relative z-10">

              <div className="flex items-center gap-4">

                <div className="p-4 rounded-3xl bg-pink-500/10 border border-pink-500/20">
                  <Brain
                    size={40}
                    className="text-pink-400"
                  />
                </div>

                <div>

                  <h2 className="text-4xl font-black">
                    Yaşam Yüzdesi AI
                  </h2>

                  <p className="text-gray-400 mt-2">
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
                  onChange={(e) =>
                    setBirthDate(
                      e.target.value
                    )
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl p-4 outline-none focus:border-pink-500 transition-all"
                />

                <input
                  type="number"
                  placeholder="Günde kaç saat boşa gidiyor?"
                  value={dailyLostHours}
                  min={0}
                  max={24}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 0 && val <= 24)
                      setDailyLostHours(e.target.value);
                  }}
                  className="bg-black/40 border border-white/10 rounded-2xl p-4 outline-none focus:border-pink-500 transition-all"
                />

              </div>

            </div>

          </div>

          {/* STATS */}
          {analysis && (
            <>
              {/* MAIN STAT */}
              <div className="rounded-[36px] bg-gradient-to-br from-pink-500/20 to-purple-900/20 border border-pink-500/20 p-10 text-center">

                <p className="text-gray-300 text-lg">
                  Hayatının yaşanan kısmı
                </p>

                <h1 className="text-[120px] leading-none font-black bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent mt-4">
                  %{analysis.lifePercent}
                </h1>

                <p className="text-pink-300 text-xl mt-6 font-semibold">
                  {analysis.aura}
                </p>

              </div>

              {/* MINI CARDS */}
              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

                <MiniCard
                  icon={<Calendar />}
                  title="Yaşanan Gün"
                  value={analysis.livedDays.toLocaleString()}
                />

                <MiniCard
                  icon={<Clock3 />}
                  title="Yaş"
                  value={`${analysis.livedYears}`}
                />

                <MiniCard
                  icon={<TrendingUp />}
                  title="Kalan Gün"
                  value={analysis.remainingDays.toLocaleString()}
                />

                <MiniCard
                  icon={<HeartPulse />}
                  title="Yaşam Skoru"
                  value={`${analysis.score}/100`}
                />

              </div>

              {/* LIVE */}
              <div className="rounded-[36px] border border-cyan-500/20 bg-cyan-500/10 p-8">

                <p className="text-cyan-300 text-lg">
                  Canlı yaşam sayacı
                </p>

                <h1 className="mt-4 text-6xl font-black text-cyan-400">
                  {secondsAlive.toLocaleString()}
                </h1>

                <p className="text-gray-400 mt-3">
                  saniyedir hayattasın
                </p>

              </div>

              {/* PROGRESS */}
              <div className="rounded-[36px] border border-white/10 bg-white/5 p-8">

                <div className="flex justify-between mb-5">

                  <span className="text-gray-400">
                    Hayat ilerleme seviyesi
                  </span>

                  <span className="font-bold">
                    %{analysis.lifePercent}
                  </span>

                </div>

                <div className="h-6 rounded-full bg-white/10 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-1000"
                    style={{
                      width: `${analysis.lifePercent}%`,
                    }}
                  />

                </div>

              </div>

              {/* AI ANALYSIS */}
              <div className="grid xl:grid-cols-2 gap-6">

                <div className="rounded-[36px] border border-white/10 bg-white/5 p-8">

                  <div className="flex items-center gap-3 mb-5">

                    <Brain className="text-pink-400" />

                    <h3 className="text-2xl font-black">
                      AI Yorumu
                    </h3>

                  </div>

                  <p className="text-gray-300 leading-8 text-lg">
                    {analysis.ai}
                  </p>

                </div>

                <div className="rounded-[36px] border border-red-500/20 bg-red-500/10 p-8">

                  <div className="flex items-center gap-3 mb-5">

                    <AlertTriangle className="text-red-400" />

                    <h3 className="text-2xl font-black text-red-300">
                      Risk Analizi
                    </h3>

                  </div>

                  <p className="text-red-200 text-2xl font-bold">
                    {analysis.risk}
                  </p>

                  <p className="text-red-200/70 mt-4 leading-7">
                    Bu alışkanlık devam ederse yaklaşık{" "}
                    {
                      analysis.projectedLostYears
                    }{" "}
                    yıl kaybedebilirsin.
                  </p>

                </div>

              </div>
            </>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="sticky top-6 space-y-6">

          {/* SHARE */}
          <button
            onClick={share}
            className="w-full rounded-[28px] bg-gradient-to-r from-pink-500 to-purple-600 p-5 font-bold flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300 shadow-[0_20px_80px_rgba(255,0,120,0.25)]"
          >

            <Share2 />

            Sonucu Paylaş

          </button>

          {/* AI PANEL */}
          <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

            <div className="flex items-center gap-3 mb-5">

              <Activity className="text-green-400" />

              <h3 className="text-2xl font-black">
                AI Önerileri
              </h3>

            </div>

            <div className="space-y-4">

              <Suggestion text="Günde 1 saat kazanırsan yılda yaklaşık 15 gün geri alabilirsin." />

              <Suggestion text="Telefon kullanımını azaltmak yaşam skorunu yükseltebilir." />

              <Suggestion text="En verimli saatlerini dikkat dağıtıcı şeylerden koru." />

              <Suggestion text="Zamanını bilinçli yönetmek uzun vadede hayat kaliteni artırır." />

            </div>

          </div>

          {/* FUTURE */}
          <div className="rounded-[36px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8">

            <h3 className="text-2xl font-black">
              Yakında 🚀
            </h3>

            <div className="mt-6 space-y-4 text-gray-300">

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
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl hover:scale-[1.03] transition-all duration-300">

      <div className="flex items-center justify-between">

        <div className="p-3 rounded-2xl bg-white/10">
          {icon}
        </div>

        <span className="text-gray-400 text-sm">
          {title}
        </span>

      </div>

      <h3 className="mt-8 text-4xl font-black">
        {value}
      </h3>

    </div>
  );
}

/* SUGGESTION */

function Suggestion({
  text,
}: {
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-gray-300 leading-7">
      {text}
    </div>
  );
}