
export interface PendingBet {
  id: string;
  name: string;
  date: string;
  time?: string;
  weight: string;
  height: string;
  eyeColor?: string;
  hairColor?: string;
  gender?: string;
  hopeMom?: string;
  hopeDad?: string;
  resemblance?: string;
  advice?: string;
  status: string;
  created_at: string;
  isLost?: boolean;
}
