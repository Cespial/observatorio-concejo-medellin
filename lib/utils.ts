import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const esCoLocale = "es-CO";

export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat(esCoLocale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat(esCoLocale, {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat(esCoLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatPercent(value: number, decimals = 1): string {
  return new Intl.NumberFormat(esCoLocale, {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
}
