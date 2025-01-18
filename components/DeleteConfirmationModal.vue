<script lang="ts" setup>
type props = {
    id: string
}

const definedProps = defineProps<props>()
const $emit = defineEmits(['confirm'])

const hideDeleteConfirmationModal = async () => {
  const modal = document.getElementById(definedProps.id) as any
  modal.close()
}
</script>

<template>
    <dialog :id="id" class="modal">
        <div class="modal-box dark:bg-dark">
            <h3 class="text-lg font-bold">
                Are you sure?
            </h3>
            <p class="py-4">
                Are you sure you want to delete this? This action cannot be undone. Please confirm to proceed.
            </p>
            <div class="flex justify-end gap-4">
                <button class="btn btn-error text-white" @click="$emit('confirm', true)">
                    Delete
                </button>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop" @click="hideDeleteConfirmationModal">
            <button class="cursor-default">
                Close
            </button>
        </form>
    </dialog>
</template>

<style></style>