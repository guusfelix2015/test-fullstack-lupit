"use client";

import { FormError } from "@/components/form-error";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import { ChevronLeft, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Team } from "../types/team";
import { useEffect, useState } from "react";

const getTeams = async (): Promise<Team[]> => {
  const response = await fetch("http://localhost:3000/team");
  if (!response.ok) {
    throw new Error("Falha ao buscar times");
  }
  return await response.json();
};



export const schema = z.object({
  name: z
    .string({ required_error: "Informe o nome do jogador" })
    .min(3, "O nome do jogador deve conter no mínimo 3 caracteres"),
  teamId: z
    .number({ required_error: "Selecione um time" })
    .transform((val) => Number(val)),
  age: z.coerce.number(),
});

type FormSchema = z.infer<typeof schema>;

export default function CreatePlayer() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    getTeams().then(setTeams).catch(console.error);
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormSchema>({ resolver: zodResolver(schema), mode: "onBlur" });

  const onSubmit = async (data: FormSchema) => {
    console.log("Data before processing:", data);
    const processedData = {
      ...data,
      age: Number(data.age),
      teamId: Number(data.teamId),
    };
    console.log("Processed data:", processedData);

    try {
      const response = await fetch("http://localhost:3000/player", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processedData),
      });

      if (!response.ok) {
        throw new Error("Falha ao criar o jogador");
      }

      toast.success("Jogador criado com sucesso");
      reset();
    } catch (error) {
      toast.error("Falha ao criar o jogador");
    }
  };

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <div className="flex flex-1 flex-col gap-4 p-8 pt-6 items-center">
        <Link className="self-start flex items-center gap-2" href="/">
          <ChevronLeft className="w-4 h-4" />
          Voltar
        </Link>
        <h1 className="text-bold text-muted-foreground text-2xl">
          Inserir jogador
        </h1>
        {teams.length === 0 ? (
          <>
            <h1>Nenhum time criado, crie um time para associar um jogador</h1>
            <Button asChild className="flex gap-2">
              <Link href="/create-team">
                <Plus className="w-4 h-4" />
                Adicionar time
              </Link>
            </Button>
          </>
        ) : (
          <div className="flex w-[350px] flex-col justify-center gap-6 border p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do jogador</Label>
                <Input
                  id="name"
                  type="text"
                  {...register("name")}
                  placeholder="Digite o nome do jogador"
                />
                <FormError errors={errors} fieldName="name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Idade do jogador</Label>
                <Input
                  id="age"
                  type="number"
                  {...register("age")}
                  placeholder="Digite a idade do jogador"
                />
                <FormError errors={errors} fieldName="age" />
              </div>
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

              <FormError errors={errors} fieldName="teamId" />
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
        )}
      </div>
      <Toaster />
    </div>
  );
}
