<template>
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0"></h1>
                </div>

            </div>
        </div>
    </div>

    <div class="content">
        <div class="container-fluid">
            <div class="jumbotron">
                <h1 class="display-4">Bonjour, {{ user.name }}</h1>
                <p class="lead">
                    Bienvenu sur notre application de gestion scolaire
                </p>
                <hr class="my-4" />
                <p class="lead">
                    Made with Thierno Oumar DIALLO
                </p>
                <p class="lead">
                    <a href="" class="btn btn-primary btn-lg">Me contactez</a>
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

    const user = computed(()=>{
        return usePage().props.auth.user
    })
</script>
