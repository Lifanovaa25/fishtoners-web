import { attach, createEffect, sample } from "effector";
import { client } from "shared/api/client";
import { $initDataUnsafe, initDataUnsafeType } from "shared/config/telegram";
import { $userProfile } from "shared/config/user";

interface getUserByIdProps {
    userTG: initDataUnsafeType
}

const getUserByIdQuery = createEffect(async ({userTG}: getUserByIdProps) => {
    try {
        const { data:user } = await client
            .from('users')
            .select()
            .eq('user_nickname', userTG?.username ?? '');

        return user?.[0];
    } catch (error) {
       throw error; 
    }
});

export const getUserByIdFx = attach({
    source: $initDataUnsafe,
    mapParams: (_, user: initDataUnsafeType) => ({
        userTG: user
    }),
    effect: getUserByIdQuery
})

sample({
    clock: getUserByIdFx.doneData,
    filter: Boolean,
    target: $userProfile
});

sample({
    clock: $initDataUnsafe,
    target: getUserByIdFx
});

interface getLeadboardQueryFxProps {
    id: number;
}

export const getLeadboardQueryFx = createEffect(async ({id}:getLeadboardQueryFxProps) => {
    try {
        const { data: leadboard } = await client
            .from('users')
            .select()
            .order('points', {
                ascending: false
            });
        const leadboardArr = leadboard ?? [];
        
        const indexUser = leadboardArr.findIndex((item: any) => item.telegram_id === id);
        if(indexUser === -1) {
            throw new Error('Not found profile')
        }

        const userIsNotInTable = indexUser > 9;

        if (userIsNotInTable) {
            const found = leadboardArr[indexUser];
            leadboardArr.splice(9, leadboardArr.length - 1);
            leadboardArr.push({found, index: indexUser});
        } else {
            leadboardArr.splice(10, leadboardArr.length - 1);
        }
          
        return (leadboard ?? []) as any[];
    } catch (error) {
       throw error; 
    }
});

export const getLeadboardProfileIdFx = attach({
    source: $initDataUnsafe,
    mapParams: (_, user: initDataUnsafeType) => ({
        id: user?.id ?? 0
    }),
    effect: getLeadboardQueryFx
})