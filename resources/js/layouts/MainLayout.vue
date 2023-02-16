<template>
    <div class="wrapper">
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#" role="button">
                        <i class="fas fa-bars"></i>
                    </a>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <Link href="/logout" method="post" as="button" type="button" class="btn btn-link">Déconnexion</Link>
                </li>
            </ul>

        </nav>

        <Menu />

        <div class="content-wrapper">
           <slot />
        </div>
        <Footer />
    </div>
</template>
<script setup>
import Footer from './partials/footer.vue';
import Menu from './partials/Menu.vue';
</script>
