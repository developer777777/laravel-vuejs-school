<template>
<div class="modal fade" id="EditModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Edition du niveau scolaire "{{ form.nom }}"</h5>
                <button type="button" class="close" @click="closeModal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="seditForm" @submit.prevent="soumettre">
                    <div class="form-group">
                        <label for="">Nom</label>
                        <input type="text" class="form-control" v-model="form.nom"
                        :class="{'is-invalid': form.errors.nom}">
                        <span v-if="form.errors.nom" class="invalid-feedback error">{{ form.errors.nom }}</span>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="closeModal">Fermer</button>
                <button form="seditForm" type="submit" class="btn btn-success">Soumettre</button>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { router, useForm } from '@inertiajs/vue3'
import { onMounted, reactive, watch } from 'vue';
import { useSwalSuccess, useSwalError } from '../../Composables/alert';

    const emit = defineEmits(["modalClosed"])
    let updateModal = "";
    onMounted(()=>{
        updateModal = $("#EditModal")
    })

    const openModal = ()=>{
        getNiveauScolaireById()
        updateModal.modal("show")
    }

    const closeModal = ()=>{
        updateModal.modal("hide")
        emit("modalClosed")
    }

    const props = defineProps({
        niveauScolaireId:{
            type: Number,
            required: true
        },
        show:{
            type: Boolean,
            default: false
        }
    })

    // partie form


    const form = useForm({
        id: "",
        nom: "",
    })

    const soumettre = ()=>{
        form.put(route("niveauscolaire.update", {niveauScolaire: props.niveauScolaireId}), {
            onSuccess: (page) => {
                // afficher un message de succès
                useSwalSuccess("Niveau scolaire mise à jour avec succès !")
                closeModal()
            },
            onError: (errors) => {
                //afficher un message d'erreur
                useSwalError("Une erreur s'est produite")
            },
        })

    }
    // end partie form

    const getNiveauScolaireById = ()=>{
        axios.get(route('niveauscolaire.edit', {niveauScolaire: props.niveauScolaireId}))
            .then((response)=>{
                form.id = response.data.niveauScolaire.id
                form.nom = response.data.niveauScolaire.nom
            }).catch((error)=>{
                console.log(error);
            })
    }

    watch(
        ()=>props.show,
        (newVal, oldVal)=>{
            if(newVal){
                openModal()
            }else{
                closeModal()
            }
        }
    )
</script>
