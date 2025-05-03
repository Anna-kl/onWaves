import { UserType } from "src/app/DTO/classes/profiles/profile-user.model";

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