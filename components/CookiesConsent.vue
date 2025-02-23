<script lang="ts" setup>
import { useToast } from 'vue-toastification';

const toast = useToast()
const showModal = ref(false)

onMounted(() => {
    const cookiesConsent = window.localStorage.getItem('cookies-consent')

    if (cookiesConsent == null) {
        showModal.value = true;
    }
})

const onConsent = () => {
    window.localStorage.setItem('cookies-consent', 'true')
    showModal.value = false;
}

const onReject = () => {
    toast.success('Your preferences have been saved. Essential cookies required for basic functionality will still be used.')
    
    window.localStorage.setItem('cookies-consent', 'true')
    showModal.value = false;
}
</script>
<template>
    <ClientOnly>
        <div v-if="showModal" class="fixed z-50 bottom-0 right-0 w-full sm:w-1/2 lg:w-1/3 bg-light-secondary dark:bg-secondary transition-colors duration-150 sm:mb-4 sm:mr-4 rounded-lg p-5 shadow-lg">
            <h3 class="font-bold">🍪 We Value Your Privacy</h3>
            <p class="text-sm mt-2">We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking “Accept All,” you agree to our use of cookies.</p>
            <div class="mt-4 flex gap-4">
                <button class="btn btn-primary text-white px-10" @click="onConsent">Accept All</button>
                <button class="btn btn-ghost" @click="onReject">Reject</button>
            </div>
        </div>
    </ClientOnly>
</template>
<style></style>