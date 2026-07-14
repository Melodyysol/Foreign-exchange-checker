import { useEffect, useState } from "react";

import { Header } from "../../layouts/Header";
import useAuth from "../../custom-hook/UseAuth";
import { currencies } from "../../utilities/currency";

import defaultUserLogo from "../../assets/icons/default-user-logo.jpeg";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LoadingPage } from "../../components/loading/Index";
import { handleImageUpload } from "./uploadImage";

const Settings = () => {
  const { user, updateProfile, profile, signOut, loading } = useAuth();

  const [username, setUsername] = useState("");
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUsername(profile.username || "");
      setBaseCurrency(profile.default_base_currency || "USD");
      setTargetCurrency(profile.default_target_currency || "EUR");
      return;
    }

    if (user) {
      const fallbackName =
        user.user_metadata?.name || user.email?.split("@")[0] || "Traveler";
      setUsername(fallbackName);
    }
  }, [profile, user]);

  if (loading) {
    return <LoadingPage />;
  }

  const handleProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (user) {
      handleImageUpload(file, user.id);

      await updateProfile({
        username: username || user.user_metadata?.name || user.email || "",
      });
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    setIsSaving(true);
    const { success, error } = await updateProfile({
      username,
      default_base_currency: baseCurrency,
      default_target_currency: targetCurrency,
    });
    if (!success) {
      toast.error(`Error updating profile: ${error}`);
      return;
    }
    setIsSaving(false);
    toast.success("Data saved successfully");
  };

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en", {
        month: "long",
        year: "numeric",
      })
    : "recently";

  return (
    <>
      <Header />
      <main className="px-4 py-6 md:px-8 lg:px-12">
        <section className="mx-auto flex max-w-6xl flex-col gap-6">
          <div className="rounded-3xl border border-base-300 bg-base-200/80 p-6 shadow-xl shadow-black/10 backdrop-blur md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={profile?.avatar_url || defaultUserLogo}
                    alt="Profile"
                    className="h-24 w-24 rounded-full border-4 border-accent object-cover md:h-28 md:w-28"
                  />
                  <label className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/45 text-xs font-semibold text-white opacity-0 transition hover:opacity-100">
                    <span>Change</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImage}
                      className="absolute inset-0 opacity-0"
                    />
                  </label>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
                    Profile Settings
                  </p>
                  <h1 className="text-2xl font-semibold text-base-content">
                    {profile?.username || username || "Your profile"}
                  </h1>
                  <p className="text-sm text-base-content/70">{user?.email}</p>
                  {user && (
                    <p className="mt-1 text-sm text-base-content/60">
                      Member since {memberSince}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (user) {
                    signOut();
                  }
                  navigate("/login");
                }}
                className="btn btn-outline btn-sm rounded-full capitalize"
              >
                {user ? "Sign out" : "Sign in/Sign up"}
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <form
              onSubmit={handleSave}
              className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-lg shadow-black/10"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-base-content">
                    Personal details
                  </h2>
                  <p className="text-sm text-base-content/70">
                    Update how your account appears and which currencies you use
                    most.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="form-control w-full">
                  <span className="label-text mb-2 text-sm font-medium">
                    Display name
                  </span>
                  <input
                    type="text"
                    disabled={user ? false : true}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Enter your name"
                  />
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="form-control w-full">
                    <span className="label-text mb-2 text-sm font-medium">
                      Default send currency
                    </span>
                    <select
                      value={baseCurrency}
                      onChange={(e) => setBaseCurrency(e.target.value)}
                      className="select select-bordered w-full"
                    >
                      {currencies.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                          {currency.code} — {currency.country}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="form-control w-full">
                    <span className="label-text mb-2 text-sm font-medium">
                      Default receive currency
                    </span>
                    <select
                      value={targetCurrency}
                      onChange={(e) => setTargetCurrency(e.target.value)}
                      className="select select-bordered w-full"
                    >
                      {currencies.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                          {currency.code} — {currency.country}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="btn btn-accent"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (profile) {
                      setUsername(profile.username || "");
                      setBaseCurrency(profile.default_base_currency || "USD");
                      setTargetCurrency(
                        profile.default_target_currency || "EUR",
                      );
                    }
                  }}
                  className="btn btn-ghost"
                >
                  Reset
                </button>
              </div>
            </form>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-base-300 bg-base-200/70 p-6 shadow-lg shadow-black/10">
                <h3 className="text-lg font-semibold text-base-content">
                  Quick info
                </h3>
                <div className="mt-4 space-y-3 text-sm text-base-content/80">
                  <div className="flex items-center justify-between rounded-xl bg-base-100/80 px-3 py-2">
                    <span>Preferred send</span>
                    <span className="font-semibold">{baseCurrency}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-base-100/80 px-3 py-2">
                    <span>Preferred receive</span>
                    <span className="font-semibold">{targetCurrency}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-base-100/80 px-3 py-2">
                    <span>Account</span>
                    <span className="font-semibold">Active</span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-dashed border-accent/40 bg-accent/10 p-6">
                <h3 className="text-lg font-semibold text-base-content">Tip</h3>
                <p className="mt-2 text-sm text-base-content/80">
                  Saving your preferred currencies makes future conversions
                  faster and more personal.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
};

export default Settings;
