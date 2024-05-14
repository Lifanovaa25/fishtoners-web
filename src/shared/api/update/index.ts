import { attach, createEffect, createEvent, sample } from "effector";
import { client } from "../client";
import { $userProfile } from "shared/config/user";
import { DAY_UNIXTIME } from 'shared/config';
import { $initDataUnsafe, initDataUnsafeType } from "shared/config/telegram";

interface createUserProps {
    userTg: initDataUnsafeType,
    lng: string;
}

const updateUserLanguageMutation = createEffect(async ({userTg, lng}: createUserProps) => {
    try {
        const { data: user } = await client
            .from('users')
            .update({ language: lng })
            .eq('telegram_id', userTg?.id ?? 0)
            .select();
        return user?.[0];
    } catch (error) {
       throw error; 
    }
});

export const updateUserLanguageFx = attach({
    source: $initDataUnsafe,
    mapParams: (lng: string, userTg) => ({
        userTg,
        lng
    }),
    effect: updateUserLanguageMutation
});

export const choosedLanguage = createEvent<string>();

sample({
    clock: choosedLanguage,
    target: updateUserLanguageFx
})

interface updateUserGmMutationFxProps {
    telegram_id: number,
    days_points: number,
    consecutive_days_visited: number,
    last_claim: number,
}

const startPoint = 2;
const updateUserGmMutation = createEffect(async ({
    telegram_id,
    days_points, 
    consecutive_days_visited,
    last_claim
}: updateUserGmMutationFxProps) => {
    const timestampClaim = +(+new Date() / 1000).toFixed(0);
    try {
        const isMissedDay = (
            DAY_UNIXTIME * 2 < timestampClaim - (last_claim)
        ) && (last_claim) > 0;

        const points = (days_points) + ((consecutive_days_visited === 0 || isMissedDay) ? startPoint : startPoint ** (consecutive_days_visited+1) );
        const { data: user } = await client
            .from('users')
            .update({
                last_claim: timestampClaim,
                days_points: points,
                consecutive_days_visited: isMissedDay ? 0 : ++consecutive_days_visited
            })
            .eq('telegram_id', telegram_id)
            .select();

        return user?.[0];
    } catch (error) {
       throw error; 
    }
});

export const updateUserGmFx = attach({
    source: $userProfile,
    mapParams: (_, profile) => ({
        telegram_id: profile?.telegram_id ?? 0,
        days_points: profile?.days_points ?? 0,
        consecutive_days_visited: profile.consecutive_days_visited,
        last_claim: profile?.last_claim ?? 0
    }),
    effect: updateUserGmMutation
});

sample({
    clock: [updateUserLanguageFx.doneData, updateUserGmFx.doneData],
    filter: (data) => data !== null,
    target: $userProfile
});