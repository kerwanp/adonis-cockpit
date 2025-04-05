import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { RootLayout } from "../layouts/root_layout.js";
import { CockpitText } from "../components/fields/text/index.js";
import { CockpitUrl } from "../components/fields/url/index.js";
import { CockpitId } from "../components/fields/id/index.js";
import { CockpitEmail } from "../components/fields/email/index.js";
import { CockpitBoolean } from "../components/fields/boolean/index.js";
import { CockpitBelongsTo } from "../components/fields/belongs_to/index.js";
import { CockpitPanelLayout } from "../components/layouts/panel.js";
import { CockpitHasMany } from "../components/fields/has_many.js";
import { CockpitHasManyLayout } from "../components/layouts/has_many.js";
import { FC } from "react";
import { CockpitDate } from "../components/fields/date.js";

// TODO: Type props
export type PageComponent = FC<any> & { layout?: FC<any> };
export type LazyComponent = Promise<{ default: PageComponent }>;

const PAGES: Record<string, () => LazyComponent> = {
  "cockpit::home": () => import("../pages/home.js"),
  "cockpit::resources/index": () => import("../pages/resources/index.js"),
  "cockpit::resources/edit": () => import("../pages/resources/edit.js"),
  "cockpit::resources/create": () => import("../pages/resources/create.js"),
};

export type CreateCockpitAppOptions = {
  title?: (title: string) => string;
  resolve?: (name: string) => LazyComponent;
};

export default function createCockpitApp(
  options: CreateCockpitAppOptions = {},
) {
  return createInertiaApp({
    title: options.title ?? ((title: string) => `${title} - Cockpit`),
    resolve: async (name) => {
      let page = await options.resolve?.(name);
      if (!page) {
        page = await PAGES[name]();
      }

      page.default.layout =
        page.default.layout ||
        ((page) => (
          <RootLayout
            children={page}
            breadcrumb={page.props.breadcrumb}
            resources={page.props.resources}
            menu={page.props.menu}
            user={page.props.user}
            fields={[
              CockpitText,
              CockpitUrl,
              CockpitId,
              CockpitEmail,
              CockpitBoolean,
              CockpitBelongsTo,
              CockpitHasMany,
              CockpitDate,
            ]}
            layouts={[CockpitPanelLayout, CockpitHasManyLayout]}
          />
        ));

      return page;
    },
    setup({ el, App, props }) {
      createRoot(el).render(<App {...props} />);
    },
  });
}
