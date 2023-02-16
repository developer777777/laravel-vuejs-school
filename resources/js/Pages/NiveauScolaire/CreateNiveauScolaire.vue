<template>
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#createNVModal">
    <i class="fa fa-plus"></i>Nouveau
</button>

<div class="modal fade" id="createNVModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Ajout d'un niveau scolaire</h5>
                <button type="button" @click="closeModal" class="close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="soumettre" id="createForm">
                    <div class="form-group">
                        <label for="">Nom</label>
                        <input type="text" class="form-control" v-model="form.nom" :class="{'is-invalid': form.errors.nom }">
                        <span v-if="form.errors.nom" class="invalid-feedback error">{{ form.errors.nom }}</span>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" @click="closeModal">Fermer</button>
                <button form="createForm" type="submit" class="btn btn-success">Soumettre</button>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    // import {Inertia} from "@inertiajs/inertia";
    import Swal from 'sweetalert2';
    import {useSwalSuccess, useSwalError} from '../../Composables/alert'
    import { useForm } from '@inertiajs/vue3'


    let createModal = "";

    onMounted(()=>{
        createModal = $("#createNVModal")
    })

    const closeModal = ()=>{
        createModal.modal("hide")
        form.reset()
    }

    // partie useform

    const form = useForm({
        nom: "",
    })

    const soumettre = ()=>{
        form.post(route("niveauscolaire.store"), {
            onSuccess: (page) => {
                // afficher un message de succès
                useSwalSuccess("Niveau scolaire ajouté avec succès !")
                form.reset()
                closeModal()
            },
            onError: (errors) => {
                //afficher un message d'erreur
                useSwalError("Une erreur s'est produite")
                // if(errors.nom != null){
                //     nom.value = errors.nom
                // }
            },
        })

    }
</script>
