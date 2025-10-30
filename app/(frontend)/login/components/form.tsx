"use client";
import { Card } from "@/components/ui/card";
import { translations } from "./translations";
import { useLanguageContext } from "@/providers/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthContext";

type FormValues = {
  customerId: string;
};

export function Form() {
  const router = useRouter();
  const { language } = useLanguageContext();
  const t = translations[language];
  const { login } = useAuth();

  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setApiError(null);
    try {
      await login(data.customerId);
      router.push("/");
    } catch (err: any) {
        const code = err.response?.data?.error;
        setApiError(code ? t.errors[code as keyof typeof t.errors] : "Error en login");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-white px-4 dark:bg-black">
      <Card className="p-6 w-full max-w-md shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="font-semibold text-2xl text-center mb-4">{t.title}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid w-full gap-4">
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="customerId">CustomerID</Label>
            <Input
              id="customerId"
              placeholder={t.searchPlaceholder}
              className={`text-lg bg-card border-2 focus:border-primary w-full transition-all duration-500 ease-out`}
              {...register("customerId", { required: t.errors.CUSTOMER_REQUIRED })}
            />
            {errors.customerId && (
              <span className="text-red-600 text-sm text-start">{errors.customerId.message}</span>
            )}
          </div>

          {apiError && (
            <p className="text-red-600 text-sm text-start ">{apiError}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 transition-all duration-500 ease-out flex items-center justify-center"
          >
            {isSubmitting ? "Cargando..." : t.searchButton}
          </Button>
        </form>
      </Card>
    </div>
  );
}
