import { TypeImage } from '../../app/DTO/enums/typeImage';
import { IViewImage } from '../../app/DTO/views/images/IViewImage';

export const FALLBACK_VIDEO_POSTER = '/assets/img/jpg/poster-a-3x4.webp';

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
  /**
   * Готовая подпись карточки: описание, иначе осмысленное имя, иначе null.
   * Служебное имя файла сюда не попадает — считается по getMediaTitle().
   */
  caption: string | null;
}

type RawMedia = IViewImage & Record<string, unknown>;

export function isMediaVideoType(typeImage: TypeImage | string | number | null | undefined): boolean {
  if (typeImage === TypeImage.MP4) return true;

  const value = String(typeImage ?? '').trim().toLowerCase();
  return value === 'mp4' || value === '3' || value === 'video/mp4';
}

/**
 * Имя файла, сгенерированное системой при загрузке, а не введённое человеком.
 * Такое имя нельзя показывать пользователю как заголовок карточки.
 *
 * Раньше проверка жила двумя копиями (галерея и card-detail-modal) и сверялась со
 * СПИСКОМ расширений: png|jpg|jpeg|gif|mp4|webm. Как только загрузка стала отдавать
 * .webp, имя перестало распознаваться, и в заголовке карточки появлялось
 * «d395f908-ff14-42c2-bd5c-95b0b0a547b5.webp».
 *
 * Поэтому расширение здесь не перечисляем, а просто отбрасываем: проверяем, что
 * осталось от имени. Работает для любого будущего формата — avif, heic, mov.
 */
export function isGeneratedMediaName(name?: string | null): boolean {
  const value = (name ?? '').trim();
  if (!value) return false;

  // Отбрасываем последнее расширение: "uuid.webp" → "uuid".
  const withoutExtension = value.replace(/\.[a-z0-9]{1,8}$/i, '');

  // UUID как с дефисами, так и без них (некоторые загрузчики отдают "хвост" без них).
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const uuidPlain = /^[0-9a-f]{32}$/i;

  return uuid.test(withoutExtension) || uuidPlain.test(withoutExtension);
}

/** Заголовок карточки: только осмысленное имя, служебное имя файла — скрываем. */
export function getMediaTitle(name?: string | null): string | null {
  const value = (name ?? '').trim();
  return value && !isGeneratedMediaName(value) ? value : null;
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
  const description = (image.description ?? '').trim();

  return {
    ...media,
    id: image.id,
    imageUrl: media.mediaUrl,
    name: image.name || '',
    albumId,
    serviceIds: image.serviceIds,
    description: image.description,
    caption: description || getMediaTitle(image.name)
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
