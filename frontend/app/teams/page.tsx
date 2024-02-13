"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/header";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Team } from "../types/team";
import Link from "next/link";
import { toast, Toaster } from "sonner";

const getTeams = async (): Promise<Team[]> => {
  const response = await fetch("http://localhost:3000/team");
  if (!response.ok) {
    throw new Error("Falha ao buscar times");
  }
  return await response.json();
};

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);

  const handleDeleteTeam = async (id: number) => {
    const isConfirmed = window.confirm(
      "Você realmente deseja deletar este time?"
    );
    if (!isConfirmed) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/team/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Falha ao deletar time");
      }

      toast.success("Time deletado com sucesso");
      setTeams((currentTeams) => currentTeams.filter((team) => team.id !== id));
    } catch (error) {
      toast.error("Esse time tem jogadores associados e não pode ser deletado");
    }
  };

  useEffect(() => {
    getTeams().then(setTeams).catch(console.error);
  }, []);

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <div className="flex justify-between items-center">
          <h1 className="text-bold text-muted-foreground text-2xl">Time</h1>
          <Button asChild className="flex gap-2">
            <Link href="/create-team">
              <Plus className="w-4 h-4" />
              Adicionar Time
            </Link>
          </Button>
        </div>
        <Table className="border">
          <TableCaption>Lista de times</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell>{team.id}</TableCell>
                <TableCell>{team.name}</TableCell>
                <TableCell>
                  <div className="flex gap-4 justify-end">
                    <Button variant="ghost">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteTeam(team.id)}
                      variant="ghost"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Toaster />
    </div>
  );
}
