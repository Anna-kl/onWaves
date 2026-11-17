import { getMediaText, toMediaCard } from './media.helpers';
import { IViewImage } from '../../app/DTO/views/images/IViewImage';

describe('Gallery text presentation', () => {
  it('keeps every approved paragraph while using a short caption and a separate heading', () => {
    const heading = 'Active Line: когда хочется уделить время себе';
    const text = getMediaText('8953ad55-9402-4ee9-b765-4a769853f5f1.webp', `${heading}\r\n\r\nПервый абзац.\r\n\r\nВторой абзац с составом и контактом.`);
    expect(text.caption).toBe('Уход Active Line');
    expect(text.title).toBe(heading);
    expect(text.paragraphs).toEqual(['Первый абзац.', 'Второй абзац с составом и контактом.']);
  });

  it('preserves ordinary short captions without inventing a filename heading', () => {
    expect(getMediaText('8953ad55-9402-4ee9-b765-4a769853f5f1.webp', 'Средства SKINDEX.')).toEqual({
      title: null, paragraphs: ['Средства SKINDEX.'], caption: 'Средства SKINDEX.'
    });
    expect(getMediaText('Моя работа', '').title).toBe('Моя работа');
    expect(getMediaText(undefined, undefined).paragraphs).toEqual([]);
  });

  it('hides long storage hashes from video titles and captions without hiding human names', () => {
    const filename = '3801c36a9a1a638a6e4ce6383ae7b489b14bdb5385efbd098f575fe8b2e63a0.mp4';
    expect(getMediaText(filename, 'Ресницы крупным планом.')).toEqual({
      title: null, paragraphs: ['Ресницы крупным планом.'], caption: 'Ресницы крупным планом.'
    });
    expect(getMediaText(filename, '').caption).toBeNull();
    expect(getMediaText('Брови после процедуры.mp4', '').title).toBe('Брови после процедуры.mp4');
  });

  it('uses the requested captions for ELYSIEN and collagen and retains source data', () => {
    const cases = [
      ['ELYSIEN: знакомство с необычной маской', 'Маска ELYSIEN с CLEOPINE'],
      ['Коллагеновые пластины: уход, который хочется рассмотреть поближе', 'Массаж на коллагеновых пластинах']
    ];
    for (const [heading, caption] of cases) {
      const description = `${heading}\n\nПолный текст.`;
      const card = toMediaCard({id: 'image', name: '8953ad55-9402-4ee9-b765-4a769853f5f1.webp', description, url: '/photo.webp'} as IViewImage, 'album');
      expect(card.caption).toBe(caption);
      expect(card.description).toBe(description);
    }
  });
});
