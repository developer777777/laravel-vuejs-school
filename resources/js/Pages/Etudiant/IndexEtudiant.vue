<template>
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Listes des étudiants</h1>
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
                                <div class="row">
                                    <div class="col-sm-7">
                                        <Link :href="route('etudiant.create')" class="btn btn-primary mb-2">
                                            <i class="fa fa-plus"></i>Nouveau
                                        </Link>
                                    </div>
                                    <div class="col-sm-5">
                                        <select @change="search" v-model="per_page" class="form-control">
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div class="card-tools">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <input @keyup="search"
                                        type="text"
                                        v-model="searchEtudiant"
                                        class="form-control"/>
                                    </div>
                                    <div class="col-sm">

                                        <select @change="search"
                                            v-model="filtreNiveauScolaire"
                                            class="form-control">
                                            <option value=""></option>
                                            <option
                                                :value="niveauScolaire.id"
                                                v-for="niveauScolaire in props.niveauScolaires"
                                                :key="niveauScolaire.id">
                                                {{ niveauScolaire.nom }}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="card-body p-0">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>
                                            Etudiant
                                        </th>
                                        <th>
                                            Niveau scolaire
                                        </th>
                                        <th style="width: 100px">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="etudiant in props.etudiants.data"
                                        :key="etudiant.id"
                                    >
                                        <td>
                                            <img :src="showPic(etudiant)" alt="" style="width: 45px; height: 45px; border-radius: 25px;">
                                        </td>
                                        <td>
                                            {{ etudiant.prenom }}
                                            {{ etudiant.nom }}
                                        </td>
                                        <td>
                                            {{ etudiant.niveau_scolaire.nom }}
                                        </td>

                                        <td>
                                            <div class="d-flex justify-center">
                                                <Link :href="route('etudiant.edit', {etudiant: etudiant.id})"
                                                    class="btn btn-info mr-2"
                                                >
                                                    <i class="fas fa-pen"></i>
                                                </Link>
                                                <button class="btn btn-danger" @click="deleteConfirmation(etudiant)">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Pagination
                                :links="props.etudiants.links"
                                :prev="props.etudiants.prev_page_url"
                                :next="props.etudiants.next_page_url"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { router } from "@inertiajs/core";
import { ref } from "vue";
import { useSwalConfirm, useSwalError, useSwalSuccess } from "../../Composables/alert";
import Pagination from "../../Shared/Pagination.vue";

import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

    const user = computed(()=>{
        return usePage().props.auth.user
    })

const props = defineProps({
    etudiants: Object,
    niveauScolaires: Array,
    filtres: Object
});

const searchEtudiant = ref(props.filtres.search ?? "");
const filtreNiveauScolaire = ref(props.filtres.filter ?? "");
const per_page = ref(props.filtres.per_page ?? 5);

const showPic = (etudiant)=>{
    if(etudiant.photo){
        return 'storage/'+etudiant.photo
    }

    return etudiant.sexe == "M" ? "images/man.png" : "images/woman.png"
}


const deleteEtudiant = (id)=>{
        const url = route("etudiant.delete", {etudiant: id})

        router.visit(url, {
            method: 'delete',
            // data: {nom},
            onSuccess: page => {
              // afficher un message de succès
                useSwalSuccess("Etudiant supprimé avec succès !")
            },
            onError: errors => {
                //afficher un message d'erreur
                useSwalError(errors.message ?? "Une erreur s'est produite")
            },

        });
    }

    const deleteConfirmation = (etudiant)=>{
        const message = `Voulez-vous supprimer l'étudiant "${etudiant.prenom} ${etudiant.nom}" ?`

        useSwalConfirm(message, ()=>{
            deleteEtudiant(etudiant.id)
        })
    }

const search = _.throttle(function(){

    const url = route("etudiant.index", {search: searchEtudiant.value, filter: filtreNiveauScolaire.value, per_page: per_page.value})

    router.visit(url, {
            method: 'get',
            data: {},
            replace: true,
            preserveState: true,

        });
}, 500)
</script>
