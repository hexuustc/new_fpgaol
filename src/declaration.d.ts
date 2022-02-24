declare module 'v-click-outside' {
    import { DirectiveFunction } from 'vue';
    import vClickOutside from 'v-click-outside';
  
    export const install: DirectiveFunction<{}>;
  
    interface ClickOutside<T> {
      map<U>(f: (x: T) => U): vClickOutside<U>;
    }
  
    module 'vue/types/vue' {
      interface Vue {
        'v-click-outside': ClickOutside;
      }
    }
  }