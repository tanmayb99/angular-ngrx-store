export interface Record {
  id: string;
  accountHolder?: string;
  iban: string;
  amount: number;
  date: string;
  note?: string;
}
