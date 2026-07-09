import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../../layouts/Header";
import { supabase } from "../../lib/supabase";
import useAuth from "../../custom-hook/UseAuth";
import { tabs } from "../../utilities/tabs";

type ConversionLog = {
  id: string;
  amount: number;
  converted_amount: number;
  base_currency: string;
  target_currency: string;
  exchange_rate: number;
  created_at: string;
};

export const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [logs, setLogs] = useState<ConversionLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tabs.map((tab) => tab.tab === "log" && (tab.num = logs.length));
  }, [logs]);

  useEffect(() => {
    const loadLogs = async () => {
      if (!user) {
        setLogs([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("conversion_logs")
        .select(
          "id, amount, converted_amount, base_currency, target_currency, exchange_rate, created_at",
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) {
        setLogs(data ?? []);
      }
      setLoading(false);
    };

    loadLogs();
  }, [user]);

  return (
    <>
      <Header />
      <section className="w-11/12 md:w-4/5 mx-auto py-8 md:py-12 space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">
              Conversion log
            </p>
            <h1 className="text-3xl font-semibold text-white">
              Review every conversion you saved
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-400">
              Track your recent activity, compare exchanged values, and keep a
              running history of your currency decisions.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn btn-outline btn-sm"
          >
            Back to converter
          </button>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-8 text-center text-gray-400">
            Loading your conversion history...
          </div>
        ) : !user ? (
          <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-8 text-center text-gray-400">
            Sign in to view your saved conversion logs.
          </div>
        ) : logs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-700 bg-gray-950/60 p-8 text-center text-gray-400">
            No conversions have been logged yet. Use the converter to create
            your first entry.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/80">
            <div className="grid grid-cols-[1.2fr_1fr_1fr_0.8fr] border-b border-gray-800 px-4 py-3 text-xs uppercase tracking-[0.25em] text-gray-500">
              <span>Pair</span>
              <span>Amount</span>
              <span>Rate</span>
              <span>Date</span>
            </div>
            {logs.map((log) => (
              <div
                key={log.id}
                className="grid grid-cols-[1.2fr_1fr_1fr_0.8fr] border-b border-gray-800 px-4 py-4 text-sm text-gray-300 last:border-b-0"
              >
                <div>
                  <p className="font-semibold text-white">
                    {log.base_currency} → {log.target_currency}
                  </p>
                  <p className="text-xs text-gray-500">
                    {log.converted_amount.toFixed(2)} {log.target_currency}
                  </p>
                </div>
                <div>{log.amount}</div>
                <div>{log.exchange_rate.toFixed(4)}</div>
                <div>{new Date(log.created_at).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Index;
