<script lang="ts" setup>
import type { IBaseUser } from '../types/user/IBaseUser';
import type { IUser } from '../types/user/IUser';

type props = {
    user: IBaseUser | IUser,
    showAvatar?: boolean,
    avatarSize?: number
}

withDefaults(defineProps<props>(), {
    showAvatar: true,
    avatarSize: 48
})

</script>
<template>
    <div>
        <NuxtLink class="flex gap-4 text-left items-center"
            target="_blank" :to="`https://x.com/${user.handle}`">
            <div v-if="showAvatar">
                <img v-if="user.avatar" class="rounded-lg" :width="avatarSize" :src="user.avatar" alt="">
                <Avatar v-else class="rounded-lg" :size="avatarSize" :square="true" variant="bauhaus" :name="user.handle"
                    :colors="['#FFFFFF', '#212121', '#52CA72']" />
            </div>
            <div>
                <div class="font-semibold text-sm">
                    @{{ user.handle }}
                </div>
                <div class="text-xs opacity-75">
                    <slot />
                </div>
            </div>
        </NuxtLink>
    </div>
</template>

<style></style>