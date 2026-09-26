import { UserType } from "src/app/DTO/classes/profiles/profile-user.model";
import { environment } from "src/enviroments/environment";

/** Плейсхолдер, когда у профиля нет аватара. */
export const PLACEHOLDER_AVATAR = '/assets/img/onwaves/user.png';

/** База API без хвоста /v1/api (avatarUrl с бэка уже содержит /v1/api/...). */
function apiBase(): string {
  return environment.Uri.replace(/\/v1\/api\/?$/i, '');
}

/**
 * Полный src аватара (бэк 2026-07-18: `avatar` base64 больше не приходит, вместо него —
 * относительный `avatarUrl` вида `/v1/api/Profiles/{id}/avatar-image`).
 * Универсально и обратносовместимо:
 * - null/undefined/'' → плейсхолдер;
 * - `data:` или абсолютный http(s)/protocol-relative URL → как есть;
 * - относительный путь (начинается с `/`) → приклеиваем базу API;
 * - иначе трактуем как legacy base64 (эндпоинты вне списка миграции могут ещё его слать).
 */
export function resolveAvatarUrl(value: string | null | undefined): string {
  if (!value) return PLACEHOLDER_AVATAR;
  if (value.startsWith('data:') || /^(https?:)?\/\//i.test(value)) return value;
  if (value.startsWith('/')) return `${apiBase()}${value}`;
  return `data:image/jpeg;base64,${value}`;
}

export function getIconAvatar(type: UserType, active: boolean ){
    switch(type){
        case UserType.Business: {
            if (active){
            return '/assets/img/ui/sac-avatar-action.svg';
            } else {
                return '/assets/img/ui/sac-avatar-no-action.svg';
            }
        }
        case UserType.User: {
            if(active){
                return "/assets/img/ui/persone-avatar-active.svg";
            } else {
                return "/assets/img/ui/persone-avatar-no-active.svg";
            }
        }
    default: {
        return "/assets/img/ui/persone-avatar-no-active.svg";
    }
    }
}