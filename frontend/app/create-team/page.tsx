"use client";

import { FormError } from "@/components/form-error";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const schema = z.object({
  name: z
    .string({ required_error: "Informe o nome do time" })
    .min(3, "Nome do time deve conter no mínimo 3 caracteres"),
});

type FormSchema = z.infer<typeof schema>;

export default function CreateTeam() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormSchema>({ resolver: zodResolver(schema), mode: "onBlur" });

  const onSubmit = async (data: FormSchema) => {
    try {
      const response = await fetch("http://localhost:3000/team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Falha ao criar o time");
      }

      toast.success("Time criado com sucesso");
      reset();
    } catch (error) {
      toast.error("Falha ao criar o time");
    }
  };

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <div className="flex flex-1 flex-col gap-4 p-8 pt-6 items-center">
        <Link className="self-start flex items-center gap-2" href="/teams">
          <ChevronLeft className="w-4 h-4" />
          Voltar
        </Link>
        <h1 className="text-bold text-muted-foreground text-2xl">
          Inserir time
        </h1>
        <div className="flex w-[350px] flex-col justify-center gap-6 border p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do time</Label>
              <Input
                id="name"
                type="text"
                {...register("name")}
                placeholder="Digite o nome do time"
              />
              <FormError errors={errors} fieldName="name" />
            </div>
            <div className="flex items-end w-full justify-end">
              <Button
                disabled={isSubmitting}
                className="w-[100px]"
                type="submit"
              >
                Criar
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
