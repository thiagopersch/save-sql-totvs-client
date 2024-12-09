'use client';

import { Button } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="grid content-center justify-items-center gap-8 h-screen bg-zinc-600 text-white">
      <p className="text-4xl font-bold">Não encontrada</p>
      <p className="text-sm">Desculpe, essa pagina não foi encontrada 🥺</p>
      <Link href="/">
        <Button variant="text" color="primary" className="font-bold">
          Página inicial
        </Button>
      </Link>
    </div>
  );
}
