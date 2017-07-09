<template lang="pug">
    a(:href="link").mail
        span.email
            i.icon-mail-alter
        span(title="Send me email", v-text="email").email.centered-scale-element
</template>

<script>
    import model from "../models"
    export default {
        data() {
            // Alphabet for email encoder
            const a = 'na';
            const email = `${a.charAt(1)+a.charAt(0)+a.charAt(0)+a.charAt(1)}@${model.state.www}`;
            const link = `mailto:${email}`;
            return {
                email,
                link
            }
        }
    }
</script>