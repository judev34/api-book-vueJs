<template>
    <ErrorCapture :isCaptured="true" >
        <template v-slot:default="{error, reset}">
            <div>
                <Alert 
                    v-if="error"
                    :reset="reset"
                    type="danger"
                >
                    {{ error ? error.message : "" }}
                </Alert>
                <slot />    
            </div>
        </template>
    </ErrorCapture>
</template>

<script>

import ErrorCapture from "@/components/utils/ErrorCapture";
import Alert from "@/components/utils/Alert";

export default {
    name: "ErrorAlert",
    components: {
        Alert,
        ErrorCapture
    }
}
</script>