import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import Workspace from '../views/workspace.vue';
import AIQA from '../views/ai-qa.vue';
import TextToImage from '../views/text-to-image.vue';
import ImageEdit from '../views/image-edit.vue';
import ModelGen from '../views/model-gen.vue';
import ModelEdit from '../views/model-edit.vue';
import Preview from '../views/preview.vue';
import VideoGen from '../views/video-gen.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/workspace', component: Workspace ,
        children: [
          { path: '', component: AIQA },
          { path: '/ai-qa', component: AIQA },
          { path: '/text-to-image', component: TextToImage },
          { path: '/image-edit', component: ImageEdit },
          { path: '/model-gen', component: ModelGen },
          { path: '/model-edit', component: ModelEdit },
          { path: '/preview', component: Preview },
          { path: '/video-gen', component: VideoGen },
        ]
    },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
