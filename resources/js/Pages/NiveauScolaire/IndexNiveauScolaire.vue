<template>
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Liste des niveaux scolaires</h1>
                </div>
            </div>
        </div>
    </div>

    <div class="content">
        <div class="container-fluid">
            <div class="row">

                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-title">
                                <CreateNiveauScolaire />
                            </div>
                            <div class="card-tools">
                              <Pagination
                              :links="props.niveauScolaires.links"
                              :prev="props.niveauScolaires.prev_page_url"
                              :next="props.niveauScolaires.next_page_url"/>
                            </div>
                        </div>

                        <div class="card-body p-0">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Niveau scolaire</th>
                                        <th style="width: 100px"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="niveauScolaire in props.niveauScolaires.data" :key="niveauScolaire.id">
                                        <td>{{ niveauScolaire.nom }}</td>

                                        <td>
                                            <div class="d-flex justify-center">
                                                <button @click="openEditModal(niveauScolaire.id)" class="btn btn-info mr-2"><i class="fas fa-pen"></i></button>
                                                <button @click="deleteConfirmation(niveauScolaire.id)" class="btn btn-danger"><i class="fas fa-trash"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <EditNiveauScolaire :niveau-scolaire-id="editingElementId" :show="showModal" @modal-closed="modalClosed"/>
</template>

<script setup>
    import { ref } from '@vue/reactivity';
    import Pagination from '../../Shared/Pagination.vue';
    import CreateNiveauScolaire from './CreateNiveauScolaire.vue';
    import EditNiveauScolaire from './EditNiveauScolaire.vue';
    import { useSwalConfirm, useSwalError, useSwalSuccess } from '../../Composables/alert';
    import { router } from '@inertiajs/core';

    import { Link, usePage } from '@inertiajs/vue3';
    import { computed } from 'vue';

        const user = computed(()=>{
            return usePage().props.auth.user
        })

    const editingElementId = ref(0)
    const showModal = ref(false)

    const props = defineProps({
        niveauScolaires: Object
    })

    const modalClosed = ()=>{
        editingElementId.value = 0
        showModal.value = false
    }

    const deleteNiveauScolaire = (id)=>{
        const url = route("niveauscolaire.delete", {niveauScolaire: id})

        router.visit(url, {
            method: 'delete',
            // data: {nom},
            onSuccess: page => {
              // afficher un message de succès
                useSwalSuccess("Niveau scolaire supprimé avec succès !")
            },
            onError: errors => {
                //afficher un message d'erreur
                useSwalError(errors.message ?? "Une erreur s'est produite")
            },

        });
    }

    const deleteConfirmation = (id)=>{
        const message = "Voulez-vous supprimer cet élément ?"

        useSwalConfirm(message, ()=>{
            deleteNiveauScolaire(id)
        })
    }

    const openEditModal = (id)=>{
        editingElementId.value = id
        showModal.value = true
    }
</script>
