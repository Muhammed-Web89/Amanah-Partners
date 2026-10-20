import { notFound } from 'next/navigation';

// Dil önekli ama tanımsız her adres yerelleştirilmiş 404 sayfasına düşer.
export default function CatchAll() {
  notFound();
}
