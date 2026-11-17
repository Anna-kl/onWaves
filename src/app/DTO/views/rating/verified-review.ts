export interface ReviewMediaView {
  id: string;
  kind: 'photo' | 'video';
  status: 'uploading' | 'processing' | 'ready' | 'rejected';
  url?: string | null;
  thumbnailUrl?: string | null;
  reason?: string | null;
  uploadToken?: string | null;
}

export interface ReviewMediaLimits {
  maxPhotos: number;
  maxVideos: number;
  maxPhotoBytes: number;
  maxVideoBytes: number;
  maxVideoSeconds: number;
}

export interface ReviewEligibility {
  canReview: boolean;
  reason?: string | null;
  existingReviewId?: string | null;
  rewardAmountKopecks?: number | null;
  rewardDays?: number | null;
  termsVersion?: string | null;
  masterName?: string | null;
  services?: string[] | null;
  mediaLimits?: ReviewMediaLimits | null;
  attendanceRequested?: boolean;
}

export interface ReviewDraft {
  rating: number;
  text: string;
  mediaIds: string[];
  acceptMediaTerms: boolean;
}

export interface OwnReview {
  id: string;
  version: number;
  rating: number;
  text?: string | null;
  media: ReviewMediaView[];
  deleted?: boolean;
  moderationReason?: string | null;
}

export interface SavedReview {
  id: string;
  version: number;
  couponId?: string | null;
  rewardAmountKopecks?: number | null;
  rewardExpiresAt?: string | null;
}

export interface PublicReview {
  id: string;
  nameAuthor: string;
  estimate: number | null;
  text?: string | null;
  dateCreated: string;
  verifiedVisit: boolean;
  rewarded: boolean;
  media: ReviewMediaView[];
  childReviews: { id: string; nameAuthor: string; text: string; dateCreated: string }[];
}

export interface PublicReviewsPage {
  items: PublicReview[];
  total: number;
}

export interface ReviewAttendance {
  canDecide: boolean;
  decision?: 'attended' | 'no_show' | null;
  requestedAt?: string | null;
}

export interface ReviewAttendanceRequest {
  recordId: string;
  requestedAt: string;
  reason?: string | null;
  decision?: string | null;
  masterName: string;
  services: string[];
}

export interface ReviewReport {
  id: string;
  reviewId: string;
  text: string;
  createdAt: string;
  reviewText: string;
  reviewEstimate: number | null;
}
