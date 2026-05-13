"use client";
import { useState } from "react";
import {
  Clock, DollarSign, Phone, Percent, CalendarDays,
  Smartphone, Moon, Timer, HeartPulse, Cake, Sparkles, CalendarCheck
} from "lucide-react";

export default function Home() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <main className="min-h-screen flex flex-col items-center bg-black text-white p-6">

      <h1 className="text-4xl font-bold mb-8">Hayat Analizi</h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">

        <Card title="Zaman" icon={Clock} color="from-red-500 to-red-700"
          active={active==="time"} onClick={()=>setActive(active==="time"?null:"time")}>
          <TimeModule />
        </Card>

        <Card title="Para" icon={DollarSign} color="from-green-500 to-green-700"
          active={active==="money"} onClick={()=>setActive(active==="money"?null:"money")}>
          <MoneyModule />
        </Card>

        <Card title="Yaşam" icon={CalendarDays} color="from-blue-500 to-blue-700"
          active={active==="life"} onClick={()=>setActive(active==="life"?null:"life")}>
          <LifeModule />
        </Card>

        <Card title="%" icon={Percent} color="from-purple-500 to-purple-700"
          active={active==="percent"} onClick={()=>setActive(active==="percent"?null:"percent")}>
          <PercentModule />
        </Card>

        <Card title="Telefon" icon={Phone} color="from-yellow-400 to-yellow-600"
          active={active==="phone"} onClick={()=>setActive(active==="phone"?null:"phone")}>
          <PhoneModule />
        </Card>

        {/* boş kartlar */}
        <Card title="Sosyal" icon={Smartphone} color="from-pink-500 to-pink-700"
          active={active==="social"} onClick={()=>setActive(active==="social"?null:"social")}>
          <SmallBox>Yakında...</SmallBox>
        </Card>

        <Card title="Uyku" icon={Moon} color="from-indigo-500 to-indigo-700"
          active={active==="sleep"} onClick={()=>setActive(active==="sleep"?null:"sleep")}>
          <SmallBox>Yakında...</SmallBox>
        </Card>

        <Card title="Saniye" icon={Timer} color="from-cyan-500 to-cyan-700"
          active={active==="seconds"} onClick={()=>setActive(active==="seconds"?null:"seconds")}>
          <SmallBox>Yakında...</SmallBox>
        </Card>

        <Card title="Kalp" icon={HeartPulse} color="from-rose-500 to-rose-700"
          active={active==="heart"} onClick={()=>setActive(active==="heart"?null:"heart")}>
          <SmallBox>Yakında...</SmallBox>
        </Card>

        <Card title="Doğum" icon={Cake} color="from-emerald-500 to-emerald-700"
          active={active==="birthday"} onClick={()=>setActive(active==="birthday"?null:"birthday")}>
          <SmallBox>Yakında...</SmallBox>
        </Card>

        <Card title="Burç" icon={Sparkles} color="from-orange-500 to-orange-700"
          active={active==="zodiac"} onClick={()=>setActive(active==="zodiac"?null:"zodiac")}>
          <SmallBox>Yakında...</SmallBox>
        </Card>

        <Card title="Gün" icon={CalendarCheck} color="from-teal-500 to-teal-700"
          active={active==="day"} onClick={()=>setActive(active==="day"?null:"day")}>
          <SmallBox>Yakında...</SmallBox>
        </Card>

      </div>
    </main>
  );
}

/* ---------- CARD ---------- */

function Card({ title, icon: Icon, color, active, onClick, children }: any) {
  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-3xl overflow-hidden cursor-pointer transition
        ${active ? "scale-105 z-50 p-3" : "h-36 hover:scale-105"}
      `}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color}`} />

      {!active && (
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <Icon size={28} />
          <p className="mt-2">{title}</p>
        </div>
      )}

      {active && (
        <div className="relative z-10 bg-black/70 rounded-2xl p-3">
          <p className="text-center text-sm mb-2 font-bold">{title}</p>

          {/* form alanı */}
          <div onClick={(e)=>e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- KÜÇÜK BOX ---------- */

function SmallBox({ children }: any) {
  return <div className="text-xs text-center">{children}</div>;
}

/* ---------- MODÜLLER (KÜÇÜK) ---------- */

function TimeModule() {
  const [h,setH]=useState(""); const [r,setR]=useState<number|null>(null);
  return (
    <div className="space-y-2">
      <input className="input text-sm p-2" placeholder="Saat" onChange={e=>setH(e.target.value)} />
      <button className="btn text-sm py-1" onClick={()=>setR(Math.round((parseFloat(h)*365)/24))}>
        Hesapla
      </button>
      {r && <p className="text-xs text-red-400">{r} gün</p>}
    </div>
  );
}

function MoneyModule() {
  const [i,setI]=useState(""); const [w,setW]=useState(""); const [l,setL]=useState(""); const [r,setR]=useState<number|null>(null);
  return (
    <div className="space-y-2">
      <input className="input text-sm p-2" placeholder="Kazanç" onChange={e=>setI(e.target.value)} />
      <input className="input text-sm p-2" placeholder="Çalışma" onChange={e=>setW(e.target.value)} />
      <input className="input text-sm p-2" placeholder="Kayıp" onChange={e=>setL(e.target.value)} />
      <button className="btn text-sm py-1" onClick={()=>setR(Math.round((parseFloat(i)/parseFloat(w))*parseFloat(l)*365))}>
        Hesapla
      </button>
      {r && <p className="text-xs text-green-400">{r} TL</p>}
    </div>
  );
}

function LifeModule() {
  const [d,setD]=useState(""); const [r,setR]=useState<number|null>(null);
  return (
    <div className="space-y-2">
      <input type="date" className="input text-sm p-2" onChange={e=>setD(e.target.value)} />
      <button className="btn text-sm py-1" onClick={()=>setR(Math.floor((Date.now()-new Date(d).getTime())/86400000))}>
        Hesapla
      </button>
      {r && <p className="text-xs">{r} gün</p>}
    </div>
  );
}

function PercentModule() {
  const [a,setA]=useState(""); const [p,setP]=useState<number|null>(null);
  return (
    <div className="space-y-2">
      <input className="input text-sm p-2" placeholder="Yaş" onChange={e=>setA(e.target.value)} />
      <button className="btn text-sm py-1" onClick={()=>setP(Math.round((parseFloat(a)/75)*100))}>
        Hesapla
      </button>
      {p && <p className="text-xs">%{p}</p>}
    </div>
  );
}

function PhoneModule() {
  const [h,setH]=useState(""); const [y,setY]=useState<number|null>(null);
  return (
    <div className="space-y-2">
      <input className="input text-sm p-2" placeholder="Saat" onChange={e=>setH(e.target.value)} />
      <button className="btn text-sm py-1" onClick={()=>setY(Math.round((parseFloat(h)*75)/24))}>
        Hesapla
      </button>
      {y && <p className="text-xs">{y} yıl</p>}
    </div>
  );
}