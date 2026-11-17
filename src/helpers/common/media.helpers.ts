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
   * Короткая подпись карточки; полный текст остаётся в description.
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
  // Загрузчик видео также возвращает SHA-256 (64 символа), иногда без расширения.
  const storageHash = /^[0-9a-f]{32,128}$/i;

  return uuid.test(withoutExtension) || storageHash.test(withoutExtension);
}

/** Заголовок карточки: только осмысленное имя, служебное имя файла — скрываем. */
export function getMediaTitle(name?: string | null): string | null {
  const value = (name ?? '').trim();
  return value && !isGeneratedMediaName(value) ? value : null;
}

/** Первый короткий абзац длинного описания служит заголовком при полном просмотре. */
export function getMediaText(name?: string | null, description?: string | null): {
  title: string | null; paragraphs: string[]; caption: string | null;
} {
  const paragraphs = (description ?? '').trim().split(/\r?\n\s*\r?\n/).map(p => p.trim()).filter(Boolean);
  const hasHeading = paragraphs.length > 1 && paragraphs[0].length <= 160;
  const title = hasHeading ? paragraphs[0] : getMediaTitle(name);
  const shortCaptions: Record<string, string> = {
    'Active Line: когда хочется уделить время себе': 'Уход Active Line',
    'ELYSIEN: знакомство с необычной маской': 'Маска ELYSIEN с CLEOPINE',
    'Коллагеновые пластины: уход, который хочется рассмотреть поближе': 'Массаж на коллагеновых пластинах'
  };
  return {
    title,
    paragraphs: hasHeading ? paragraphs.slice(1) : paragraphs,
    caption: (title && shortCaptions[title]) || (hasHeading ? title : paragraphs[0]) || title
  };
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
    description: image.description,
    caption: getMediaText(image.name, image.description).caption
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
