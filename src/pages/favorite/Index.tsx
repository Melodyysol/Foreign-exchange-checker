import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../../layouts/Header";
import { supabase } from "../../lib/supabase";
import useAuth from "../../custom-hook/UseAuth";
import LoadingFavorites from "../../components/loading/LoadingFavorites";
import { instruction, noFavoriteMessage } from "./constants";

type FavoritePair = {
  id: string;
  base_currency: string;
  target_currency: string;
  created_at: string;
};

export const Index = () => {
  const navigate = useNavigate();
  const { user, loading: loadingSupabse } = useAuth();
  const [favorites, setFavorites] = useState<FavoritePair[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("favorites")
        .select("id, base_currency, target_currency, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) {
        setFavorites(data ?? []);
      }
      setLoading(false);
    };

    loadFavorites();
  }, [user]);

  if (loadingSupabse) {
    return (
      <>
        <Header />
        <LoadingFavorites />
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="w-11/12 md:w-4/5 mx-auto py-8 md:py-12 space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">
              Favorites
            </p>
            <h1 className="text-3xl font-semibold text-white">
              Save your most-used currency pairs
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-400">
              {instruction}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn btn-outline btn-sm"
          >
            Open converter
          </button>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-8 text-center text-gray-400">
            Loading your favorite pairs...
          </div>
        ) : !user ? (
          <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-8 text-center text-gray-400">
            Sign in to start building your favorites list.
          </div>
        ) : favorites.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-700 bg-gray-950/60 p-8 text-center text-gray-400">
            {noFavoriteMessage}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {favorites.map((favorite) => (
              <div
                key={favorite.id}
                className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5 shadow-lg shadow-black/20"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.25em] text-accent">
                    Saved pair
                  </p>
                  <span className="text-xs text-gray-500">
                    {new Date(favorite.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-white">
                  {favorite.base_currency} → {favorite.target_currency}
                </h2>
                <p className="mt-2 text-sm text-gray-400">
                  Ready for a fast lookup whenever you want to compare rates
                  again.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/compare")}
                  className="btn btn-sm btn-outline mt-4"
                >
                  Compare now
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Index;
