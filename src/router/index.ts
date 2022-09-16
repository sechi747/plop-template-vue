import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

interface RouteModule {
    default: RouteRecordRaw[]
}

const getModuleRoutes = () => {
    const files = import.meta.glob<RouteModule>('/src/modules/**/route.ts',{ eager: true })
    let routes: Array<RouteRecordRaw> = [];

    for (const path in files) {
        routes = routes.concat(files[path].default);
    }
    return routes;
};

const routes = [
    ...getModuleRoutes(),
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
