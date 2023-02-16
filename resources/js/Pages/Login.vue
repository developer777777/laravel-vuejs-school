<template>
<div class="login-box">
    <div class="login-logo">
        <a href=""><b>HOGGO</b> M'BOURO</a>
    </div>

    <div class="card">
        <div class="card-body login-card-body">
            <p class="login-box-msg">Connecter vous pour démarrer votre session</p>
            <form @submit.prevent="soumettre">
                <div>
                    <div class="mb-4">
                        <input v-model="form.email" type="email" class="form-control" placeholder="Email" :class="{'is-invalid': form.errors.email}">
                        <span v-if="form.errors.email" class="invalid-feedback error">{{ form.errors.email }}</span>
                        <!-- <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div> -->
                    </div>
                </div>

                <div class="input-group mb-4">
                    <input v-model="form.password" type="password" class="form-control" placeholder="Password">
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <span class="fas fa-lock"></span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary btn-block">Connexion</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import { useForm } from '@inertiajs/vue3';
import { useSwalError } from '../Composables/alert';
import AuthLayout from '../layouts/AuthLayout.vue';



    export default{
        layout: AuthLayout
    }
</script>

<script setup>
import { useForm } from '@inertiajs/vue3';
import { useSwalError } from '../Composables/alert';

    const form = useForm({
        email: "",
        password: ""
    })


    const soumettre = ()=>{
        form.post(route("login"),  {

            onError: (errors) => {
                //afficher un message d'erreur
                useSwalError("Une erreur s'est produite, veuillez réessayer plus tard.")
            }
        })

    }
</script>
