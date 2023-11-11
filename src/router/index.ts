import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import Copyright from '@/views/Copyright.vue';
import Logger from '@/views/Logger.vue';
import SingleController from '@/views/single/Controller.vue';
import SingleProfile from '@/views/single/Profile.vue';
import SingleSearch from '@/views/single/Search.vue';
import Battery from '@/views/battery/Battery.vue';
import BatteryControls from '@/views/battery/BatteryControls.vue';
import EVChargerDischarger from '@/views/evchargerdischarger/EVChargerDischarger.vue';
import EVChargerDischargerControls from '@/views/evchargerdischarger/EVChargerDischargerControls.vue';
import Settings from '@/views/settings/Main.vue';
import SettingsMenu from '@/views/settings/Menu.vue';
import SettingsDetails from '@/views/settings/Details.vue';
import Help from '@/views/help/Main.vue';
import HelpMenu from '@/views/help/Menu.vue';

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    components: {
      main: Home,
      footer: Copyright
    },
    meta: {
      feature: 'home'
    }
  },
  {
    name: 'single',
    path: '/single',
    components: {
      main: SingleController,
      footer: Logger,
      drawer: SingleProfile
    },
    meta: {
      feature: 'single'
    }
  },
  {
    name: 'single.search',
    path: '/single/search',
    components: {
      main: SingleSearch,
      footer: Logger
    },
    meta: {
      feature: 'single-search'
    }
  },
  {
    name: 'battery',
    path: '/battery',
    components: {
      main: Battery,
      footer: Logger,
      drawer: BatteryControls
    },
    meta: {
      feature: 'battery'
    }
  },
  {
    name: 'evChargerDischarger',
    path: '/evchargerdischarger',
    components: {
      main: EVChargerDischarger,
      footer: Logger,
      drawer: EVChargerDischargerControls
    },
    meta: {
      feature: 'evchargerdischarger'
    }
  },
  {
    name: 'settings.single',
    path: '/settings/single',
    components: {
      menu: SettingsMenu,
      main: Settings
    },
    meta: {
      feature: 'settings',
      section: 'single'
    }
  },
  {
    name: 'settings.battery',
    path: '/settings/battery',
    components: {
      menu: SettingsMenu,
      main: Settings
    },
    meta: {
      feature: 'settings',
      section: 'battery'
    }
  },
  {
    name: 'settings.evChargerDischarger',
    path: '/settings/evchargerdischarger',
    components: {
      menu: SettingsMenu,
      main: Settings
    },
    meta: {
      feature: 'settings',
      section: 'evChargerDischarger'
    }
  },
  {
    name: 'settings.network',
    path: '/settings/network',
    components: {
      menu: SettingsMenu,
      main: Settings
    },
    meta: {
      feature: 'settings',
      section: 'network'
    }
  },
  {
    name: 'settings.cameras',
    path: '/settings/cameras',
    components: {
      menu: SettingsMenu,
      main: Settings,
      drawer: SettingsDetails
    },
    meta: {
      feature: 'settings',
      section: 'cameras'
    }
  },
  {
    name: 'settings.ui',
    path: '/settings/ui',
    components: {
      menu: SettingsMenu,
      main: Settings
    },
    meta: {
      feature: 'settings',
      section: 'ui'
    }
  },
  {
    name: 'help',
    path: '/help',
    components: {
      menu: HelpMenu,
      main: Help
    },
    meta: {
      feature: 'help'
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      };
    }
    return { top: 0, left: 0 };
  }
});

export default router;
