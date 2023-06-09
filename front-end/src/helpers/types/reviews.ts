export interface ReviewItem {
  id: string;
  userName: string;
  date: string;
  comment: string;
  rating: number;
  email?: string;
  phone?: string;
  isSavedUsername?: boolean;
}
export type ReviewList = ReviewItem[];
