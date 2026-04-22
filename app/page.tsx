"use client";
import { useState } from "react";

const messages = {
  yuzlesme: {
    kucuk: [
      "Farkında olmadan zamanını harcıyorsun.",
      "Küçük gibi görünen şeyler birikiyor."
    ],
    orta: [
      "Bu alışkanlık zamanının ciddi bir kısmını alıyor.",
      "Düşündüğünden daha fazla zaman kaybediyorsun."
    ],
    buyuk: [
      "Bu, hayatından büyük bir parçayı kaybettiğin anlamına geliyor.",
      "Zamanın sessizce elinden kayıp gidiyor."
    ]
  }
};

const comparisons = [
  "Bu sürede 60 film izleyebilirdin 🎬",
  "Yeni bir dil öğrenmeye başlayabilirdin 🌍",
  "Düzenli spor yaparak form kazanabilirdin 💪",
  "Kendine yeni bir beceri katabilirdin 🚀",
  "Yüzlerce sayfa kitap okuyabilirdin 📚"
];

export default function Home() {
  const [value, setValue] = useState("");
  const [age, setAge] = useState("");
  const [dailyCost, setDailyCost] = useState(""); // varsayılan TL
  const [result, setResult] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [comparison, setComparison] = useState("");
  const [money, setMoney] = useState<number | null>(null);

  const calculate = () => {
    const hours = parseFloat(value);
    const cost = parseFloat(dailyCost);

    if (!isNaN(hours)) {
      const yearly = hours * 365;
      setResult(yearly);

      // mesaj seviyesi
      let level: "kucuk" | "orta" | "buyuk" = "kucuk";
      if (yearly > 500) level = "buyuk";
      else if (yearly > 150) level = "orta";

      const randomMessage =
        messages.yuzlesme[level][
          Math.floor(Math.random() * messages.yuzlesme[level].length)
        ];

      setMessage(randomMessage);

      // kıyas
      const randomComparison =
        comparisons[Math.floor(Math.random() * comparisons.length)];
      setComparison(randomComparison);

      // para hesap
      if (!isNaN(cost)) {
        const estimatedMoney = cost * 365;
        setMoney(estimatedMoney);
      }
    }
  };

  const reset = () => {
    setValue("");
    setAge("");
    setResult(null);
    setMessage("");
    setComparison("");
    setMoney(null);
  };

  const days = result ? Math.round(result / 24) : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">

        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center shadow-2xl">

          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight drop-shadow-lg">
            Hayatın nereye gidiyor?
          </h1>

          <p className="text-gray-400 mb-8">
            Küçük alışkanlıklarının sana gerçekte neye mal olduğunu gör.
          </p>

          {/* Saat */}
          <input
            type="number"
            placeholder="Günde kaç saat harcıyorsun? (örn: 2)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-4 rounded-xl bg-white text-black mb-4"
          />

          {/* TL */}
          <input
            type="number"
            placeholder="Günde kaç TL harcıyorsun? (örn: 50)"
            value={dailyCost}
            onChange={(e) => setDailyCost(e.target.value)}
            className="w-full p-4 rounded-xl bg-white text-black mb-4"
          />

          {/* Yaş */}
          <input
            type="number"
            placeholder="Kaç yaşındasın? (örn: 25)"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-4 rounded-xl bg-white text-black mb-4"
          />

          {/* Hızlı seçim */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <button onClick={() => setValue("2")} className="bg-white/10 px-4 py-2 rounded-full text-sm">
              📱 Instagram
            </button>
            <button onClick={() => setValue("1")} className="bg-white/10 px-4 py-2 rounded-full text-sm">
              ☕ Kahve
            </button>
            <button onClick={() => setValue("3")} className="bg-white/10 px-4 py-2 rounded-full text-sm">
              🎬 Dizi
            </button>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Gerçeği Göster
          </button>

          {result !== null && (
            <div className="mt-10 space-y-5">

              <h2 className="text-7xl font-bold text-red-500">
                {days} gün
              </h2>

              <p className="text-gray-400">
                Yılda {result} saat
              </p>

              <p className="text-xl font-semibold">
                Bu, her yıl hayatının {days} gününü kaybettiğin anlamına geliyor.
              </p>

              {days > 20 && (
                <p className="text-red-600 font-bold">
                  Bu artık küçük bir alışkanlık değil.
                </p>
              )}

              <p className="text-gray-300">{message}</p>

              <p className="text-yellow-400">{comparison}</p>

              {money && (
                <p className="text-green-400 font-semibold">
                  Bu alışkanlık sana yılda yaklaşık {money.toLocaleString()} TL’ye mal oluyor
                </p>
              )}

              <p className="text-red-400">
                5 yılda {days * 5} gününü kaybediyorsun.
              </p>

              {age && (
                <p className="text-purple-400">
                  60 yaşına kadar {days * (60 - Number(age))} gün kaybedeceksin.
                </p>
              )}

              <p className="text-gray-500 text-sm">
                Senin gibi kullanıcılar günde ortalama 2-3 saatini kaybediyor.
              </p>

              <div className="text-gray-400">
                <p>Bu süreyle:</p>
                <ul>
                  <li>• Yeni bir beceri öğrenebilirdin</li>
                  <li>• Kendine yatırım yapabilirdin</li>
                  <li>• Daha sağlıklı bir rutin oluşturabilirdin</li>
                </ul>
              </div>

              <button
                onClick={() => {
                  const text = `Ben yılda ${result} saatimi kaybediyorum. Sen ne kadarını kaybediyorsun? 👉 hayatsayaci.com`;
                  navigator.clipboard.writeText(text);
                  alert("Kopyalandı!");
                }}
                className="bg-red-500 px-6 py-3 rounded-xl mt-4"
              >
                Paylaş
              </button>

              <button onClick={reset} className="text-gray-400 underline mt-2">
                Tekrar dene
              </button>

            </div>
          )}

        </div>
      </div>
    </main>
  );
}