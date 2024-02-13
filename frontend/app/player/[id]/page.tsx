"use client";

import { Team } from "@/app/types/team";
import { FormError } from "@/components/form-error";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { z } from "zod";

export const schema = z.object({
  name: z
    .string({ required_error: "Informe o nome do time" })
    .min(3, "Nome do time deve conter no mínimo 3 caracteres"),
  teamId: z.number().nullable(),
});

type FormSchema = z.infer<typeof schema>;

export default function EditPlayer({
  params: { id },
}: {
  params: { id: string };
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormSchema>({ resolver: zodResolver(schema), mode: "onBlur" });
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchPlayer = fetch(`http://localhost:3000/player/${id}`).then(
      (response) => response.json()
    );

    const fetchTeams = fetch("http://localhost:3000/team").then((response) =>
      response.json()
    );

    Promise.all([fetchPlayer, fetchTeams])
      .then(([playerData, teamsData]) => {
        reset(playerData);
        setTeams(teamsData);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        toast.error("Falha ao buscar os detalhes do jogador ou times");
      });
  }, [id, reset]);

  const onSubmit = async (data: FormSchema) => {
    if (!id) return;

    try {
      const response = await fetch(`http://localhost:3000/player/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Falha ao atualizar o time");
      }

      toast.success("Time atualizado com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("Falha ao atualizar o time");
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
          Editar jogador
        </h1>
        <div className="flex w-[350px] flex-col justify-center gap-6 border p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do jogador</Label>
              <Input
                id="name"
                type="text"
                {...register("name")}
                placeholder="Digite o nome do time"
              />
              <FormError errors={errors} fieldName="name" />
            </div>
            {teams.length === 0 ? (
              <h1>Esse jogador não tem time associado</h1>
            ) : (
              <Controller
                name="teamId"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value ? field.value.toString() : ""}
                  >
                    <SelectTrigger className="full">
                      <SelectValue placeholder="Selecione um time" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id.toString()}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            )}

            <FormError errors={errors} fieldName="teamId" />
            <div className="flex items-end w-full justify-end">
              <Button
                disabled={isSubmitting}
                className="w-[100px]"
                type="submit"
              >
                Atualizar
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
