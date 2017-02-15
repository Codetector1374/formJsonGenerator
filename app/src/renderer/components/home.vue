<template>
    <div class="vert-parent">
        <div class="align-vertical">
            <div class="row">
                <div class="col-xs-12 col-sm-6">
                    <a style="cursor:pointer; color: #000;">
                        <div class="panel panel-default">
                            <div class="panel-body text-center">
                                <i class="fa fa-file-text-o fa-icon" aria-label="hidden"></i>
                                <h1>Edit a Form</h1>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-xs-12 col-sm-6">
                    <router-link :to="{name: 'editConfig'}" style="cursor:pointer; color: #000;">
                        <div class="panel panel-default">
                            <div class="panel-body text-center">
                                <i class="fa fa-gear fa-icon" aria-label="hidden"></i>
                                <h1>Edit a Config</h1>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home'
    }
</script>

<style scoped>
    .option-button {
        min-height: 500px;
    }
    .vert-parent {
        -webkit-transform-style: preserve-3d;
        -moz-transform-style: preserve-3d;
        transform-style: preserve-3d;
        height: 100vh;
        width: 100vw;
        padding: 50px;
    }
    .align-vertical {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
    @media screen and (max-width: 300px){
        .fa-icon{
            font-size: 7em;
        }
    }
    @media screen and (max-width: 768px) and (min-width: 300px){
        .fa-icon{
            font-size: 10em;
        }
    }
    @media screen and (min-width: 768px) {
        .fa-icon {
            font-size: 5em;
        }
    }
</style>
