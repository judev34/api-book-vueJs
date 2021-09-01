<template>
    <div class="alert"
        :class="alertClass"
        v-if="affiche"
    >
        <button class="close" @click="close">X</button>
        <slot></slot>
    </div>   
</template>

<script>
export default {
    name: 'Alert',
    props: {
        type: {
            type: String,
            default: "danger",
            validator(value) {
                return [
                    "success",
                    "warning",
                    "danger",
                    "info"
                ].indexOf(value) !== -1;
            }
        }
    },
    reset: {
        type: Function,
        default: () => ({}),
        validator(value) {
            return typeof value === "function";
        }
    },
    computed: {
        alertClass() {
            return "alert-" + this.type; // cela permet lors de l'initialisation du composant, de charger une classe css en fonction du type d'avertisemment passé en prop
        }
    },
    data: () => ({
        affiche: true
    }),
    methods: {
        close() {
            this.affiche = false;
            this.reset();
        }
    }
}
</script>

<style scoped>

.alert {
    position: relative;
    top: 0;
    z-index: 2;
    padding: .75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: .25rem;
}

.alert-info {
    color: #004085;
    background-color: #cce5ff;
    border-color: #b8daff;
}

.alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
}

.alert-warning {
    color: #856404;
    background-color: #fff3cd;
    border-color: #ffeeba;
}

.alert-success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c9e6cb;
}

.close {
    float: right;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    text-shadow: 0 1px 0 #fff;
    opacity: 0.5;
    background-color: transparent;
    border: 0;
}

</style>