"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Player } from "./types/player";
import { toast, Toaster } from "sonner";
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
import { Pencil, Plus, Trash2, UserRoundX } from "lucide-react";
import Link from "next/link";
import { LoadingIndicator } from "@/components/loading-indicator";

const getPlayers = async (): Promise<Player[]> => {
  const response = await fetch("http://localhost:3000/player");
  if (!response.ok) {
    toast.error("Falha ao buscar jogadores");
  }
  return await response.json();
};

const handleDeletePlayer = async (id: number) => {
  const response = await fetch(`http://localhost:3000/player/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    toast.error("Falha ao deletar jogador");
  }
  toast.success("Jogador deletado com sucesso");
};

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    getPlayers().then(setPlayers).catch(console.error);
  }, []);

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <div className="flex justify-between items-center">
          <h1 className="text-bold text-muted-foreground text-2xl">
            Jogadores
          </h1>
          <Button asChild className="flex gap-2">
            <Link href="/create-player">
              <Plus className="w-4 h-4" />
              Adicionar jogador
            </Link>
          </Button>
        </div>
        {players.length === 0 ? (
          <div className="flex items-center justify-center">
            <LoadingIndicator className="w-10 h-10" />
          </div>
        ) : (
          <Table className="border">
            <TableCaption>Lista de Jogadores</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow key={player.id}>
                  <TableCell>{player.id}</TableCell>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.team.name}</TableCell>
                  <div className="flex">
                    <Button asChild variant="ghost">
                      <Link href={`/player/${player.id}`} passHref>
                        <Pencil className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Tem certeza que deseja deletar este jogador?"
                          )
                        ) {
                          handleDeletePlayer(player.id).then(() => {
                            setPlayers((currentPlayer) =>
                              currentPlayer.filter((p) => p.id !== player.id)
                            );
                          });
                        }
                      }}
                      variant="ghost"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <Toaster />
    </div>
  );
}
