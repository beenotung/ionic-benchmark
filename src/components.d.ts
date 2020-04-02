/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppRoot {
    }
    interface AppTabs {
    }
    interface ForumPage {
    }
    interface NoticesPage {
    }
}
declare global {
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLAppTabsElement extends Components.AppTabs, HTMLStencilElement {
    }
    var HTMLAppTabsElement: {
        prototype: HTMLAppTabsElement;
        new (): HTMLAppTabsElement;
    };
    interface HTMLForumPageElement extends Components.ForumPage, HTMLStencilElement {
    }
    var HTMLForumPageElement: {
        prototype: HTMLForumPageElement;
        new (): HTMLForumPageElement;
    };
    interface HTMLNoticesPageElement extends Components.NoticesPage, HTMLStencilElement {
    }
    var HTMLNoticesPageElement: {
        prototype: HTMLNoticesPageElement;
        new (): HTMLNoticesPageElement;
    };
    interface HTMLElementTagNameMap {
        "app-root": HTMLAppRootElement;
        "app-tabs": HTMLAppTabsElement;
        "forum-page": HTMLForumPageElement;
        "notices-page": HTMLNoticesPageElement;
    }
}
declare namespace LocalJSX {
    interface AppRoot {
    }
    interface AppTabs {
    }
    interface ForumPage {
    }
    interface NoticesPage {
    }
    interface IntrinsicElements {
        "app-root": AppRoot;
        "app-tabs": AppTabs;
        "forum-page": ForumPage;
        "notices-page": NoticesPage;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "app-tabs": LocalJSX.AppTabs & JSXBase.HTMLAttributes<HTMLAppTabsElement>;
            "forum-page": LocalJSX.ForumPage & JSXBase.HTMLAttributes<HTMLForumPageElement>;
            "notices-page": LocalJSX.NoticesPage & JSXBase.HTMLAttributes<HTMLNoticesPageElement>;
        }
    }
}
