import { TypeImage } from '../../app/DTO/enums/typeImage';
import { IViewImage } from '../../app/DTO/views/images/IViewImage';

export const FALLBACK_VIDEO_POSTER = 'assets/img/ui/poster-a-3x4.jpg';

export interface NormalizedMedia {
  mediaUrl: string | null;
  thumbUrl?: string;
  previewUrl: string | null;
  isVideo: boolean;
}

export interface MediaCard extends NormalizedMedia {
  id: string;
  imageUrl: string | null;
  name: string;
  albumId: string;
  serviceIds?: string[];
  description?: string;
}

type RawMedia = IViewImage & Record<string, unknown>;

export function isMediaVideoType(typeImage: TypeImage | string | number | null | undefined): boolean {
  if (typeImage === TypeImage.MP4) return true;

  const value = String(typeImage ?? '').trim().toLowerCase();
  return value === 'mp4' || value === '3' || value === 'video/mp4';
}

export function getMediaThumbUrl(image: IViewImage): string | null {
  return readString(image as RawMedia, [
    'thumbUrl',
    'ThumbUrl',
    'thumbURL',
    'ThumbURL'
  ]);
}

export function normalizeImageMedia(image: IViewImage): NormalizedMedia {
  const mediaUrl = readString(image as RawMedia, ['url', 'Url', 'mediaUrl', 'MediaUrl', 'imageUrl', 'ImageUrl']);
  const thumbUrl = getMediaThumbUrl(image);
  const isVideo = isMediaVideoType(image.typeImage);

  return {
    mediaUrl,
    thumbUrl: thumbUrl || undefined,
    isVideo,
    previewUrl: isVideo ? (thumbUrl || FALLBACK_VIDEO_POSTER) : (thumbUrl || mediaUrl)
  };
}

export function toMediaCard(image: IViewImage, albumId: string): MediaCard {
  const media = normalizeImageMedia(image);

  return {
    ...media,
    id: image.id,
    imageUrl: media.mediaUrl,
    name: image.name || '',
    albumId,
    serviceIds: image.serviceIds,
    description: image.description
  };
}

function readString(source: RawMedia, keys: string[]): string | null {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return null;
}
