import React from 'react';
import { Badge, BadgeText } from "@/components/ui/badge";
import { Order } from '@/types/order';

// 1. Mapeamento dos estilos com base no status
const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  'Em separacao': {
    bg: 'bg-amber-100',
    text: 'text-amber-600',
  },
  Aprovado: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-600',
  },
  Entregue: {
    bg: 'bg-green-100',
    text: 'text-green-600',
  },
  Cancelado: {
    bg: 'bg-red-100',
    text: 'text-red-500',
  },
  Faturado: {
    bg: 'bg-blue-100',
    text: 'text-blue-500',
  },
};

export function StatusBadge({ status, order }: { status: string, order: Order }) {

  const currentStyle = STATUS_STYLES[status] || {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
  };

  return (
    <Badge
      variant="outline"
      className={`${currentStyle.bg} border-0 ml-1 rounded-xl px-2.5 py-1`}
    >
      <BadgeText className={`${currentStyle.text} font-semibold text-xs`}>
        {
            status == 'Faturado' ? status + ' - NF ' + order.nf : status
        }
      </BadgeText>
    </Badge>
  );
}